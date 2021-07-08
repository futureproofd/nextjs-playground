import { useEffect, useState } from "react";

/**
 * Turning to the CSS Variables approach, you'll notice the only component that re-rendered was our ThemeToggler
 * component responsible for updating the body. We swap styles directly instead of using a ThemeProvider (Context)
 * which would cause a re-render of any component within it's context.
 */

// todo take in a prop to determine current time for setting default state.
export const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    console.log("changing theme to", theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <button onClick={() => setTheme(toggleTheme)}>
      Change to {toggleTheme} mode
    </button>
  );
};
