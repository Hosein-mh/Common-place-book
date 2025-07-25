// src/Components/layout/MainLayout.jsx - Fixed Implementation with FloatingActionButton
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

// Recording status indicator component
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

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Hooks
  const { settings } = useSettings();
  const { stats, updateStats } = useSessionStats();
  const { notification, error, hideNotification, hideError } =
    useNotifications();
  const { currentSection, updateProgress, goToNextSection, matchedWords } =
    useScript();

  // Text processing function
  const handleTextProcessed = useCallback(
    (recognizedText, confidence, sessionState) => {
      if (
        !recognizedText ||
        confidence < (settings?.confidenceThreshold || 0.7)
      ) {
        return;
      }

      // Use TextProcessor to analyze the recognized text
      const result = TextProcessor.processRecognizedText(
        recognizedText,
        currentSection?.text || "",
        currentSection?.keyWords || [],
        settings?.confidenceThreshold || 0.7,
        sessionState
      );

      // Update progress
      updateProgress(result.matchedWords, result.progress);

      // Update stats
      updateStats({
        wordsRecognized: result.recognizedWords,
        accuracy: result.confidence,
        sessionTime: Date.now(),
      });

      // Auto advance if threshold reached
      if (
        settings?.autoAdvance &&
        result.progress >= (settings?.autoAdvanceThreshold || 80)
      ) {
        setTimeout(() => {
          goToNextSection();
        }, 2000);
      }
    },
    [settings, currentSection, updateProgress, updateStats, goToNextSection]
  );

  // Voice streamer hook with proper parameters
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    resumeRecording,
    sessionState,
  } = useVoiceStreamer(settings, handleTextProcessed);

  // Toggle focus mode
  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => !prev);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      {/* App Bar */}
      <AppBar
        onOpenSettings={() => setShowSettings(true)}
        onOpenStats={() => setShowStats(true)}
      />

      <Container maxWidth="xl" sx={{ pt: 3, pb: 8 }}>
        <Grid container spacing={3}>
          {/* Sidebar - Hidden in focus mode */}
          {!focusMode && (
            <Grid item xs={12} md={3}>
              <Box className="animate-slide-in-left">
                {/* Live Transcript */}
                <LiveTranscript transcript={transcript} />

                {/* Navigation Panel */}
                <NavigationPanel />

                {/* Quick Stats */}
                <QuickStats stats={stats} />

                {/* Quick Actions */}
                <QuickActions />
              </Box>
            </Grid>
          )}

          {/* Main Content */}
          <Grid item xs={12} md={focusMode ? 12 : 9}>
            <Box className="animate-fade-in">
              {/* Script Header */}
              <ScriptHeader />

              {/* Enhanced Recording Status */}
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
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FIXED: Main Recording FloatingActionButton - This was missing! */}
      <FloatingActionButton
        isRecording={isRecording}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
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
        <Button
          onClick={toggleFocusMode}
          variant="contained"
          color={focusMode ? "secondary" : "primary"}
          size="small"
          sx={{ minWidth: 40, width: 40, height: 40, borderRadius: "50%" }}
        >
          {focusMode ? "👁️" : "🎯"}
        </Button>
      </Box>

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
