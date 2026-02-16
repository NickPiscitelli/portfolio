import { PreformattedText } from "./PreformattedText";

export const Introduction = `engineer, tinkerer, builder. i make things with code, 3d printers, laser cutters, power tools, and whatever else is lying around. if it exists, i've probably already taken it apart — and maybe even put it back together successfully.

currently obsessed with running local llms on apple silicon, building ai agents that actually do useful things, and automating my house with an assistant named klaus.

by day i'm an engineering director — leading a team, building cloud and hyperscale infrastructure. by night i'm printing, cutting, and writing scripts that turn off my lights because i'm too lazy to walk to the switch.

check my blog here: https://nickpiscitelli.com/blog`;

export default function IntroComponent({ userTheme }: { userTheme: any }) {
  const backgroundColor = userTheme?.backgroundColor || "#282a36";

  return (
    <article className="bg-dracula rounded-lg border border-dracula-light">
      {/* Editor-like header */}
      <div className="border-b border-dracula-light p-4">
        <div className="flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 font-mono text-sm text-gray-400">
            ~/intro.md
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <PreformattedText
          text={Introduction}
          theme={userTheme}
        />
      </div>
    </article>
  );
}