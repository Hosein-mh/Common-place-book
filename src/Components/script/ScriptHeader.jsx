import React from "react";
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  Schedule,
  PlayArrow,
  Language as LanguageIcon,
  School,
} from "@mui/icons-material";
import { useScript } from "../../contexts/ScriptContext";

export const ScriptHeader = () => {
  const { scriptData, currentSectionIndex, progress } = useScript();

  if (!scriptData) return null;

  const { scriptInfo } = scriptData;
  const totalProgress =
    ((currentSectionIndex + progress / 100) / scriptData.sections.length) * 100;

  return (
    <Card
      sx={{
        mb: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold", mb: 1 }}
            >
              {scriptInfo.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "white", opacity: 0.9, mb: 2 }}
            >
              {scriptInfo.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                icon={<Schedule />}
                label={scriptInfo.estimatedDuration}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                icon={<School />}
                label={scriptInfo.level}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                icon={<LanguageIcon />}
                label={scriptInfo.language === "fa-IR" ? "فارسی" : "English"}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                پیشرفت کلی
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "white", fontWeight: "bold", mb: 1 }}
              >
                {Math.round(totalProgress)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={totalProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "white",
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "white", opacity: 0.8, mt: 1, display: "block" }}
              >
                بخش {currentSectionIndex + 1} از {scriptData.sections.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
