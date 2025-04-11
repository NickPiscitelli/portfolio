import React from 'react';

interface BlogContentProps {
    html: string;
    title: string;
    formattedDate?: string;
    theme?: {
        backgroundColor?: string;
        color?: string;
    };
}

export const BlogContent: React.FC<BlogContentProps> = ({ html, formattedDate, theme }) => {
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
            <div className="pt-6 pb-8 px-8 flex-1 flex flex-col">
                {formattedDate && (
                    <div className="text-gray-400 text-sm mb-2 font-mono">
                        {formattedDate}
                    </div>
                )}
                <div
                    className="prose max-w-[625px] prose-invert max-w-none flex-1"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}; 