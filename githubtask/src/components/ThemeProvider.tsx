import { createContext, useContext, useEffect, useState } from "react";

// Define the type for theme options
type Theme = "light" | "dark" | "system";

// Define the ThemeProviderProps
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// Define the ThemeProviderContext type
type ThemeProviderContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeProviderContext | undefined>(undefined);

// Create the ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize state from localStorage or default
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if localStorage is available (for SSR compatibility)
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
    }
    return defaultTheme;
  });

  // Effect to handle system preference changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark");
    
    // Add the appropriate theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Effect to save theme to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  // Create a value object for the context
  const value = {
    theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme)
  };

  // Return the context provider with the value
  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}