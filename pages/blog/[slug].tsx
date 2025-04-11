import { Navbar } from "../../components/nav";
import { CodeBlock, hopscotch } from "react-code-blocks";
import { readFileSync, readdirSync } from "fs";
import { BlogState } from "../../types";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

export default function BlogPost({ blog }: { blog: BlogState }) {
    const userTheme = hopscotch;

    // Default theme colors
    const backgroundColor = userTheme?.backgroundColor || "#282a36";
    const textColor = userTheme?.textColor || "#f8f8f2";

    return (
        <main className="min-h-screen" style={{ backgroundColor: backgroundColor }}>
            <Navbar userTheme={userTheme} />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to posts
                    </Link>
                </div>

                <article className="bg-dracula rounded-lg border border-dracula-light">
                    {/* Editor-like header */}
                    <div className="border-b border-dracula-light p-4">
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="ml-4 font-mono text-sm text-gray-400">
                                ~/posts/{blog.slug}.md
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <h1 className="text-4xl font-mono mb-8 pb-8 border-b border-dracula-light" style={{ color: textColor }}>
                            {blog.title}
                        </h1>
                        <div className="prose prose-lg prose-invert prose-pre:bg-dracula-dark prose-pre:border prose-pre:border-dracula-light max-w-none">
                            <CodeBlock
                                text={blog.body}
                                language="markdown"
                                theme={userTheme}
                                showLineNumbers={false}
                                customStyle={{
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    lineHeight: "1.75",
                                }}
                            />
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const files = readdirSync(process.cwd() + "/blog");

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(/\.md$/, ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug;
    const post = readFileSync(process.cwd() + "/blog/" + slug + ".md", "utf8");

    // Extract title from the first # heading or use filename as fallback
    const titleMatch = post.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug as string;

    return {
        props: {
            blog: {
                title,
                body: post,
                active: false,
                slug: slug as string
            },
        },
    };
}; 