import React from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

export const LoadingScreen = ({ message = "در حال بارگذاری..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          boxShadow: 24,
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <MicIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
              animation: "pulse 1.5s infinite",
            }}
          />
        </Box>

        <CircularProgress size={40} sx={{ mb: 2 }} color="primary" />

        <Typography variant="h6" color="text.primary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};
