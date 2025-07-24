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
  Divider,
  Alert,
  Chip
} from "@mui/material";
import { Settings, Language, VolumeUp, Speed, Psychology } from "@mui/icons-material";
import { useSettings } from "../../hooks/useSettings";
import { VOICE_LANGUAGES } from "../../utils/constants";

export const SettingsDialog = ({ open, onClose, onLanguageChange }) => {
  const { settings, updateSetting, resetSettings } = useSettings();

  const handleLanguageChange = (language) => {
    updateSetting("language", language);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  const handleResetSettings = () => {
    resetSettings();
    if (onLanguageChange) {
      onLanguageChange(settings.language);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ 
        sx: { 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        } 
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Settings color="primary" />
          <Typography variant="h5" fontWeight="bold">
            تنظیمات سیستم
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          تنظیمات شما به صورت خودکار ذخیره می‌شود
        </Alert>

        <Grid container spacing={4}>
          {/* Audio Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VolumeUp color="primary" />
              تنظیمات صوتی
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>زبان تشخیص صوت</InputLabel>
                  <Select
                    value={settings.language}
                    label="زبان تشخیص صوت"
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    startAdornment={<Language sx={{ mr: 1 }} />}
                  >
                    {Object.entries(VOICE_LANGUAGES).map(([code, name]) => (
                      <MenuItem key={code} value={code}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {name}
                          <Chip label={code} size="small" variant="outlined" />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>سرعت پخش صوتی</Typography>
                <Slider
                  value={settings.speakingRate}
                  onChange={(_, value) => updateSetting("speakingRate", value)}
                  min={0.1}
                  max={2.0}
                  step={0.1}
                  marks={[
                    { value: 0.5, label: 'آهسته' },
                    { value: 1.0, label: 'عادی' },
                    { value: 1.5, label: 'سریع' }
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}x`}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>آستانه اعتماد صوت</Typography>
                <Slider
                  value={settings.confidenceThreshold}
                  onChange={(_, value) => updateSetting("confidenceThreshold", value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  marks={[
                    { value: 0.3, label: 'کم' },
                    { value: 0.7, label: 'متوسط' },
                    { value: 0.9, label: 'بالا' }
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Learning Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed color="primary" />
              تنظیمات یادگیری
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>آستانه پیشرفت خودکار</Typography>
                <Slider
                  value={settings.autoAdvanceThreshold}
                  onChange={(_, value) => updateSetting("autoAdvanceThreshold", value)}
                  min={50}
                  max={95}
                  step={5}
                  marks={[
                    { value: 60, label: '60%' },
                    { value: 75, label: '75%' },
                    { value: 90, label: '90%' }
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
                <Typography variant="caption" color="text.secondary">
                  وقتی این درصد از کلمات گفته شود، خودکار به بخش بعدی می‌رود
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Interface Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology color="primary" />
              تنظیمات رابط کاربری
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoAdvance}
                      onChange={(e) => updateSetting("autoAdvance", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="پیشرفت خودکار"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  خودکار به بخش بعدی برو
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showKeywords}
                      onChange={(e) => updateSetting("showKeywords", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="نمایش کلمات کلیدی"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  هایلایت کلمات مهم
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showNotes}
                      onChange={(e) => updateSetting("showNotes", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="نمایش یادداشت‌ها"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  نمایش نکات کارگردانی
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.continuousRecording}
                      onChange={(e) => updateSetting("continuousRecording", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="ضبط مداوم"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  ضبط بدون توقف
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.audioFeedback}
                      onChange={(e) => updateSetting("audioFeedback", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="بازخورد صوتی"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  صدای تأیید و اخطار
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoSave}
                      onChange={(e) => updateSetting("autoSave", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="ذخیره خودکار"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  ذخیره خودکار پیشرفت
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={handleResetSettings} 
          variant="outlined" 
          color="error"
        >
          بازنشانی
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          size="large"
        >
          تأیید و بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};