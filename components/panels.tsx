import { Tab } from "@headlessui/react";
import { CodeBlock } from "react-code-blocks";

export const CodePanels = ({ userTheme, fileStates }: any) => {
  return (
    <Tab.Panels className="tabbed-code-pane scrollbar-hide">
      {Object.keys(fileStates).map((tab, i) => (
        <Tab.Panel
          key={i}
          className={`${
            tab === "Introduction.tsx" && "lg:hidden"
          } text-sm h-[80vh]`}
        >
          <CodeBlock
            customStyle={{
              borderRadius: 0,
              zIndex: 10,
            }}
            text={
              fileStates[tab]
                ? window.localStorage.getItem(tab)
                : `Loading file...${"\n".repeat(100)}`
            }
            theme={userTheme}
            language={tab.split(/\./)[1]}
            showLineNumbers
            wrapLines
          />
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};
