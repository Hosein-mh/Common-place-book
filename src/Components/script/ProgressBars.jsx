import React from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";
import { useScript } from "../../contexts/ScriptContext";
import { useSettings } from "../../hooks/useSettings";

export const ProgressBars = () => {
  const {
    progress,
    overallProgress,
    matchedWords,
    currentSection,
    scriptData,
  } = useScript();
  const { settings } = useSettings();

  const scriptWords =
    currentSection?.text
      .toLowerCase()
      .replace(
        /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
        ""
      )
      .split(" ")
      .filter((w) => w.length > 0) || [];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="body2" gutterBottom>
          پیشرفت بخش فعلی: {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 12, borderRadius: 6 }}
          color={
            progress >= settings.autoAdvanceThreshold ? "success" : "primary"
          }
        />
        <Typography variant="caption" color="text.secondary">
          {matchedWords.size} از {scriptWords.length} کلمه
        </Typography>
        {progress >= settings.autoAdvanceThreshold && settings.autoAdvance && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "success.main",
              mt: 0.5,
              animation: "pulse 1s infinite",
            }}
          >
            ✅ آماده برای بخش بعدی...
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="body2" gutterBottom>
          پیشرفت کل: {Math.round(overallProgress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={overallProgress}
          sx={{ height: 12, borderRadius: 6 }}
          color="secondary"
        />
        <Typography variant="caption" color="text.secondary">
          بخش{" "}
          {scriptData.sections.findIndex((s) => s.id === currentSection?.id) +
            1}{" "}
          از {scriptData.sections.length}
        </Typography>
      </Grid>
    </Grid>
  );
};
