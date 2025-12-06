import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("lightblue");

  const updateTheme = (temperature) => {
    if (temperature < 20) setThemeColor("#6ec6ff"); 
    else if (temperature <= 30) setThemeColor("#81c784"); 
    else if (temperature <= 40) setThemeColor("#ffb74d"); 
    else setThemeColor("#e57373"); 
  };

  return (
    <ThemeContext.Provider value={{ themeColor, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
