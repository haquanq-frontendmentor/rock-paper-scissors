import { create } from "zustand";

const USER_SAVED_THEME_KEY = "user-pref-theme";
const DOCUMENT_ATTRIBUTE_THEME_DATA_NAME = "data-theme";

const THEMES = {
    DARK: "dark",
    LIGHT: "light",
} as const;

const userPrefersDarkColorScheme = () => window.matchMedia("(prefers-color-scheme:dark").matches;

type Themes = (typeof THEMES)[keyof typeof THEMES];
interface ThemeStoreState {
    theme: Themes;
    setTheme: (value: Themes) => void;
    cycleThems: () => void;
    loadUserSavedTheme: () => void;
}

const useThemeStore = create<ThemeStoreState>()((set, get) => ({
    cycleThems() {
        const state = get();
        state.setTheme(state.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    },
    loadUserSavedTheme() {
        const state = get();
        const savedTheme = localStorage.getItem(USER_SAVED_THEME_KEY);
        if (savedTheme && Object.values(THEMES).includes(savedTheme as Themes)) {
            state.setTheme(savedTheme as Themes);
        } else {
            state.setTheme(userPrefersDarkColorScheme() ? THEMES.DARK : THEMES.LIGHT);
        }
    },
    setTheme(value) {
        set((v) => ({ ...v, theme: value }));
        document.documentElement.setAttribute(DOCUMENT_ATTRIBUTE_THEME_DATA_NAME, value);
        localStorage.setItem(USER_SAVED_THEME_KEY, value);
    },
    theme: THEMES.DARK,
}));

export { THEMES, useThemeStore, type Themes };
