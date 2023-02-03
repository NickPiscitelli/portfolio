import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { dracula } from "react-code-blocks";
import { useState } from "react";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { readFileSync, readdirSync } from "fs";
import { BlogState, BlogStates } from "../types";

export default function Blog({ blogs }: { blogs: BlogStates }) {
  const [BlogStates, setBlogStates] = useState<BlogStates>(blogs);
  const [userTheme, setUserTheme] = useState(dracula);

  const setActiveTab = (tab: BlogState) => {
    for (const b of BlogStates) {
      b.active = b.title === tab.title;
    }
    setBlogStates([...blogs]);
  };
  return (
    <main>
      <Navbar themeSwitcher={setUserTheme} userTheme={userTheme} />
      <section className="code cf flex">
        <div className="w-screen shadow-[-7px_0px_10px_1px_rgba(0,0,0,0.3)]">
          <Tab.Group>
            <FileTabs setTab={setActiveTab} tabs={BlogStates} />
            <CodePanels userTheme={userTheme} panels={BlogStates} />
          </Tab.Group>
        </div>
      </section>
    </main>
  );
}

export function getStaticProps() {
  const blogs = [];
  const files = readdirSync(process.cwd() + "/blog");

  for (const blog of files) {
    const post = readFileSync(process.cwd() + "/blog/" + blog, "utf8");
    const [title, body, active = false] = post.split("\n================\n");
    blogs.push({
      title,
      body,
      active,
    });
  }

  blogs[0].active = true;

  return { props: { blogs } };
}
