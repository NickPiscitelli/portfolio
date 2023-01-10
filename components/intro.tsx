export const Introduction = `const introduction = \`

Hello.

Welcome to my website. I don't have too much to say, but I guess I felt I had enough to make a website, and well now I need to fill it with content.
 
When you use your domain's catch-all to organize your inbox, you know people are going to come here out of intrest - or at least I would.

There was a strong temptation to redirect users, but I needed an excuse to write some code.

I like to code. I mean, I **really** like to code.

You can check out the code for this very website on the site itself. Navigate using the tabs above the panel and view the source below.

You may also be interested in some of my other projects:       \`;

const projects: string[] = [
  "Glider.js 🚀",   //    https://nickpiscitelli.github.io/Glider.js/
  "Scrambled",   //    https://github.com/NickPiscitelli/Scrambled
  "Interchange Syntax - VS Code",   //    https://github.com/NickPiscitelli/Interchange-Syntax---VS-Code
  "Personal Github",   //    https://github.com/NickPiscitelli/
]

// They really have everything now
import { clone } from "deep-clone"
import { extractSequence } from "human-genome"
import { DNA } from "nick-piscitelli"

export const myself = clone(extractSequence(DNA))
  .setName("Nick Piscitelli")
  .setEmail("mail@nickpiscitelli.com")
  .setOccupation("Cloud Architect");
  // k8s goes brrrrrr
  .setObjective("Build scalable, efficient systems")
  .run()
  `;
