import { Introduction } from "../components/intro";

export const fetchSourceFile = async (file: string, fileStates: Record<string, boolean>, setFileStates: Function) => {

    if (!localStorage.getItem(file)) {

        let contents;
        if (file === "Introduction.md") {
            contents = `${Introduction}${"\n".repeat(50)}`
        } else {
            const resp = await fetch(
                0
                    ? `https://raw.githubusercontent.com/NickPiscitelli/portfolio/master/${file}.tsx`
                    : "https://raw.githubusercontent.com/NickPiscitelli/Glider.js/master/glider.js"
            );
            contents = await resp.text();
        }

        localStorage.setItem(file, contents);
    }

    fileStates[file] = true;

    setFileStates({ ...fileStates });
}

