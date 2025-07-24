import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Settings,
  Analytics,
  DarkMode,
  LightMode,
  Visibility,
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const AppBar = ({
  onSettingsClick,
  onStatsClick,
  onFocusModeToggle,
  focusMode,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <MuiAppBar position="sticky" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          🎙️ خواننده اسکریپت صوتی
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="تغییر حالت">
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="تنظیمات">
            <IconButton color="inherit" onClick={onSettingsClick}>
              <Settings />
            </IconButton>
          </Tooltip>

          <Tooltip title="آمار">
            <IconButton color="inherit" onClick={onStatsClick}>
              <Analytics />
            </IconButton>
          </Tooltip>

          <Tooltip title="حالت تمرکز">
            <IconButton color="inherit" onClick={onFocusModeToggle}>
              <Visibility />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
