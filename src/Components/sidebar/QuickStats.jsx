import React from "react";
import { Typography, Grid, Card } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";
import { useSessionStats } from "../../hooks/useSessionStats";

export const QuickStats = ({ confidence }) => {
  const { sessionStats } = useSessionStats();

  const timeSpent = Math.round((Date.now() - sessionStats.startTime) / 60000);

  return (
    <StyledPaper>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TrendingUp />
        آمار سریع
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h4" color="primary">
              {Math.round(sessionStats.averageAccuracy)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              میانگین دقت
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h4" color="success.main">
              {sessionStats.sectionsCompleted}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              بخش‌های تمام
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h4" color="warning.main">
              {timeSpent}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              دقیقه تمرین
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h4" color="error.main">
              {Math.round(confidence * 100)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              اطمینان فعلی
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};
