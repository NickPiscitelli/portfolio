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

// Function to update CSS variables based on theme
function updateThemeVariables(backgroundColor: string, textColor: string) {
  document.documentElement.style.setProperty('--theme-bg', backgroundColor);
  document.documentElement.style.setProperty('--theme-text', textColor);
}

export const themes = [
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

export const getRandomTheme = () => {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return fetchThemeVariable(themes[randomIndex]);
};

interface ThemePickerProps {
  themeSwitcher: (theme: any) => void;
  userTheme: any;
  darkerBackground?: string;
}

export const ThemePicker = ({ themeSwitcher, userTheme, darkerBackground }: ThemePickerProps) => {
  const backgroundColor = userTheme?.backgroundColor || "#282a36";
  const textColor = userTheme?.color || "#f8f8f2";
  const bgColor = darkerBackground || backgroundColor;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${backgroundColor}`
      }}
      className="pl-2 pr-2 ml-4 py-2 rounded font-sm"
    >
      <select
        onChange={(event) => {
          const newTheme = (codeBlockThemes as any)[event.target.value];
          themeSwitcher(newTheme);

          // Update CSS variables when theme changes
          updateThemeVariables(
            newTheme?.backgroundColor || "#282a36",
            newTheme?.color || "#f8f8f2"
          );
        }}
        style={{
          backgroundColor: 'transparent',
          color: textColor,
          border: 'none',
          outline: 'none'
        }}
        className="ml-2 cursor-pointer"
      >
        {themes.map((theme, i) =>
          <option
            key={i}
            selected={shallowCompare(fetchThemeVariable(theme), userTheme)}
            style={{
              backgroundColor: bgColor,
              color: textColor
            }}
          >
            {theme}
          </option>
        )}
      </select>
    </div>
  );
};
