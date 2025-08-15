import React, { useContext } from "react";
import { ThemeContext } from "../themeContext";
import { CiDark, CiLight } from "react-icons/ci";
import { Button } from "antd";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      type="text"
    >
      {theme === "dark" ? <CiLight size={20} className="text-white" /> : <CiDark size={20} />}
    </Button>
  );
};

export default ThemeToggle;
