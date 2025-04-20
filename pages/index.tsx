import { Navbar } from "../components/nav";
import { Tab } from "@headlessui/react";
import { hopscotch } from "react-code-blocks";
import { useState } from "react";
import { FileTabs } from "../components/tabs";
import { CodePanels } from "../components/panels";
import { readFileSync, readdirSync } from "fs";
import { BlogState } from "../types";
import { PreformattedText } from "../components/PreformattedText";
import { markdownToHtml } from "../utils/markdown";

type BlogPost = {
  title: string;
  body: string;
  htmlContent?: string;
  active?: boolean;
  createdAt: Date;
  slug: string;
  formattedDate: string;
  shortDate: string;
};

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
  const allPosts: BlogPost[] = [];
  const files = readdirSync(process.cwd() + "/blog");
  let welcomePost: BlogPost | undefined;
  const otherPosts: BlogPost[] = [];

  for (const blog of files) {
    const filePath = process.cwd() + "/blog/" + blog;
    const post = readFileSync(filePath, "utf8");
    const stats = require('fs').statSync(filePath);

    // Extract title from the first # heading or use filename as fallback
    const titleMatch = post.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : blog.replace('.md', '');

    const date = stats.birthtime;
    const formattedDate = blog === 'welcome.md' ? '' :
      `${date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })}`;

    const shortDate = blog === 'welcome.md' ? '' :
      `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    const blogPost: BlogPost = {
      title,
      body: post,
      createdAt: stats.birthtime,
      slug: blog.replace('.md', ''),
      formattedDate,
      shortDate
    };

    if (blog === 'welcome.md') {
      welcomePost = blogPost;
    } else {
      otherPosts.push(blogPost);
    }
  }

  // Sort other posts by date
  otherPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Get the latest 3 posts
  const recentPosts = otherPosts.slice(0, 3);

  // Inject recent posts into welcome post
  if (welcomePost) {
    const recentPostsSection = recentPosts.map(post =>
      `- [${post.title}](/blog/${post.slug}) - ${post.shortDate}`
    ).join('\n');

    welcomePost.body = welcomePost.body.replace(
      /## Recent Posts[\s\S]*?(?=## Links)/m,
      ''
    ).replace(
      /## Links[\s\S]*$/m,
      `## Links

- [Github](https://github.com/NickPiscitelli/)
- [Glider.js](https://nickpiscitelli.github.io/Glider.js/)

## Recent Posts

${recentPostsSection}

View all posts in the [blog](/blog)
`
    );
  }

  // Convert all posts to HTML
  const finalBlogs = [welcomePost, ...otherPosts].filter((blog): blog is BlogPost => blog !== undefined);
  const blogsWithHtml = await Promise.all(
    finalBlogs.map(async (blog) => ({
      ...blog,
      htmlContent: await markdownToHtml(blog.body),
      createdAt: blog.createdAt.toISOString(), // Serialize date for Next.js
      formattedDate: blog.formattedDate,
      shortDate: blog.shortDate
    }))
  );

  return {
    props: {
      blogs: blogsWithHtml
    }
  };
}
