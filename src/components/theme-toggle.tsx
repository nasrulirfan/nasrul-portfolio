"use client";

import * as React from "react";
import { useTheme } from "./theme-provider";

const SunIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M7.5 0V2.5M7.5 12.5V15M0 7.5H2.5M12.5 7.5H15M2.87868 2.87868L4.64645 4.64645M10.3536 10.3536L12.1213 12.1213M2.87868 12.1213L4.64645 10.3536M10.3536 4.64645L12.1213 2.87868M11 7.5C11 9.43299 9.43299 11 7.5 11C5.56701 11 4 9.43299 4 7.5C4 5.56701 5.56701 4 7.5 4C9.43299 4 11 5.56701 11 7.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M2.89998 0.499976C2.89998 0.499976 2.89998 0.499976 2.89998 0.499976C2.89998 0.499976 2.89998 0.499976 2.89998 0.499976C2.10002 0.499976 1.89998 1.59998 2.89998 1.89998C4.69998 2.59998 6.89998 4.79998 6.89998 7.49998C6.89998 10.2 4.69998 12.4 2.89998 13.1C1.89998 13.4 2.10002 14.5 2.89998 14.5C7.39998 14.5 11 10.9 11 6.39998C11 1.89998 7.39998 -1.50002 2.89998 -1.50002C2.89998 -1.50002 2.89998 0.499976 2.89998 0.499976Z"
      fill="currentColor"
    />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <SunIcon />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}