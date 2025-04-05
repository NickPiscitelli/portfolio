import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { hopscotch } from "react-code-blocks";
import { useState } from "react";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { readFileSync, readdirSync } from "fs";
import { BlogState, BlogStates } from "../types";
import { PreformattedText } from "../components/PreformattedText";
import { markdownToHtml } from "../utils/markdown";

export default function Blog({ blogs }: { blogs: BlogState[] }) {
  const [blogStates, setBlogStates] = useState<BlogState[]>([...blogs]);
  const userTheme = hopscotch;

  const setActiveTab = (tabs: BlogState[]) => {
    setBlogStates(tabs);
  };

  // Get background color from theme
  const backgroundColor = userTheme?.backgroundColor || "#282a36";

  // Find the index of the Welcome tab
  const defaultIndex = blogStates.findIndex(blog => blog.title === "Welcome");

  return (
    <main style={{ backgroundColor }}>
      <Navbar userTheme={userTheme} />
      <section className="code cf flex" style={{ backgroundColor }}>
        <div className="w-screen shadow-[-7px_0px_10px_1px_rgba(0,0,0,0.3)]" style={{ backgroundColor }}>
          <Tab.Group defaultIndex={defaultIndex >= 0 ? defaultIndex : 0}>
            <FileTabs setTab={setActiveTab} tabs={blogStates} userTheme={userTheme} />
            <CodePanels userTheme={userTheme} panels={blogStates} />
          </Tab.Group>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const blogs = [];
  const files = readdirSync(process.cwd() + "/blog");

  for (const blog of files) {
    const post = readFileSync(process.cwd() + "/blog/" + blog, "utf8");
    const [title, body] = post.split("\n================\n");
    console.log(title);
    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(body);

    blogs.push({
      title,
      body,
      htmlContent,
      active: title === "Welcome",
    });
  }

  // Sort blogs to ensure Welcome comes first, then alphabetically by title
  blogs.sort((a, b) => {
    if (a.title === "Welcome") return -1;
    if (b.title === "Welcome") return 1;
    return a.title.localeCompare(b.title);
  });

  return { props: { blogs } };
}
