import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { FileState } from "../types";
export const FileTabs = ({ tabs, setTab }: any) => {
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
              className={`${
                tab.title === "Introduction.tsx" && "lg:hidden"
              } outline-none text-left relative pl-8 py-3 grow min-w-[200px] border-r border-dracula-light text-xs bg-dracula text-white`}
            >
              {tab.title}
              {selected && (
                <i className="rounded-xl bg-slate-100 w-[8px] h-[8px] align-right top-4 absolute right-4 block">
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
