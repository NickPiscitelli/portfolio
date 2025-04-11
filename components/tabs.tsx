import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { FileState } from "../types";

interface FileTabsProps {
  tabs: FileState[];
  setTab: (tabs: FileState[]) => void;
  userTheme: any;
}

export const FileTabs = ({ tabs, setTab, userTheme }: FileTabsProps) => {
  const backgroundColor = userTheme?.backgroundColor || "#282a36";
  const darkerBackground = backgroundColor.replace(
    /^#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/,
    (_: string, r: string, g: string, b: string) => {
      const darken = (hex: string) => {
        const num = Math.max(0, parseInt(hex, 16) - 20);
        return num.toString(16).padStart(2, '0');
      };
      return `#${darken(r)}${darken(g)}${darken(b)}`;
    }
  );
  const textColor = userTheme?.color || "#f8f8f2";

  return (
    <Tab.List className="relative z-20 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)] flex overflow-x-auto scrollbar-hide">
      {tabs.map((tab: FileState, i: number) => (
        <Tab key={i} as={Fragment}>
          {({ selected }) => (
            <div
              onClick={() => {
                tab.active = true;
                setTab([...tabs]);
              }}
              data-tab={tab.title}
              style={{
                backgroundColor: selected ? darkerBackground : backgroundColor,
                borderColor: `${darkerBackground}`,
                color: textColor
              }}
              className="outline-none border-r text-left relative pl-8 py-3 grow min-w-[200px] border-r text-xs"
            >
              {tab.title}
              {selected && (
                <i style={{ backgroundColor: textColor }} className="rounded-xl w-[8px] h-[8px] align-right top-4 absolute right-4 block">
                  &nbsp;
                </i>
              )}
            </div>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
};
