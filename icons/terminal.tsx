interface TerminalIconProps {
  color?: string;
}

export const TerminalIcon = ({ color = "#ffffff" }: TerminalIconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 17L10 11L4 5M12 19H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
