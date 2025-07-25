import React from "react";
import { Box, Typography, Chip, LinearProgress, Button } from "@mui/material";
import { Mic, MicOff, Pause, PlayArrow } from "@mui/icons-material";

export const RecordingIndicator = ({
  isRecording,
  transcript,
  sessionState,
  onResume,
  audioLevel = 0,
}) => {
  const getRecordingStatus = () => {
    if (
      !isRecording &&
      sessionState?.pausedAt &&
      sessionState?.sectionProgress > 0
    ) {
      return "paused";
    }
    if (isRecording && sessionState?.isResuming) {
      return "resuming";
    }
    if (isRecording) {
      return "recording";
    }
    return "idle";
  };

  const status = getRecordingStatus();

  const statusConfig = {
    idle: {
      color: "default",
      bgColor: "#f5f5f5",
      textColor: "#666",
      icon: <MicOff />,
      title: "آماده ضبط",
    },
    recording: {
      color: "error",
      bgColor: "#ffebee",
      textColor: "#c62828",
      icon: <Mic />,
      title: "در حال ضبط",
    },
    paused: {
      color: "warning",
      bgColor: "#fff3e0",
      textColor: "#ef6c00",
      icon: <Pause />,
      title: "ضبط متوقف شده",
    },
    resuming: {
      color: "info",
      bgColor: "#e3f2fd",
      textColor: "#1565c0",
      icon: <PlayArrow />,
      title: "در حال ادامه",
    },
  };

  const config = statusConfig[status];

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: 1,
        borderColor:
          config.color === "default" ? "divider" : `${config.color}.main`,
        backgroundColor: config.bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Audio Level Visualization */}
      {isRecording && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            backgroundColor: "success.main",
            width: `${audioLevel}%`,
            transition: "width 0.1s ease",
            opacity: 0.7,
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor:
                config.color === "default"
                  ? "grey.300"
                  : `${config.color}.main`,
              color: "white",
              animation:
                status === "recording" ? "pulse 1.5s infinite" : "none",
            }}
          >
            {config.icon}
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ color: config.textColor, fontWeight: "bold" }}
            >
              {config.title}
            </Typography>

            {status === "paused" && sessionState?.pausedAt && (
              <Typography variant="caption" color="text.secondary">
                متوقف شده در:{" "}
                {new Date(sessionState.pausedAt).toLocaleTimeString("fa-IR")}
              </Typography>
            )}

            {status === "resuming" && (
              <Typography variant="caption" color="info.main">
                ادامه از پیشرفت {Math.round(sessionState?.sectionProgress || 0)}
                %
              </Typography>
            )}
          </Box>

          {/* Status Chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {sessionState?.isResuming && (
              <Chip
                size="small"
                label="ادامه از موقعیت قبلی"
                color="info"
                variant="outlined"
              />
            )}

            {status === "paused" && sessionState?.sectionProgress > 0 && (
              <Chip
                size="small"
                label={`پیشرفت: ${Math.round(sessionState.sectionProgress)}%`}
                color="warning"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        {/* Resume Button for Paused State */}
        {status === "paused" && onResume && (
          <Button
            onClick={onResume}
            variant="contained"
            color="success"
            size="small"
            startIcon={<PlayArrow />}
            sx={{ minWidth: 120 }}
          >
            ادامه ضبط
          </Button>
        )}
      </Box>

      {/* Transcript Display */}
      {transcript && isRecording && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary" gutterBottom>
            متن تشخیص داده شده:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {transcript}
          </Typography>
        </Box>
      )}

      {/* Progress Bar for Current Session */}
      {sessionState?.sectionProgress > 0 && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              پیشرفت بخش فعلی
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {Math.round(sessionState.sectionProgress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={sessionState.sectionProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                backgroundColor:
                  status === "paused" ? "warning.main" : "success.main",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
