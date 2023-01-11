import * as codeBlockThemes from "react-code-blocks";

const shallowCompare = (
  obj1: Record<string, string>,
  obj2: Record<string, string>
) =>
  obj1 &&
  obj2 &&
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(
    (key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  );

const fetchThemeVariable = (name: string) => {
  return (codeBlockThemes as any)[name];
};

const themes = [
  "a11yLight",
  "anOldHope",
  "androidstudio",
  "arta",
  "atomOneDark",
  "atomOneLight",
  "codepen",
  "dracula",
  "far",
  "github",
  "googlecode",
  "hopscotch",
  "hybrid",
  "irBlack",
  "monoBlue",
  "monokaiSublime",
  "monokai",
  "nord",
  "noctisViola",
  "obsidian",
  "ocean",
  "paraisoDark",
  "paraisoLight",
  "pojoaque",
  "purebasic",
  "railscast",
  "rainbow",
  "shadesOfPurple",
  "solarizedDark",
  "solarizedLight",
  "sunburst",
  "tomorrowNightBlue",
  "tomorrowNightBright",
  "tomorrowNightEighties",
  "tomorrowNight",
  "tomorrow",
  "vs2015",
  "xt256",
  "zenburn",
];

export const ThemePicker = ({ themeSwitcher, userTheme }: any) => {
  return (
    <div className="pl-2 pr-2 ml-4 py-2 rounded font-sm bg-dracula">
      <select
        onChange={(event) => {
          themeSwitcher((codeBlockThemes as any)[event.target.value]);
        }}
        className="text-white  bg-dracula ml-2"
      >
        {themes.map((theme, i) =>
          <option key={i} selected={shallowCompare(fetchThemeVariable(theme), userTheme)}>
            {theme}
          </option>
        )}
      </select>
    </div>
  );
};
