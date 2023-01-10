import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { CodeBlock, dracula } from "react-code-blocks";
import { useEffect, useState } from "react";
import { Introduction } from "../components/intro";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { fetchSourceFile } from "../components/fetcher";

type FileStates = Record<string, boolean>;

export default function Home() {
  const [fileStates, setFileStates] = useState<FileStates>({
    "Introduction.tsx": false,
    "pages/index.tsx": false,
    "package.json": false,
    "pages/_app.tsx": false,
    "icons/github.tsx": false,
    "icons/terminal.tsx": false,
    "components/nav.tsx": false,
    "components/head.tsx": false,
    "components/loader.tsx": false,
    "components/name.tsx": false,
    "components/picker.tsx": false,
    "styles/globals.css": false,
  });

  const [file, setFile] = useState("Introduction.tsx");
  const [userTheme, setUserTheme] = useState(dracula);

  useEffect(() => {
    fetchSourceFile(file, fileStates, setFileStates);
    return () => {};
  }, [file]);

  useEffect(() => {
    window.innerWidth > 700 &&
      setTimeout(
        () =>
          (
            document.querySelector('[data-tab="pages/index.tsx"]') as any
          ).click(),
        500
      );
  });

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
            <FileTabs setFile={setFile} fileStates={fileStates} />
            <CodePanels userTheme={userTheme} fileStates={fileStates} />
          </Tab.Group>
        </div>
      </section>
    </main>
  );
}
