import React from "react";
import { Typography, Box, Grid, LinearProgress, Chip } from "@mui/material";
import { TrendingUp, Timer, CheckCircle, Speed } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";
import { useSessionStats } from "../../hooks/useSessionStats";
import { useScript } from "../../contexts/ScriptContext";

export const QuickStats = () => {
  const { sessionStats } = useSessionStats();
  const { progress, currentSectionIndex, scriptData } = useScript();

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const stats = [
    {
      icon: <Speed color="primary" />,
      label: "پیشرفت فعلی",
      value: `${Math.round(progress)}%`,
      color: "primary",
      progress: progress,
    },
    {
      icon: <TrendingUp color="success" />,
      label: "دقت میانگین",
      value: `${Math.round(sessionStats.averageAccuracy || 0)}%`,
      color: "success",
      progress: sessionStats.averageAccuracy || 0,
    },
    {
      icon: <CheckCircle color="warning" />,
      label: "بخش‌های تکمیل",
      value: `${sessionStats.completedSections}/${scriptData.sections.length}`,
      color: "warning",
      progress:
        (sessionStats.completedSections / scriptData.sections.length) * 100,
    },
    {
      icon: <Timer color="info" />,
      label: "زمان جلسه",
      value: formatTime(sessionStats.sessionDuration),
      color: "info",
      showProgress: false,
    },
  ];

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        📊 آمار سریع
      </Typography>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1.5,
                bgcolor: "background.default",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              {stat.icon}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stat.value}
                </Typography>
                {stat.showProgress !== false && (
                  <LinearProgress
                    variant="determinate"
                    value={stat.progress || 0}
                    color={stat.color}
                    sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                  />
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Quick achievements */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          🏆 دستاورد‌ها:
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {sessionStats.bestAccuracy > 80 && (
            <Chip
              label="دقت بالا"
              size="small"
              color="success"
              variant="outlined"
            />
          )}
          {sessionStats.completedSections > 0 && (
            <Chip
              label="پیشرفت خوب"
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {sessionStats.sessionDuration > 300000 && (
            <Chip
              label="تمرین مداوم"
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </StyledPaper>
  );
};
