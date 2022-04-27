import {
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type ComputedColorScheme = "dark" | "light";
type ComputedColorSchemeIcon = "☾" | "☀";

interface ColorSchemeContextProps {
  colorScheme: "dark" | "light" | "system" | string;
  computedColorScheme: ComputedColorScheme;
  computedColorSchemeIcon: ComputedColorSchemeIcon;
  setColorScheme: Dispatch<
    SetStateAction<"dark" | "light" | "system" | string>
  >;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps>({
  colorScheme: "system",
  computedColorScheme: "light",
  computedColorSchemeIcon: "☀",
  setColorScheme: () => {},
});

export const ColorSchemeProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [colorScheme, setColorScheme] = useState("system");
  const [computedColorScheme, setComputedColorScheme] =
    useState<ComputedColorScheme>("light");

  useEffect(() => {
    const localStorageTheme = localStorage.theme;

    if (localStorageTheme) {
      setColorScheme(localStorageTheme);
    }

    if (["dark", "light"].includes(localStorageTheme)) {
      setComputedColorScheme(localStorageTheme);
    }
  }, []);

  useEffect(() => {
    const isDarkPreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    let nextComputedColorScheme: ComputedColorScheme = "light";

    switch (colorScheme) {
      case "dark":
        localStorage.theme = "dark";
        nextComputedColorScheme = "dark";
        break;
      case "light":
        localStorage.theme = "light";
        nextComputedColorScheme = "light";
        break;
      default:
      case "system":
        localStorage.removeItem("theme");
        nextComputedColorScheme = isDarkPreferred ? "dark" : "light";
        break;
    }

    setComputedColorScheme(nextComputedColorScheme);

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && isDarkPreferred)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorScheme]);

  const computedColorSchemeIcon = computedColorScheme === "light" ? "☀" : "☾";

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        computedColorScheme,
        computedColorSchemeIcon,
        setColorScheme,
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorSchemeContext = () => useContext(ColorSchemeContext);
