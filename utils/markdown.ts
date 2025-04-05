import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .use(rehypeHighlight)
        .process(markdown);

    return result.toString();
} 