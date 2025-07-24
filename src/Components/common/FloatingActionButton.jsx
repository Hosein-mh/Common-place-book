import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Mic, Stop } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const FloatingActionButton = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  const { isRTL } = useTheme();

  return (
    <Tooltip title={isRecording ? "توقف ضبط" : "شروع ضبط"}>
      <Fab
        color={isRecording ? "error" : "primary"}
        aria-label="record"
        onClick={isRecording ? onStopRecording : onStartRecording}
        sx={{
          position: "fixed",
          bottom: 24,
          right: isRTL ? "auto" : 24,
          left: isRTL ? 24 : "auto",
          zIndex: 1000,
        }}
      >
        {isRecording ? <Stop /> : <Mic />}
      </Fab>
    </Tooltip>
  );
};
