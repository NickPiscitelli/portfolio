import React from 'react';

interface BlogContentProps {
    html: string;
    title: string;
    theme?: {
        backgroundColor?: string;
        color?: string;
    };
}

export const BlogContent: React.FC<BlogContentProps> = ({ html, title, theme }) => {
    const backgroundColor = theme?.backgroundColor || '#282a36';
    const textColor = theme?.color || '#f8f8f2';

    return (
        <div
            className="blog-content font-sans"
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            <div className="p-8 flex-1 flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>

                <div
                    className="prose prose-invert max-w-none flex-1"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}; 