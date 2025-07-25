// src/Components/RecordingControls.jsx - Main Recording Controls
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";

const RecordingControls = ({
  isRecording = false,
  sessionState = {},
  onStartRecording,
  onStopRecording,
  onResumeRecording,
  onRestart,
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

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            کنترل‌های ضبط صوت
          </Typography>

          {/* Status Indicator */}
          <Box sx={{ mb: 2 }}>
            {status === "recording" && (
              <Chip
                icon={<MicIcon />}
                label="در حال ضبط..."
                color="error"
                variant="filled"
                sx={{ animation: "pulse 1.5s infinite" }}
              />
            )}

            {status === "paused" && (
              <Chip
                icon={<PauseIcon />}
                label={`متوقف شده - پیشرفت: ${Math.round(sessionState.sectionProgress)}%`}
                color="warning"
                variant="filled"
              />
            )}

            {status === "resuming" && (
              <Chip
                icon={<PlayArrowIcon />}
                label="در حال ادامه..."
                color="info"
                variant="filled"
              />
            )}

            {status === "idle" && (
              <Chip
                icon={<MicOffIcon />}
                label="آماده ضبط"
                color="default"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        {/* Main Recording Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          {/* Start/Stop Recording Button */}
          {!isRecording ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<MicIcon />}
              onClick={onStartRecording}
              sx={{
                minWidth: 160,
                height: 50,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              شروع ضبط
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<MicOffIcon />}
              onClick={onStopRecording}
              sx={{
                minWidth: 160,
                height: 50,
                fontSize: "1.1rem",
                fontWeight: "bold",
                animation: "pulse 1.5s infinite",
              }}
            >
              توقف ضبط
            </Button>
          )}

          {/* Resume Button (only show when paused) */}
          {status === "paused" && (
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={onResumeRecording}
              sx={{
                minWidth: 160,
                height: 50,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              ادامه ضبط
            </Button>
          )}

          {/* Restart Button */}
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<RestartAltIcon />}
            onClick={onRestart}
            sx={{
              minWidth: 160,
              height: 50,
              fontSize: "1.1rem",
            }}
          >
            شروع مجدد
          </Button>
        </Box>

        {/* Additional Info */}
        {status === "paused" && sessionState?.pausedAt && (
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              p: 2,
              backgroundColor: "warning.light",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="warning.dark">
              <strong>توجه:</strong> ضبط متوقف شده است. برای ادامه از همان نقطه،
              روی "ادامه ضبط" کلیک کنید.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mt: 1 }}
            >
              آخرین توقف:{" "}
              {new Date(sessionState.pausedAt).toLocaleTimeString("fa-IR")}
            </Typography>
          </Box>
        )}

        {isRecording && (
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              p: 2,
              backgroundColor: "success.light",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="success.dark">
              <strong>ضبط فعال:</strong> صحبت کنید تا کلمات شما تشخیص داده شود.
            </Typography>
            {sessionState?.isResuming && (
              <Typography
                variant="caption"
                color="info.main"
                display="block"
                sx={{ mt: 1 }}
              >
                ادامه از پیشرفت {Math.round(sessionState.sectionProgress)}%
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecordingControls;
