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
  Brightness4,
  Brightness7,
  Language,
  Menu,
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const AppBar = ({
  onSettingsClick,
  onStatsClick,
  onMenuClick,
  title = "خواننده اسکریپت صوتی",
}) => {
  const { isDarkMode, toggleDarkMode, isRTL, toggleRTL } = useTheme();

  return (
    <MuiAppBar position="sticky" elevation={2}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="تغییر زبان">
            <IconButton color="inherit" onClick={toggleRTL}>
              <Language />
            </IconButton>
          </Tooltip>

          <Tooltip title={isDarkMode ? "حالت روشن" : "حالت تاریک"}>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="آمار">
            <IconButton color="inherit" onClick={onStatsClick}>
              <Analytics />
            </IconButton>
          </Tooltip>

          <Tooltip title="تنظیمات">
            <IconButton color="inherit" onClick={onSettingsClick}>
              <Settings />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

