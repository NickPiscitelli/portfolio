import { Tab } from "@headlessui/react";
import { FileStates, FileState, BlogStates } from "../types";
import { PreformattedText } from "./PreformattedText";
import { BlogContent } from "./BlogContent";

export const CodePanels = ({
  userTheme,
  panels,
}: {
  userTheme: any;
  panels: FileStates | BlogStates;
}) => {
  function sizePost(code: string) {
    const lines = code.split("\n");
    if (lines.length < 50) code += "\n".repeat(50 - lines.length);
    return code;
  }

  // Check if we're rendering blog posts by looking for htmlContent
  const isBlogContent = panels.length > 0 && 'htmlContent' in panels[0];

  // Get background color from theme
  const backgroundColor = userTheme?.backgroundColor || "#282a36";

  return (
    <Tab.Panels className="tabbed-code-pane scrollbar-hide" style={{ backgroundColor }}>
      {panels.map((tab, i) => (
        <Tab.Panel
          key={i}
          className={`${tab.title === "Introduction.tsx" && "lg:hidden"
            } text-sm h-full flex-1 flex`}
          style={{ backgroundColor }}
        >
          {isBlogContent && 'htmlContent' in tab && tab.htmlContent ? (
            <BlogContent
              html={tab.htmlContent}
              title={tab.title}
              theme={userTheme}
            />
          ) : (
            <PreformattedText
              text={sizePost(tab.body)}
              theme={userTheme}
            />
          )}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};
