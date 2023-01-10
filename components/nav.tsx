import { GithubIcon } from "../icons/github";
import { ThemePicker } from "../components/picker";
import { TerminalIcon } from "../icons/terminal";
import { HackerName } from "./name";

export const Navbar = ({ themeSwitcher, userTheme }: any) => {
  return (
    <nav
      id="main-nav"
      className="flex shadow border-dracula-light border-b justify-between bg-dracula-dark py-3 px-6"
    >
      <div className="flex self-center">
        <div
          className="w-[25px] h-[25px] relative top-[2px]"
        >
          <TerminalIcon />
        </div>
        <div className="text-xl text-white font-bold align-middle self-center pl-2"><HackerName /></div>
      </div>

      <div className="flex">
        <a
          href="https://github.com/NickPiscitelli"
          className="w-[25px] self-center icon github"
        >
          <GithubIcon />
        </a>
        <ThemePicker themeSwitcher={themeSwitcher} userTheme={userTheme} />
      </div>
    </nav>
  );
};