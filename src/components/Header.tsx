import { useEffect } from "react";
import { MoonIcon, SunIcon } from "../assets/images";
import { useThemeStore } from "../stores/themeStore";

export const Header = () => {
  const themeStore = useThemeStore();

  useEffect(() => {
    themeStore.loadUserSavedTheme();
  }, []);

  return (
    <header className="relative z-50 py-6">
      <div className="text-navy-800 flex items-center justify-between pl-[0.375rem] dark:text-gray-50">
        <h1 className="pb-1 text-[1.5rem] font-bold tracking-wider uppercase">Hand game</h1>
        <button
          className="flex aspect-square w-10 items-center justify-center rounded-sm transition-[scale] active:scale-95"
          type="button"
          onClick={themeStore.cycleThems}
        >
          {themeStore.theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};
