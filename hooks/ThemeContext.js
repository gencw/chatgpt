// context/ThemeContext.tsx
import { darkTheme, lightTheme } from "@/constants/themes";
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext(lightTheme);
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();

  const theme = useMemo(() => {
    return colorScheme === "dark" ? darkTheme : lightTheme;
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
