"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("cleancity-theme", "light");
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">{isDark ? <Moon size={15} /> : <Sun size={15} />}</span>
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
