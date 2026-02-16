# building klaus: from button presses to ideas

i built an ai assistant that runs my house. not an alexa skill. not a home assistant dashboard. a thing that lives on a mac studio in my office, has access to everything, and actually knows what's going on.

his name is klaus. he controls the lights, checks the cameras, tracks my business orders, and speaks through the living room sonos. the cloud piece is an anthropic API subscription for claude — everything else runs locally. he's been running since january 31, 2026. this is how it happened.

## the hardware

it started on a mac mini with 16GB of ram. that lasted about a week.

the problem with running an ai assistant locally is that everything wants memory. the whisper model for speech recognition. the web browser sessions. docker containers for various services. the gateway process itself. 16GB fills up fast when you're trying to do anything interesting.

so i upgraded to a mac studio M3 Ultra with 256GB of unified memory. overkill for most things, but it unlocked something important: the ability to run massive language models locally, right alongside everything else. 200GB+ free for model weights with all services running. no API costs for local inference.

apple silicon's unified memory architecture is genuinely great for this. the GPU and CPU share the same memory pool, so a 170GB model doesn't need a dedicated GPU with 170GB of VRAM. it just loads into the shared pool and runs.

## the brain

the core is [openclaw](https://github.com/openclaw/openclaw), an open-source gateway that sits between you and whatever LLM you want. claude, gpt, local models, whatever. you connect it to messaging apps, smart home APIs, file systems, databases. then you just talk to it.

the interface is text. i message klaus from imessage or discord on my phone. he also has his own email address, so he can send and receive emails on my behalf — order confirmations, calendar invites, whatever needs handling. he has full context of what we talked about yesterday because he maintains his own memory files — daily logs, a long-term memory doc, a scratchpad that persists across sessions. every morning he wakes up, reads his files, and picks up where he left off.

the real power is tool use. klaus doesn't just answer questions. he calls APIs, runs shell commands, edits files, spawns sub-agents for complex tasks. "turn off the kitchen lights" hits the hubitat API. "show me the front door" grabs a camera snapshot from unifi protect. "how many orders came in today" queries ebay, shopify, and etsy.

## the voice pipeline

text is fine. but i wanted to talk to the thing.

building a local voice pipeline on apple silicon turned into one of the more interesting engineering challenges. the goal: say "klaus" from across the room, have him understand me, think, and respond through the sonos speaker. all local. sub-second where possible.

### speech-to-text: the whisper → parakeet journey

i started with openai's whisper, the obvious choice. ran it through [mlx-whisper](https://github.com/ml-explore/mlx-examples) to get apple silicon native performance:

- **whisper tiny** (74MB): 0.56s for a clip — fast, accurate enough for clear speech
- **whisper small** (465MB): 1.2s — better accuracy, heavier
- **whisper large v3 turbo** (809M params): 0.58s warm on the studio — 8.6x realtime
- **whisper large v3** (full): 2.64s — best accuracy, diminishing returns

then i found nvidia's [parakeet TDT 0.6B v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2), ported to MLX. benchmarked it against whisper on my actual voice:

| model | time (26s clip) | realtime factor |
|-------|----------------|-----------------|
| parakeet TDT 0.6B v2 | 0.57s | 45x |
| whisper large v3 turbo | 0.89s | 29x |
| whisper large v3 | 2.64s | 10x |

parakeet was faster AND gave word-level timestamps, which turned out to be critical. instead of a wake word model, i just run continuous transcription in 5-second windows and look for "klaus" in the text. when it appears, the word timestamps tell me exactly where the command starts.

this eliminated openwakeword entirely. i'd spent hours trying to train a custom "hey klaus" model — the results were inconsistent, scoring 0.12-0.31 on actual triggers with a 0.3 threshold. continuous transcription with keyword detection just works better.

### text-to-speech: finding a voice

tts was a rabbit hole. the requirements: sound good, run fast enough for conversation, work locally.

**piper** (thorsten german voice): first attempt. functional but robotic. i hated it.

**elevenlabs**: great quality but the free tier has a 20-credit rolling quota. got exactly one phrase cached ("Done.") before hitting the limit. $5/month starter tier would fix it, but i wanted local.

**coqui VITS** (tts_models/en/vctk/vits): 148MB model, 109 speakers, 0.3s generation time. i auditioned about 40 male speakers with klaus. the winner was **otto** (speaker p258) — clear, natural, slightly warm. generation runs in a python 3.11 venv with espeak-ng for phoneme generation.

**XTTS v2** for voice cloning: downloaded the 1.87GB model, got zero-shot cloning working with arnold schwarzenegger samples. 6.6 seconds per generation — way too slow for live conversation, but viable for pre-generating cached phrases.

we collected 189 clean arnold audio segments (33.7 minutes) from youtube speeches and interviews, then fine-tuned VITS. 2000 training steps on the mac mini wasn't enough — didn't sound like arnold at all. real voice cloning needs 20,000+ steps on proper hardware. i have a linux workstation with an nvidia A4000 16GB for that, still on the todo list.

the dream voice: christoph waltz. german-accented english, tons of youtube material. someday.

### the output: sonos

tts audio goes through [sonoscli](https://sonoscli.sh) to a sonos era 100 in the living room. sonoscli is a lightweight go binary — no node server, no docker container, just a single CLI that talks directly to the speaker. the flow:

1. generate wav via coqui VITS (otto, ~0.3s)
2. normalize with sox (`gain -n -1`)
3. `sonos play-clip --uri file:///path/to/response.wav`

total latency from text-to-audible-speech: under a second. we used to run node-sonos-http-api for this but sonoscli replaced it entirely — fewer moving parts, same result.

### the listener

the voice listener runs as a daemon:

1. captures audio from an EMEET luna plus speakerphone (connected via wireless USB dongle — the luna must be powered on or the mic reads dead silence)
2. buffers 5-second windows with 1-second overlap
3. skips silence (RMS threshold)
4. transcribes via parakeet MLX
5. scans for "klaus"/"claus"/"claws" in transcribed text
6. extracts command text using word-level timestamps
7. routes command to openclaw gateway
8. speaks response through sonos

it's not perfect. background noise can trigger false positives. the 5-second buffer means there's inherent latency. but for "klaus, turn off the lights" from across the room — it works.

## the local model pipeline

this is the part i'm most obsessed with right now. the mac studio's 256GB means i can run models that would normally require a multi-GPU server. but running them isn't enough — i need them to actually be useful as an assistant, which means they need to handle tool calls reliably.

### the problem with API-only

klaus started as pure claude API. every message, every tool call, every "turn off the lights" — round trip to anthropic's servers. it works great. claude is the best model i've used for agentic tool calling. but:

- it costs money. every interaction, no matter how trivial.
- it has latency. even haiku adds 500-800ms of network round trip before the model even starts thinking.
- it's a dependency. if anthropic has an outage, my lights don't work.

for complex tasks — multi-step reasoning, long code generation, nuanced conversation — claude is worth every penny. but "turn off the kitchen lights" doesn't need a frontier model. it needs something fast and cheap that can reliably emit a JSON tool call.

### the haiku-to-local pipeline

the optimization path looked like this:

1. **claude opus** for everything (expensive, slow for simple tasks, incredibly capable)
2. **claude haiku** for routine tool calls (cheaper, ~800ms round trip, still API-dependent)
3. **local models** for routine tool calls (free, ~80ms, no network dependency)

the jump from step 2 to step 3 is where it gets interesting. haiku is small and fast, but it's still a cloud API. a local model running on the studio's GPU can respond in under 100ms — that's an order of magnitude faster, and it costs nothing.

the candidate: **qwen3-30B-A3B** at 4-bit quantization via MLX (~18GB). it's a mixture-of-experts model — 30B total parameters but only 3B active per token. on the M3 Ultra it pushes ~250+ tokens/sec. for a 20-token tool call response, that's about 80ms of generation time. compare that to haiku's 800ms minimum including network overhead.

but raw speed doesn't matter if the model can't reliably format tool calls. which brings us to the benchmark.

### nick's last exam

i got tired of reading generic LLM benchmarks. MMLU scores don't tell me if a model can correctly call `hubitat.setLevel(deviceId=3, level=75)` when i say "dim the kitchen to 75%."

so i built my own benchmark. 10 questions, all based on my actual workflows:

- can it parse a natural language command into the right tool call with the right parameters?
- can it handle ambiguity? ("the kitchen" means two separate light devices)
- can it chain tool calls? ("turn off everything downstairs" = multiple API calls)
- can it read API responses and decide what to do next?
- can it generate working code that interacts with real APIs?
- does it know when to NOT call a tool and just answer conversationally?

the dashboard is pure python — zero dependencies, stdlib only. it auto-discovers every model available on the machine through both ollama and MLX endpoints, runs each one through the exam, and maintains a leaderboard. live progress, run history, the works.

this is how i actually evaluate whether a new model is worth running. not "can it pass a bar exam" — can it turn off my lights correctly?

### the model zoo

models i've benchmarked or am actively running:

- **qwen3-30B-A3B** (4-bit MLX, ~18GB): the speed demon. MoE with only 3B active params. 250+ tok/s. this is the primary candidate for replacing haiku on routine tool calls. it handles structured output well enough for simple commands.
- **qwen3-235B** (ollama): the big brother. much slower but significantly more capable on complex tool chains. good for tasks where you need the model to reason about multiple steps.
- **MiniMax M2** (6-bit MLX, 173GB): loads ~117GB into RAM. this is a frontier-class model running locally. the studio handles it, barely. inference is slow but the quality is impressive — it's the kind of model you'd normally need a $30k GPU setup to run.
- **GLM-4.7** (4-bit MLX, ~200GB): zhipu's latest. downloading 200GB+ of model weights over your home internet connection is a special kind of patience. the kind of thing that's only possible because the studio has the memory to load it.

each model gets scored on the exam. the results tell me exactly where the accuracy-speed tradeoff falls for my specific use cases.

### litellm: the routing layer

the insight that made this practical: you don't pick one model. you build a **routing layer** that sends each request to the right model based on what it needs.

[litellm](https://github.com/BerriAI/litellm) runs as a local proxy — a unified OpenAI-compatible API that sits in front of everything. behind it:

- **claude opus** (via anthropic API) for complex reasoning, long conversations, anything that needs real intelligence
- **claude sonnet** as a capable middle tier
- **qwen3-30B-A3B** (via MLX, local) for fast tool calls, simple commands, status checks
- **fallback chains** — if the local model is loaded with a big inference job, requests fall back to API models automatically

litellm also handles:

- **budget caps** — $50/day hard limit so a runaway agent loop doesn't drain the account
- **usage tracking** — per-model cost and token counts
- **rate limit handling** — automatic retry with fallback when anthropic rate limits hit
- **unified API** — everything downstream (openclaw, sub-agents, the voice pipeline) talks to one endpoint and litellm figures out where to send it

the end state: "turn off the lights" → local qwen3 in 80ms, free. "write me a blog post about building a home assistant" → claude opus via API, worth the cost. the routing is automatic. i don't think about which model to use for what — the system decides.

### what i'm working toward

the next step is fine-tuning. i want to take qwen3-30B-A3B and train it specifically on my tool call patterns using LoRA via MLX. i have thousands of real tool call examples from klaus's session logs — every time claude successfully called the hubitat API, every camera snapshot, every order query. that's training data.

the idea: mine ~500-1000 input→tool call pairs from real conversations, format them as fine-tuning examples, and train a local model that's specifically good at MY tool calls. not general tool calling — my exact API schemas, my device names, my command patterns.

the A4000 linux box handles the training. the mac studio handles inference. the models ping-pong between them.

## the smart home layer

the actual home automation is less glamorous than the AI stuff but equally important.

**hubitat** runs 14 devices across z-wave — dimmers, switches, two thermostats. klaus hits the maker API with retry logic and verification. i wrote a `klaus-light` CLI that handles groups (e.g., "kitchen" controls both the main light and the table light), auto-verifies the command worked, and retries twice if it didn't.

**unifi protect** handles cameras — a G4 instant and a G4 doorbell pro, running on a UDM SE. i set up go2rtc to convert RTSP streams to WebRTC/MSE for low-latency browser viewing, with fallback to snapshot polling.

**roku** for TV control. basic keypress API — power, app launching, navigation.

**apple music on sonos** — this one was satisfying to crack. sonos S2 speakers store accounts in the cloud, so the local API returns nothing. but apple music IS linked. the trick: search the itunes API, grab the trackId, construct a sonos-compatible URI with the right service IDs and metadata, then queue it via SoCo (python sonos library).

## accessing klaus from anywhere

klaus runs on a machine in my office. but i don't want him to only work when i'm home.

the UDM SE runs a wireguard VPN with split tunneling. when my phone leaves the home network, it automatically connects back through wireguard — only routing LAN traffic through the tunnel, everything else goes direct. no manual toggle. no remembering to connect. i walk out the door and klaus is still reachable as if i'm on the couch.

that means imessage works from anywhere — i text klaus the same way whether i'm in the living room or across the country. discord too. the messages hit the openclaw gateway on my LAN, and wireguard makes sure the connection is always there.

no port forwarding. no cloud relay. no exposing anything to the public internet. the mac studio sits behind the UDM SE's firewall, and the only way in is through the encrypted tunnel. cameras, smart home controls, the dashboard — all accessible from my phone, all private.

this is the part most home automation setups get wrong. they either require cloud accounts (ring, nest, alexa) or they force you to punch holes in your firewall. wireguard with split tunnel on the UDM SE is the cleanest solution i've found. it just works, and it's zero-trust by default.

## what i learned

**unified memory is the real innovation.** not the chip speed, not the neural engine. the fact that a $4000 machine can load a 170GB model and still have headroom for everything else. nvidia can't touch this without spending 5-10x more on VRAM.

**local STT has caught up.** parakeet on MLX transcribes at 45x realtime. that's fast enough that continuous transcription is viable as an always-on listener. wake word models feel obsolete.

**voice cloning isn't there yet (locally).** XTTS v2 works but it's too slow for conversation. VITS is fast but needs way more training data and compute than a consumer machine provides. the gap between "demo quality" and "production quality" is enormous.

**the AI IS the integration layer.** i stopped trying to make every device speak the same protocol. hubitat, unifi, roku, sonos, ebay, shopify — they all have different APIs. klaus just knows how to talk to each one. natural language is the universal adapter.

**memory is the killer feature.** the difference between a stateless chatbot and an assistant is memory. klaus maintains daily logs, a long-term memory file, and a shared scratchpad. he remembers that the kitchen has two lights, who prefers what, what we talked about last week. this context makes the interaction feel fundamentally different from talking to chatgpt.

**tool call reliability is the bottleneck.** the models are fast enough. the hardware is powerful enough. what determines whether a local model can replace an API model is whether it can reliably emit correctly-formatted tool calls for your specific use case. generic benchmarks don't test this. you have to build your own.

## the current stack

| component | tech |
|-----------|------|
| brain | openclaw gateway → claude opus (API) + local models |
| routing | litellm proxy (budget caps, fallbacks, load balancing) |
| stt | parakeet TDT 0.6B v2 (MLX) |
| tts | coqui VITS otto (local) |
| hardware | mac studio M3 Ultra, 256GB unified memory |
| mic | EMEET luna plus speakerphone |
| speaker | sonos era 100 |
| smart home | hubitat (z-wave), unifi protect |
| network | UDM SE + wireguard (split tunnel, always-on) |
| messaging | imessage, discord, email |
| local models | qwen3-30B-A3B, MiniMax M2, GLM-4.7 (ollama + MLX) |
| benchmarking | nick's last exam (custom tool call benchmark) |
| reverse proxy | caddy + let's encrypt wildcard |

total monthly cost: electricity + claude API usage. no subscriptions for the home automation. no cloud dependencies for local inference. the API spend is for the stuff that's actually worth paying for — complex reasoning and real conversation. everything else runs on one machine in my office.

it's not a product. it's not polished. things break and i fix them at midnight. but it's mine, it runs locally, and it actually works. that's more than i can say for every "smart home" setup i've tried in the last decade.
