import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Analytics } from "@mui/icons-material";
import { useSessionStats } from "../../hooks/useSessionStats";

export const StatsDialog = ({ open, onClose }) => {
  const { sessionStats } = useSessionStats();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Analytics />
          آمار تفصیلی جلسه
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h3" color="primary" gutterBottom>
                {Math.round(sessionStats.averageAccuracy)}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                میانگین دقت کلی
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h3" color="success.main" gutterBottom>
                {Math.round(sessionStats.bestAccuracy)}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                بهترین عملکرد
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" color="info.main" gutterBottom>
                {sessionStats.sectionsCompleted}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                بخش‌های تکمیل شده
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" gutterBottom>
                {sessionStats.totalWords}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                کل کلمات گفته شده
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" color="error.main" gutterBottom>
                {Math.round((Date.now() - sessionStats.startTime) / 60000)}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                دقیقه تمرین
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                روند پیشرفت (آخرین 10 بخش)
              </Typography>
              <Box
                sx={{ height: 200, display: "flex", alignItems: "end", gap: 1 }}
              >
                {sessionStats.accuracyHistory
                  .slice(-10)
                  .map((accuracy, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        bgcolor: "primary.main",
                        borderRadius: 1,
                        height: `${accuracy}%`,
                        minHeight: 4,
                        opacity: 0.8,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                          transform: "scaleY(1.1)",
                        },
                      }}
                      title={`${Math.round(accuracy)}%`}
                    />
                  ))}
              </Box>
              {sessionStats.accuracyHistory.length === 0 && (
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    هنوز داده‌ای برای نمایش وجود ندارد
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};
