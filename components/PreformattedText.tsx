import { CodeBlock } from "react-code-blocks";

interface PreformattedTextProps {
    text: string;
    theme: any;
    language?: string;
}

export const PreformattedText = ({
    text,
    theme,
    language,
}: PreformattedTextProps) => {
    const fileExtension = language || "tsx";

    return (
        <div className="w-full h-full flex-1">
            <CodeBlock
                customStyle={{
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    paddingTop: 5,
                    paddingRight: 26,
                    borderRadius: 0,
                    zIndex: 10,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
                text={text}
                theme={theme}
                language={fileExtension}
                showLineNumbers
                wrapLines
            />
        </div>
    );
}; 