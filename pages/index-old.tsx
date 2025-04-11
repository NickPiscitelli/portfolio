import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { hopscotch } from "react-code-blocks";
import { useEffect, useState } from "react";
import { Introduction } from "../components/intro";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { readFileSync, readdirSync } from "fs";
import { FileState, FileStates } from "../types";
import { PreformattedText } from "../components/PreformattedText";

export default function Home({ files }: { files: FileStates }) {
  const [fileStates, setFileStates] = useState<FileStates>(files);
  const userTheme = hopscotch;

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
      <Navbar userTheme={userTheme} />
      <section className="code cf flex">
        <div className="half-screen hidden md:block h-full grow-0 shadow-inner shrink-0">
          <PreformattedText
            text={`${Introduction}${"\n".repeat(50)}`}
            theme={userTheme}
          />
        </div>
        <div className="w-screen lg:w-[50vw] shadow-[-7px_0px_10px_1px_rgba(0,0,0,0.3)]">
          <Tab.Group>
            <FileTabs setTab={setFileStates} tabs={fileStates} userTheme={userTheme} />
            <CodePanels userTheme={userTheme} panels={fileStates} />
          </Tab.Group>
        </div>
      </section>
    </main>
  );
}

// export function getStaticProps() {
//   const panels: FileStates = [];
//   const baseDir = process.cwd();

//   // Add other files
//   for (const dir of ["components", "pages", "icons"]) {
//     try {
//       const dirPath = `${baseDir}/${dir}`;
//       try {
//         const stats = require('fs').statSync(dirPath);
//         if (!stats.isDirectory()) continue;
//       } catch (err) {
//         console.warn(`Directory ${dir} does not exist:`, err);
//         continue;
//       }

//       const files = readdirSync(dirPath);
//       for (const file of files) {
//         try {
//           const filePath = `${dirPath}/${file}`;
//           const stats = require('fs').statSync(filePath);
//           if (!stats.isFile() || (!file.endsWith('.tsx') && !file.endsWith('.ts'))) {
//             continue;
//           }

//           const body = readFileSync(filePath, "utf8");
//           panels.push({
//             title: `${dir}/${file}`,
//             body,
//             active: `${dir}/${file}` === "components/intro.tsx",
//           });
//         } catch (err) {
//           console.warn(`Could not read file ${dir}/${file}:`, err);
//         }
//       }
//     } catch (err) {
//       console.warn(`Could not process directory ${dir}:`, err);
//     }
//   }

//   return { props: { files: panels } };
// }


export const getStaticProps = async () => {
  const blogs = [];
  const files = readdirSync(process.cwd() + "/blog");

  for (const blog of files) {
    const post = readFileSync(process.cwd() + "/blog/" + blog, "utf8");

    // Extract title from the first # heading or use filename as fallback
    const titleMatch = post.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : blog.replace('.md', '');

    blogs.push({
      title,
      body: post,
      active: false,
      slug: blog.replace(/\.md$/, "")
    });
  }

  return {
    props: {
      files: blogs
    }
  };
};