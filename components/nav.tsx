import { GithubIcon } from "../icons/github";
import { TerminalIcon } from "../icons/terminal";
import { HackerName } from "./name";
import { BlogIcon } from "../icons/blog";

export const Navbar = ({ userTheme }: any) => {
  // Make header slightly darker than the theme background for better contrast
  const backgroundColor = userTheme?.backgroundColor || "#282a36";
  const darkerBackground = backgroundColor.replace(
    /^#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/,
    (_: string, r: string, g: string, b: string) => {
      const darken = (hex: string) => {
        const num = Math.max(0, parseInt(hex, 16) - 20);
        return num.toString(16).padStart(2, '0');
      };
      return `#${darken(r)}${darken(g)}${darken(b)}`;
    }
  );
  const textColor = userTheme?.color || "#f8f8f2";

  return (
    <nav
      id="main-nav"
      style={{
        backgroundColor: darkerBackground,
        borderColor: `${backgroundColor}99`
      }}
      className="flex flex-wrap md:flex-nowrap shadow border-b justify-between py-3 px-6"
    >
      <div className="flex mb-2 md:mb-0 self-center">
        <div className="w-[25px] h-[25px] relative top-[2px]">
          <TerminalIcon color={textColor} />
        </div>
        <div style={{ color: textColor }} className="text-xl font-bold align-middle self-center pl-2">
          <HackerName textColor={textColor} />
        </div>
      </div>

      <div className="flex">
        <a
          href="https://github.com/NickPiscitelli"
          className="w-[25px] self-center icon github"
        >
          <GithubIcon color={textColor} />
        </a>
      </div>
    </nav>
  );
};
