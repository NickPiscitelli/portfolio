import { Introduction } from "../components/intro";

export const fetchSourceFile = async (
    file: string,
    fileStates: Record<string, boolean>,
    setFileStates: Function
) => {
    if (1 || !localStorage.getItem(file)) {
        let contents;
        console.log(file)
        if (file === "Introduction.tsx") {
            contents = `${Introduction}${"\n".repeat(50)}`;
        } else {
            const resp = await fetch(
                `https://raw.githubusercontent.com/NickPiscitelli/portfolio/main/${file}`
            );
            contents = await resp.text();
        }

        localStorage.setItem(file, contents + "\n".repeat(50));
    }

    fileStates[file] = true;

    setFileStates({ ...fileStates });
};
