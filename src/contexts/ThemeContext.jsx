import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeContextProvider");
  }
  return context;
};

const createAppTheme = (isDark, direction = "rtl") =>
  createTheme({
    direction,
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#dc004e",
        light: "#ff5983",
        dark: "#9a0036",
      },
      background: {
        default: isDark ? "#121212" : "#f5f7fa",
        paper: isDark ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: [
        "Vazirmatn",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 12,
            padding: "10px 24px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  });

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = createAppTheme(isDarkMode, isRTL ? "rtl" : "ltr");

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleRTL = () => setIsRTL(!isRTL);

  const ThemeWrapper = isRTL
    ? ({ children }) => (
        <CacheProvider value={cacheRtl}>{children}</CacheProvider>
      )
    : ({ children }) => <>{children}</>;

  const value = {
    isDarkMode,
    isRTL,
    toggleDarkMode,
    toggleRTL,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeWrapper>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
};
