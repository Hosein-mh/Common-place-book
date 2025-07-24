import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { TrendingUp, Speed, CheckCircle } from "@mui/icons-material";
import { useScript } from "../../contexts/ScriptContext";
import { useSessionStats } from "../../hooks/useSessionStats";

export const ProgressBars = () => {
  const { progress, currentSectionIndex, scriptData } = useScript();
  const { sessionStats } = useSessionStats();

  const sectionProgress = progress;
  const overallProgress =
    ((currentSectionIndex + progress / 100) / scriptData.sections.length) * 100;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Speed color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">پیشرفت بخش</Typography>
            </Box>
            <Typography variant="h4" color="primary" gutterBottom>
              {Math.round(sectionProgress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={sectionProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TrendingUp color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">پیشرفت کلی</Typography>
            </Box>
            <Typography variant="h4" color="success.main" gutterBottom>
              {Math.round(overallProgress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={overallProgress}
              color="success"
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CheckCircle color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">دقت جلسه</Typography>
            </Box>
            <Typography variant="h4" color="warning.main" gutterBottom>
              {Math.round(sessionStats.averageAccuracy || 0)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={sessionStats.averageAccuracy || 0}
              color="warning"
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
