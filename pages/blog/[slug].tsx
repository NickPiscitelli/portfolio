import { Navbar } from "../../components/nav";
import { readFileSync, readdirSync } from "fs";
import { BlogState } from "../../types";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { markdownToHtml } from "../../utils/markdown";
import { PreformattedText } from "../../components/PreformattedText";
import { hopscotch } from "react-code-blocks";

export default function BlogPost({ blog }: { blog: BlogState }) {
    const userTheme = hopscotch;
    const backgroundColor = userTheme?.backgroundColor || "#282a36";

    return (
        <main className="min-h-screen overflow-y-auto" style={{ backgroundColor }}>
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

                <div dangerouslySetInnerHTML={{ __html: blog.htmlContent || '' }} className="prose prose-lg prose-invert max-w-none" />
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

    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(post);

    return {
        props: {
            blog: {
                title,
                body: post,
                htmlContent,
                active: false,
                slug: slug as string
            },
        },
    };
}; 