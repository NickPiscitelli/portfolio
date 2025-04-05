import { PreformattedText } from "./PreformattedText";

export const Introduction = `Not often, but sometimes I do stuff.

Check my blog here: https://nickpiscitelli.com/blog`;

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