import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const handleToggle = () => {
    setTheme((prevState) => !prevState);
  };

  const containerStyles = {
    backgroundColor: theme ? "black" : "white",
    color: theme ? "white" : "black",
  };

  const themeInfo = { handleToggle, containerStyles };

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
