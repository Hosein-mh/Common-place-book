// src/Components/layout/MainLayout.jsx - Complete Fixed Implementation
import React, { useState, useCallback } from "react";
import {
  Container,
  Grid,
  Box,
  useMediaQuery,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { AppBar } from "../common/AppBar";
import { FloatingActionButton } from "../common/FloatingActionButton";
import { NotificationSnackbar } from "../common/NotificationSnackbar";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { StatsDialog } from "../dialogs/StatsDialog";
import { ScriptHeader } from "../script/ScriptHeader";
import { RecordingIndicator } from "../script/RecordingIndicator";
import { ProgressBars } from "../script/ProgressBars";
import { ScriptContent } from "../script/ScriptContent";
import { LiveTranscript } from "../sidebar/LiveTranscript";
import { NavigationPanel } from "../sidebar/NavigationPanel";
import { QuickStats } from "../sidebar/QuickStats";
import { QuickActions } from "../sidebar/QuickActions";

// Hooks
import { useVoiceStreamer } from "../../hooks/useVoiceStreamer";
import { useSettings } from "../../hooks/useSettings";
import { useSessionStats } from "../../hooks/useSessionStats";
import { useNotifications } from "../../hooks/useNotifications";

// Services
import { TextProcessor } from "../../services/TextProcessor";

// Contexts
import { useScript } from "../../contexts/ScriptContext";
import { useTheme } from "../../contexts/ThemeContext";

// New component for recording status
const RecordingStatusIndicator = ({ isRecording, sessionState, onResume }) => {
  if (
    !isRecording &&
    sessionState.pausedAt &&
    sessionState.sectionProgress > 0
  ) {
    return (
      <Box
        sx={{
          mb: 2,
          p: 2,
          backgroundColor: "warning.light",
          borderRadius: 2,
          border: 1,
          borderColor: "warning.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" color="warning.dark">
              ضبط متوقف شده
            </Typography>
            <Typography variant="body2" color="text.secondary">
              پیشرفت ذخیره شده: {Math.round(sessionState.sectionProgress)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              متوقف شده در:{" "}
              {new Date(sessionState.pausedAt).toLocaleTimeString("fa-IR")}
            </Typography>
          </Box>
          <Button
            onClick={onResume}
            variant="contained"
            color="success"
            size="small"
            sx={{ minWidth: 120 }}
          >
            ادامه ضبط
          </Button>
        </Box>
      </Box>
    );
  }

  if (isRecording) {
    return (
      <Box
        sx={{
          mb: 2,
          p: 2,
          backgroundColor: "success.light",
          borderRadius: 2,
          border: 1,
          borderColor: "success.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: "error.main",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite",
            }}
          />
          <Typography variant="h6" color="success.dark">
            در حال ضبط...
          </Typography>
          {sessionState.isResuming && (
            <Chip
              label="ادامه از موقعیت قبلی"
              size="small"
              color="info"
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    );
  }

  return null;
};

export const MainLayout = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Hooks
  const { settings } = useSettings();
  const { updateStats, completeSection } = useSessionStats();
  const {
    notification,
    showNotification,
    error,
    showSuccess,
    showError,
    hideNotification,
    hideError,
  } = useNotifications();

  // Script context
  const {
    currentSection,
    currentSectionIndex,
    updateProgress,
    goToNextSection,
    scriptData,
    matchedWords,
  } = useScript();

  // Voice processing callback - UPDATED to handle session state
  const handleTextProcessed = useCallback(
    (recognizedText, confidence, sessionState = {}) => {
      if (!recognizedText || confidence < settings.confidenceThreshold) return;

      const result = TextProcessor.processRecognizedText(
        recognizedText,
        currentSection.text,
        currentSection.keywords || [],
        settings.confidenceThreshold
      );

      // اگر در حال resume هستیم، از پیشرفت قبلی شروع کن
      let adjustedProgress = result.progress;
      if (sessionState.isResuming && sessionState.sectionProgress > 0) {
        adjustedProgress = Math.max(
          result.progress,
          sessionState.sectionProgress
        );
        console.log(
          `ادامه از پیشرفت قبلی: ${sessionState.sectionProgress}% -> ${adjustedProgress}%`
        );
      }

      updateProgress(result.matchedWords, adjustedProgress);
      updateStats(adjustedProgress, result.recognizedWords, result.totalWords);

      // Auto-advance logic
      if (
        settings.autoAdvance &&
        adjustedProgress >= settings.autoAdvanceThreshold
      ) {
        setTimeout(() => {
          goToNextSection();
          completeSection();
          showSuccess("پیشرفت عالی! به بخش بعدی می‌رویم 🎉");
        }, 2000);
      }

      // Audio feedback
      if (settings.audioFeedback && result.matchedWords.length > 0) {
        // Play success sound or provide haptic feedback
        if ("vibrate" in navigator) {
          navigator.vibrate(100);
        }
      }

      // نمایش پیشرفت برای کاربر
      if (result.matchedWords.length > 0) {
        showSuccess(
          `${result.matchedWords.length} کلمه تطبیق یافت! پیشرفت: ${Math.round(adjustedProgress)}%`
        );
      }
    },
    [
      settings,
      currentSection,
      updateProgress,
      updateStats,
      goToNextSection,
      completeSection,
      showSuccess,
    ]
  );

  // Voice streaming with enhanced settings
  const {
    isRecording,
    transcript,
    sessionState,
    startRecording,
    stopRecording,
    resumeRecording,
    handleLanguageChange,
  } = useVoiceStreamer(
    {
      ...settings,
      autoResume: settings.autoResume || false,
      silenceThreshold: settings.silenceThreshold || 3000,
    },
    handleTextProcessed
  );

  const handleSettingsOpen = () => setShowSettings(true);
  const handleStatsOpen = () => setShowStats(true);
  const handleMenuClick = () => setSidebarOpen(!sidebarOpen);

  const toggleFocusMode = () => setFocusMode(!focusMode);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* App Bar */}
      <AppBar
        onSettingsClick={handleSettingsOpen}
        onStatsClick={handleStatsOpen}
        onMenuClick={handleMenuClick}
        title={scriptData?.scriptInfo?.title || "خواننده اسکریپت صوتی"}
      />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar - Left/Right based on RTL */}
          {!focusMode && !isMobile && (
            <Grid item xs={12} lg={3}>
              <Box className="animate-slide-in">
                <LiveTranscript
                  transcript={transcript}
                  isRecording={isRecording}
                  matchedWords={Array.from(matchedWords)}
                />
                <NavigationPanel />
                <QuickStats />
                <QuickActions
                  onNotification={showSuccess}
                  onError={showError}
                />
              </Box>
            </Grid>
          )}

          {/* Main Content Area */}
          <Grid item xs={12} lg={focusMode ? 12 : 9}>
            <Box className="animate-fade-in">
              {/* Script Header */}
              <ScriptHeader />

              {/* NEW: Enhanced Recording Status */}
              <RecordingStatusIndicator
                isRecording={isRecording}
                sessionState={sessionState}
                onResume={resumeRecording}
              />

              {/* Recording Status */}
              <RecordingIndicator
                isRecording={isRecording}
                transcript={transcript}
                sessionState={sessionState}
              />

              {/* Progress Indicators */}
              <ProgressBars
                showSessionProgress={true}
                sessionState={sessionState}
              />

              {/* Main Script Content */}
              <ScriptContent
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                isRecording={isRecording}
              />

              {/* Focus Mode Toggle */}
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  right: focusMode ? 16 : -40,
                  transform: "translateY(-50%)",
                  transition: "all 0.3s ease",
                  zIndex: 1200,
                  opacity: focusMode ? 1 : 0.7,
                }}
              >
                <FloatingActionButton
                  onClick={toggleFocusMode}
                  color={focusMode ? "secondary" : "primary"}
                  size="small"
                  title={focusMode ? "خروج از حالت تمرکز" : "حالت تمرکز"}
                >
                  {focusMode ? "👁️" : "🎯"}
                </FloatingActionButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Dialogs */}
      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <StatsDialog open={showStats} onClose={() => setShowStats(false)} />

      {/* Notifications */}
      <NotificationSnackbar
        open={!!notification}
        message={notification}
        severity="success"
        onClose={hideNotification}
      />

      <NotificationSnackbar
        open={!!error}
        message={error}
        severity="error"
        onClose={hideError}
      />
    </Box>
  );
};
