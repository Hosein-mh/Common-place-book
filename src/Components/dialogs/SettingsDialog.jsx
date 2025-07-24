import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useSettings } from "../../hooks/useSettings";

export const SettingsDialog = ({ open, onClose, onLanguageChange }) => {
  const { settings, updateSetting } = useSettings();

  const handleLanguageChange = (language) => {
    updateSetting("language", language);
    onLanguageChange(language);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Settings />
          تنظیمات
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>آستانه پیشرفت خودکار</Typography>
            <Slider
              value={settings.autoAdvanceThreshold}
              onChange={(_, value) =>
                updateSetting("autoAdvanceThreshold", value)
              }
              min={50}
              max={95}
              step={5}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>سرعت پخش صوتی</Typography>
            <Slider
              value={settings.speakingRate}
              onChange={(_, value) => updateSetting("speakingRate", value)}
              min={0.5}
              max={1.5}
              step={0.1}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}x`}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>آستانه اطمینان</Typography>
            <Slider
              value={settings.confidenceThreshold}
              onChange={(_, value) =>
                updateSetting("confidenceThreshold", value)
              }
              min={0.5}
              max={0.95}
              step={0.05}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>زبان</InputLabel>
              <Select
                value={settings.language}
                label="زبان"
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <MenuItem value="fa-IR">فارسی</MenuItem>
                <MenuItem value="en-US">English</MenuItem>
                <MenuItem value="ar-SA">العربية</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoAdvance}
                    onChange={(e) =>
                      updateSetting("autoAdvance", e.target.checked)
                    }
                  />
                }
                label="پیشرفت خودکار"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showKeywords}
                    onChange={(e) =>
                      updateSetting("showKeywords", e.target.checked)
                    }
                  />
                }
                label="نمایش کلمات کلیدی"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showNotes}
                    onChange={(e) =>
                      updateSetting("showNotes", e.target.checked)
                    }
                  />
                }
                label="نمایش یادداشت‌ها"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.continuousRecording}
                    onChange={(e) =>
                      updateSetting("continuousRecording", e.target.checked)
                    }
                  />
                }
                label="ضبط مداوم"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.audioFeedback}
                    onChange={(e) =>
                      updateSetting("audioFeedback", e.target.checked)
                    }
                  />
                }
                label="بازخورد صوتی"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          تأیید
        </Button>
      </DialogActions>
    </Dialog>
  );
};
