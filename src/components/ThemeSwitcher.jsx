import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Theme: {theme}</h1>
      <button onClick={(theme, toggleTheme)}>Toggle Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
