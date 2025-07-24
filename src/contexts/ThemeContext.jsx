import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline, GlobalStyles } from "@mui/material";

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
        main: isDark ? "#90caf9" : "#1976d2",
        light: isDark ? "#e3f2fd" : "#42a5f5",
        dark: isDark ? "#42a5f5" : "#1565c0",
        contrastText: isDark ? "#000" : "#fff",
      },
      secondary: {
        main: isDark ? "#f48fb1" : "#dc004e",
        light: isDark ? "#fce4ec" : "#ff5983",
        dark: isDark ? "#c2185b" : "#9a0036",
      },
      success: {
        main: isDark ? "#81c784" : "#4caf50",
        light: isDark ? "#c8e6c9" : "#81c784",
        dark: isDark ? "#388e3c" : "#2e7d32",
      },
      warning: {
        main: isDark ? "#ffb74d" : "#ff9800",
        light: isDark ? "#fff3e0" : "#ffcc02",
        dark: isDark ? "#f57c00" : "#e65100",
      },
      error: {
        main: isDark ? "#e57373" : "#f44336",
        light: isDark ? "#ffcdd2" : "#e57373",
        dark: isDark ? "#d32f2f" : "#c62828",
      },
      info: {
        main: isDark ? "#64b5f6" : "#2196f3",
        light: isDark ? "#e1f5fe" : "#64b5f6",
        dark: isDark ? "#1976d2" : "#0d47a1",
      },
      background: {
        default: isDark ? "#0a0a0a" : "#f8fafc",
        paper: isDark ? "#1a1a1a" : "#ffffff",
      },
      text: {
        primary: isDark ? "#ffffff" : "#2d3748",
        secondary: isDark ? "#b0b0b0" : "#718096",
      },
      divider: isDark ? "#333333" : "#e2e8f0",
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
        selected: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily: [
        "Vazirmatn",
        "Inter",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      h1: {
        fontWeight: 800,
        letterSpacing: "-0.025em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.025em",
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        lineHeight: 1.7,
      },
      body2: {
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 16,
    },
    shadows: isDark
      ? [
          "none",
          "0px 1px 3px rgba(0, 0, 0, 0.4)",
          "0px 2px 8px rgba(0, 0, 0, 0.4)",
          "0px 3px 12px rgba(0, 0, 0, 0.4)",
          "0px 4px 16px rgba(0, 0, 0, 0.4)",
          "0px 6px 20px rgba(0, 0, 0, 0.5)",
          "0px 8px 24px rgba(0, 0, 0, 0.5)",
          "0px 12px 32px rgba(0, 0, 0, 0.5)",
          "0px 16px 40px rgba(0, 0, 0, 0.6)",
          "0px 20px 48px rgba(0, 0, 0, 0.6)",
          ...Array(15).fill("0px 24px 56px rgba(0, 0, 0, 0.7)"),
        ]
      : [
          "none",
          "0px 1px 3px rgba(0, 0, 0, 0.08)",
          "0px 2px 8px rgba(0, 0, 0, 0.08)",
          "0px 3px 12px rgba(0, 0, 0, 0.08)",
          "0px 4px 16px rgba(0, 0, 0, 0.08)",
          "0px 6px 20px rgba(0, 0, 0, 0.1)",
          "0px 8px 24px rgba(0, 0, 0, 0.1)",
          "0px 12px 32px rgba(0, 0, 0, 0.1)",
          "0px 16px 40px rgba(0, 0, 0, 0.12)",
          "0px 20px 48px rgba(0, 0, 0, 0.12)",
          ...Array(15).fill("0px 24px 56px rgba(0, 0, 0, 0.15)"),
        ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: isDark ? "#666 #2b2b2b" : "#c1c1c1 #f1f1f1",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: isDark ? "#2b2b2b" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: isDark ? "#666" : "#c1c1c1",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: isDark ? "#888" : "#a8a8a8",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 12,
            padding: "12px 24px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: isDark
                ? "0 4px 20px rgba(144, 202, 249, 0.3)"
                : "0 4px 20px rgba(25, 118, 210, 0.2)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease-in-out",
          },
          contained: {
            background: isDark
              ? "linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)"
              : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)"
                : "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`,
            background: isDark
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 500,
            "&.MuiChip-filled": {
              background: isDark
                ? "linear-gradient(135deg, #333 0%, #555 100%)"
                : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 8,
            background: isDark ? "#333" : "#e2e8f0",
          },
          bar: {
            borderRadius: 8,
            background: isDark
              ? "linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)"
              : "linear-gradient(90deg, #1976d2 0%, #1565c0 100%)",
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 8px 32px rgba(144, 202, 249, 0.3)"
              : "0 8px 32px rgba(25, 118, 210, 0.2)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: isDark
                ? "0 12px 40px rgba(144, 202, 249, 0.4)"
                : "0 12px 40px rgba(25, 118, 210, 0.3)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`,
            background: isDark
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
            backdropFilter: "blur(20px)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
            color: isDark ? "#ffffff" : "#2d3748",
            border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`,
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiAlert-root": {
              borderRadius: 12,
              backdropFilter: "blur(10px)",
            },
          },
        },
      },
    },
  });

// Global styles for animations and additional effects
const globalStyles = (isDark) => ({
  "@keyframes pulse": {
    "0%": { opacity: 1, transform: "scale(1)" },
    "50%": { opacity: 0.7, transform: "scale(1.02)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
  "@keyframes slideIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "@keyframes glow": {
    "0%": {
      boxShadow: isDark
        ? "0 0 5px rgba(144, 202, 249, 0.3)"
        : "0 0 5px rgba(25, 118, 210, 0.3)",
    },
    "50%": {
      boxShadow: isDark
        ? "0 0 20px rgba(144, 202, 249, 0.6)"
        : "0 0 20px rgba(25, 118, 210, 0.6)",
    },
    "100%": {
      boxShadow: isDark
        ? "0 0 5px rgba(144, 202, 249, 0.3)"
        : "0 0 5px rgba(25, 118, 210, 0.3)",
    },
  },
  ".animate-pulse": {
    animation: "pulse 1.5s infinite",
  },
  ".animate-slide-in": {
    animation: "slideIn 0.5s ease-out",
  },
  ".animate-fade-in": {
    animation: "fadeIn 0.3s ease-out",
  },
  ".animate-glow": {
    animation: "glow 2s infinite",
  },
  // Custom scrollbar for specific components
  ".custom-scrollbar": {
    scrollbarWidth: "thin",
    scrollbarColor: isDark ? "#666 #2b2b2b" : "#c1c1c1 #f1f1f1",
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: isDark ? "#666" : "#c1c1c1",
      borderRadius: 3,
      "&:hover": {
        backgroundColor: isDark ? "#888" : "#a8a8a8",
      },
    },
  },
  // Glass morphism effects
  ".glass-effect": {
    background: isDark ? "rgba(26, 26, 26, 0.8)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    border: `1px solid ${
      isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    }`,
  },
  // Gradient text
  ".gradient-text": {
    background: isDark
      ? "linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)"
      : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles(isDarkMode)} />
          {children}
        </ThemeProvider>
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
};
