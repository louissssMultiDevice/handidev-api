"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ onChange }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("hd_theme") === "light");
    setLight(saved);
    document.documentElement.classList.toggle("light", saved);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("hd_theme", next ? "light" : "dark");
    if (onChange) onChange(next ? "light" : "dark");
  }

  return (
    <button aria-label="Toggle theme" onClick={toggle}
      className="relative w-20 h-10 rounded-full p-1 bg-gradient-to-b from-white/5 to-black/5 shadow-md">
      <div className={`w-8 h-8 rounded-full bg-white dark:bg-black transition-transform duration-500 ${light ? "translate-x-10" : ""}`} />
    </button>
  );
}
