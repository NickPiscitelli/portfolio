import { useEffect, useState } from "react";

interface HackerNameProps {
  textColor?: string;
}

const name = "Nick Piscitelli";
const fullNameLetters = name.split("");

export const HackerName = ({ textColor = "#f8f8f2" }: HackerNameProps) => {
  const [hackerName, setHackerName] = useState<string | undefined>(undefined);

  let timer: boolean | NodeJS.Timer;
  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        const letter = fullNameLetters.shift();
        if (letter) setHackerName(`${hackerName}${letter}`);
      }, 250);

    if (hackerName === name) clearInterval(timer as any);
  };

  useEffect(() => {
    setHackerName("");
  }, []);

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer as any);
  }, [hackerName]);

  return (
    <div style={{ color: textColor }} className="font-mono">
      {hackerName}
      {hackerName === name && (
        <span style={{ color: textColor }} className="blink align-top font-thin relative top-[-1px]">
          |
        </span>
      )}
    </div>
  );
};
