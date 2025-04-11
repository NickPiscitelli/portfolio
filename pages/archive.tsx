import { Navbar } from "../components/nav";
import { hopscotch } from "react-code-blocks";
import { readFileSync, readdirSync } from "fs";
import Link from "next/link";
import { markdownToHtml } from "../utils/markdown";

type BlogPost = {
    title: string;
    createdAt: string;
    slug: string;
};

type BlogsByYear = {
    [year: string]: BlogPost[];
};

export default function Archive({ blogsByYear }: { blogsByYear: BlogsByYear }) {
    const userTheme = hopscotch;
    const backgroundColor = userTheme?.backgroundColor || "#282a36";
    const textColor = userTheme?.textColor || "#f8f8f2";

    return (
        <main style={{ backgroundColor, color: textColor }} className="min-h-screen">
            <Navbar userTheme={userTheme} />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-mono mb-8">Blog Archive</h1>
                {Object.entries(blogsByYear)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([year, posts]) => (
                        <div key={year} className="mb-12">
                            <h2 className="text-2xl font-mono mb-4 text-purple-400">{year}</h2>
                            <ul className="space-y-4">
                                {posts.map((post) => (
                                    <li key={post.slug} className="border-b border-gray-700 pb-4">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:text-purple-400 transition-colors"
                                        >
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-lg">{post.title}</span>
                                                <span className="text-sm text-gray-400">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </main>
    );
}

export async function getStaticProps() {
    const blogs: BlogPost[] = [];
    const files = readdirSync(process.cwd() + "/blog");

    for (const blog of files) {
        if (blog === "welcome.md") continue; // Skip welcome post in archive

        const filePath = process.cwd() + "/blog/" + blog;
        const post = readFileSync(filePath, "utf8");
        const stats = require('fs').statSync(filePath);

        const titleMatch = post.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : blog.replace('.md', '');

        blogs.push({
            title,
            createdAt: stats.birthtime.toISOString(),
            slug: blog.replace('.md', '')
        });
    }

    // Sort blogs by date and group by year
    const blogsByYear = blogs
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .reduce((acc, blog) => {
            const year = new Date(blog.createdAt).getFullYear().toString();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(blog);
            return acc;
        }, {} as BlogsByYear);

    return {
        props: {
            blogsByYear
        }
    };
} 