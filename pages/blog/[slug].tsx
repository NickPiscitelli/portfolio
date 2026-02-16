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
        <div style={{ backgroundColor, minHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden' }}>
            <Navbar userTheme={userTheme} />
            <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '3rem 1rem', width: '100%', boxSizing: 'border-box' }}>
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to posts
                    </Link>
                </div>

                <div
                    dangerouslySetInnerHTML={{ __html: blog.htmlContent || '' }}
                    className="prose prose-invert blog-content"
                    style={{ maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                />
            </article>
        </div>
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

    const titleMatch = post.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug as string;

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
