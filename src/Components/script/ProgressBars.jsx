import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";

export const ProgressBars = ({
  currentProgress = 0,
  overallProgress = 0,
  sessionState = {},
  showSessionProgress = true,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* Current Section Progress */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              پیشرفت بخش فعلی
            </Typography>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              {Math.round(currentProgress)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={currentProgress}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: "grey.200",
              "& .MuiLinearProgress-bar": {
                borderRadius: 6,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              },
            }}
          />

          {sessionState?.isResuming && (
            <Typography
              variant="caption"
              color="info.main"
              sx={{ mt: 0.5, display: "block" }}
            >
              ادامه از {Math.round(sessionState.sectionProgress || 0)}% قبلی
            </Typography>
          )}
        </Box>

        {/* Overall Script Progress */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              پیشرفت کل اسکریپت
            </Typography>
            <Typography
              variant="h6"
              color="secondary.main"
              sx={{ fontWeight: "bold" }}
            >
              {Math.round(overallProgress)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "grey.200",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
              },
            }}
          />
        </Box>

        {/* Session Statistics */}
        {showSessionProgress && sessionState && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 2,
              mt: 2,
              pt: 2,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            {sessionState.pausedAt && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  آخرین توقف
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {new Date(sessionState.pausedAt).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            )}

            {sessionState.resumeCount > 0 && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  تعداد ادامه
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {sessionState.resumeCount}
                </Typography>
              </Box>
            )}

            {sessionState.totalTime && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  زمان کل
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {Math.round(sessionState.totalTime / 1000)}s
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const globalStyles = `
@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes recordingGlow {
  0% {
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(244, 67, 54, 0.6);
  }
  100% {
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
