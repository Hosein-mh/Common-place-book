// src/Components/dialogs/SettingsDialog.jsx - Fixed Icon Imports
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Chip,
  Divider,
  Alert,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

// ✅ FIXED: Import icons individually
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import RestoreIcon from "@mui/icons-material/Restore";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useSettings } from "../../hooks/useSettings";
import { VOICE_LANGUAGES } from "../../utils/constants";

export const SettingsDialog = ({ open, onClose }) => {
  const { settings, updateSetting, resetSettings } = useSettings();

  const handleLanguageChange = (language) => {
    updateSetting("language", language);
  };

  const handleResetSettings = () => {
    if (window.confirm("آیا از بازنشانی تمام تنظیمات اطمینان دارید؟")) {
      resetSettings();
    }
  };

  const handleSaveAndClose = () => {
    // Save settings to localStorage or API
    localStorage.setItem("voiceAppSettings", JSON.stringify(settings));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "95vh",
          direction: "rtl",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
          borderBottom: 1,
          borderColor: "divider",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <SettingsIcon color="primary" fontSize="large" />
          <Typography variant="h5" component="div">
            تنظیمات پیشرفته
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Grid container spacing={4}>
          {/* Voice Recognition Settings */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                avatar={<MicIcon color="primary" />}
                title="تنظیمات تشخیص صوت"
                subheader="پیکربندی میکروفون و تشخیص گفتار"
              />
              <CardContent>
                <Grid container spacing={3}>
                  {/* Language Selection */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>زبان تشخیص صوت</InputLabel>
                      <Select
                        value={settings.language || "fa-IR"}
                        label="زبان تشخیص صوت"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                      >
                        {Object.entries(VOICE_LANGUAGES).map(([code, name]) => (
                          <MenuItem key={code} value={code}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {name}
                              <Chip
                                label={code}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Confidence Threshold */}
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>
                      آستانه اعتماد صوت (
                      {Math.round((settings.confidenceThreshold || 0.7) * 100)}
                      %)
                    </Typography>
                    <Slider
                      value={settings.confidenceThreshold || 0.7}
                      onChange={(_, value) =>
                        updateSetting("confidenceThreshold", value)
                      }
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      marks={[
                        { value: 0.3, label: "کم" },
                        { value: 0.7, label: "متوسط" },
                        { value: 0.9, label: "زیاد" },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) =>
                        `${Math.round(value * 100)}%`
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      حداقل درصد اطمینان برای پذیرش کلمات تشخیص داده شده
                    </Typography>
                  </Grid>

                  {/* Silence Threshold */}
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>
                      آستانه سکوت ({(settings.silenceThreshold || 3000) / 1000}{" "}
                      ثانیه)
                    </Typography>
                    <Slider
                      value={(settings.silenceThreshold || 3000) / 1000}
                      onChange={(_, value) =>
                        updateSetting("silenceThreshold", value * 1000)
                      }
                      min={1}
                      max={10}
                      step={0.5}
                      marks={[
                        { value: 1, label: "1s" },
                        { value: 3, label: "3s" },
                        { value: 5, label: "5s" },
                        { value: 10, label: "10s" },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}s`}
                    />
                    <Typography variant="caption" color="text.secondary">
                      مدت زمان سکوت قبل از توقف خودکار میکروفون
                    </Typography>
                  </Grid>

                  {/* Auto Resume */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoResume || false}
                          onChange={(e) =>
                            updateSetting("autoResume", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="شروع مجدد خودکار"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      شروع خودکار ضبط بعد از سکوت (بدون دخالت کاربر)
                    </Typography>
                  </Grid>

                  {/* Continuous Recording */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.continuousRecording || true}
                          onChange={(e) =>
                            updateSetting(
                              "continuousRecording",
                              e.target.checked
                            )
                          }
                          color="primary"
                        />
                      }
                      label="ضبط مداوم"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      ضبط بدون توقف (بجز سکوت تنظیم شده)
                    </Typography>
                  </Grid>

                  {/* Audio Feedback */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.audioFeedback || true}
                          onChange={(e) =>
                            updateSetting("audioFeedback", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="بازخورد صوتی"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      پخش صدای تأیید و اخطار برای عملیات
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Playback & Speech Settings */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                avatar={<VolumeUpIcon color="primary" />}
                title="تنظیمات پخش و گفتار"
                subheader="پیکربندی سرعت و کیفیت پخش"
              />
              <CardContent>
                <Grid container spacing={3}>
                  {/* Speaking Rate */}
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>
                      سرعت پخش صوتی ({settings.speakingRate || 0.8}x)
                    </Typography>
                    <Slider
                      value={settings.speakingRate || 0.8}
                      onChange={(_, value) =>
                        updateSetting("speakingRate", value)
                      }
                      min={0.1}
                      max={2.0}
                      step={0.1}
                      marks={[
                        { value: 0.5, label: "آهسته" },
                        { value: 1.0, label: "عادی" },
                        { value: 1.5, label: "سریع" },
                        { value: 2.0, label: "خیلی سریع" },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}x`}
                    />
                  </Grid>

                  {/* Voice Volume */}
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>
                      صدای سیستم (
                      {Math.round((settings.voiceVolume || 0.8) * 100)}%)
                    </Typography>
                    <Slider
                      value={settings.voiceVolume || 0.8}
                      onChange={(_, value) =>
                        updateSetting("voiceVolume", value)
                      }
                      min={0.0}
                      max={1.0}
                      step={0.1}
                      marks={[
                        { value: 0.0, label: "خاموش" },
                        { value: 0.5, label: "متوسط" },
                        { value: 1.0, label: "بلند" },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) =>
                        `${Math.round(value * 100)}%`
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Advanced Settings */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                avatar={<AutoModeIcon color="primary" />}
                title="تنظیمات پیشرفته"
                subheader="عملکرد خودکار و هوشمند سیستم"
              />
              <CardContent>
                <Grid container spacing={3}>
                  {/* Auto Advance */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoAdvance || true}
                          onChange={(e) =>
                            updateSetting("autoAdvance", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="پیشرفت خودکار"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      رفتن خودکار به بخش بعدی پس از تکمیل
                    </Typography>
                  </Grid>

                  {/* Auto Advance Threshold */}
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>
                      آستانه پیشرفت خودکار (
                      {settings.autoAdvanceThreshold || 75}%)
                    </Typography>
                    <Slider
                      value={settings.autoAdvanceThreshold || 75}
                      onChange={(_, value) =>
                        updateSetting("autoAdvanceThreshold", value)
                      }
                      min={50}
                      max={100}
                      step={5}
                      marks={[
                        { value: 60, label: "60%" },
                        { value: 75, label: "75%" },
                        { value: 90, label: "90%" },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      disabled={!settings.autoAdvance}
                    />
                    <Typography variant="caption" color="text.secondary">
                      درصد پیشرفت لازم برای رفتن به بخش بعدی
                    </Typography>
                  </Grid>

                  {/* Auto Save */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoSave || true}
                          onChange={(e) =>
                            updateSetting("autoSave", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="ذخیره خودکار"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      ذخیره خودکار پیشرفت و تنظیمات هر 5 ثانیه
                    </Typography>
                  </Grid>

                  {/* Session Persistence */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.sessionPersistence || true}
                          onChange={(e) =>
                            updateSetting(
                              "sessionPersistence",
                              e.target.checked
                            )
                          }
                          color="primary"
                        />
                      }
                      label="حفظ جلسه"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      حفظ وضعیت جلسه بین بازدیدها
                    </Typography>
                  </Grid>

                  {/* Show Keywords */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showKeywords || true}
                          onChange={(e) =>
                            updateSetting("showKeywords", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="نمایش کلمات کلیدی"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      نمایش کلمات مهم و کلیدی در هر بخش
                    </Typography>
                  </Grid>

                  {/* Show Notes */}
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showNotes || true}
                          onChange={(e) =>
                            updateSetting("showNotes", e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label="نمایش یادداشت‌ها"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      نمایش راهنمایی‌ها و یادداشت‌های اجرا
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Recording Controls */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                avatar={<MicIcon color="primary" />}
                title="کنترل‌های ضبط"
                subheader="دکمه‌های شروع و توقف ضبط صوت"
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<MicIcon />}
                    sx={{ minWidth: 140 }}
                  >
                    شروع ضبط
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<MicOffIcon />}
                    sx={{ minWidth: 140 }}
                  >
                    توقف ضبط
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{ minWidth: 140 }}
                  >
                    ادامه ضبط
                  </Button>

                  <Button
                    variant="outlined"
                    color="info"
                    size="large"
                    startIcon={<RestartAltIcon />}
                    sx={{ minWidth: 140 }}
                  >
                    شروع مجدد
                  </Button>
                </Box>

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  از این دکمه‌ها برای کنترل ضبط صوت استفاده کنید
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Important Alerts */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>راهنما:</strong> تنظیمات سکوت و شروع مجدد خودکار به حفظ
                پیشرفت شما کمک می‌کند. در صورت قطع شدن میکروفون، پیشرفت شما
                ذخیره شده و با شروع مجدد از همان نقطه ادامه می‌یابد.
              </Typography>
            </Alert>

            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>نکته مهم:</strong> برای عملکرد بهتر تشخیص صوت، از مرورگر
                Chrome یا Firefox استفاده کنید و اتصال اینترنت پایدار داشته
                باشید.
              </Typography>
            </Alert>

            <Alert severity="success">
              <Typography variant="body2">
                <strong>ویژگی جدید:</strong> سیستم حالا قابلیت حفظ پیشرفت حین
                سکوت و ادامه از همان نقطه را دارد. این ویژگی باعث می‌شود تجربه
                یادگیری شما روان‌تر و مؤثرتر باشد.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ p: 3, gap: 2, borderTop: 1, borderColor: "divider" }}
      >
        <Tooltip title="بازگردانی تنظیمات به حالت پیش‌فرض">
          <Button
            onClick={handleResetSettings}
            variant="outlined"
            color="error"
            startIcon={<RestoreIcon />}
          >
            بازنشانی تنظیمات
          </Button>
        </Tooltip>

        <Button onClick={onClose} variant="outlined" startIcon={<CloseIcon />}>
          انصراف
        </Button>

        <Button
          onClick={handleSaveAndClose}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
        >
          ذخیره و بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};
