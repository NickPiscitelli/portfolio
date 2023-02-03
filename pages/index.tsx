import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { CodeBlock, dracula } from "react-code-blocks";
import { useEffect, useState } from "react";
import { Introduction } from "../intro/intro";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { readFileSync, readdirSync } from "fs";
import { FileState, FileStates } from "../types";

export default function Home({ files }: { files: FileStates }) {
  const [fileStates, setFileStates] = useState<FileStates>(files);
  const [userTheme, setUserTheme] = useState(dracula);

  const setActiveTab = (tab: FileState) => {
    for (const b of fileStates) {
      b.active = b.title === tab.title;
    }
    setFileStates([...fileStates]);
  };

  useEffect(() => {
    window.innerWidth > 700 &&
      setTimeout(
        () =>
          (
            document.querySelector('[data-tab="pages/index.tsx"]') as any
          ).click(),
        500
      );
  }, []);

  return (
    <main>
      <Navbar themeSwitcher={setUserTheme} userTheme={userTheme} />
      <section className="code cf flex">
        <div className="half-screen hidden md:block  h-full grow-0 shadow-inner shrink-0">
          <CodeBlock
            customStyle={{ borderRadius: 0 }}
            text={`${Introduction}${"\n".repeat(50)}`}
            theme={userTheme}
            language={"tsx"}
            showLineNumbers
            wrapLines
          />
        </div>
        <div className="w-screen lg:w-[50vw] shadow-[-7px_0px_10px_1px_rgba(0,0,0,0.3)]">
          <Tab.Group>
            <FileTabs setTab={setFileStates} tabs={fileStates} />
            <CodePanels userTheme={userTheme} panels={fileStates} />
          </Tab.Group>
        </div>
      </section>
    </main>
  );
}

export function getStaticProps() {
  const panels: FileStates = [];

  for (const dir of ["components", "pages", "icons"]) {
    const files = readdirSync(process.cwd() + `/${dir}`);
    for (const file of files) {
      const body = readFileSync(`${process.cwd()}/${dir}/${file}`, "utf8");
      panels.push({
        title: `${dir}/${file}`,
        body,
        active: false,
      });
    }
  }

  panels[0].active = true;

  return { props: { files: panels } };
}