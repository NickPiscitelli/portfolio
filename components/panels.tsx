import { Tab } from "@headlessui/react";
import { CodeBlock } from "react-code-blocks";
import { FileStates, FileState } from "../types";

export const CodePanels = ({
  userTheme,
  panels,
}: {
  userTheme: any;
  panels: FileStates;
}) => {
  function sizePost(code: string) {
    const lines = code.split("\n");
    if (lines.length < 50) code += "\n".repeat(50 - lines.length);
    return code;
  }

  return (
    <Tab.Panels className="tabbed-code-pane scrollbar-hide">
      {panels.map((tab, i) => (
        <Tab.Panel
          key={i}
          className={`${
            tab.title === "Introduction.tsx" && "lg:hidden"
          } text-sm h-[80vh]`}
        >
          <CodeBlock
            customStyle={{
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              paddingTop: 5,
              paddingRight: 26,
              borderRadius: 0,
              zIndex: 10,
            }}
            text={sizePost(tab.body)}
            theme={userTheme}
            language={tab.title.split(/\./)[1]}
            showLineNumbers
            wrapLines
          />
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};
