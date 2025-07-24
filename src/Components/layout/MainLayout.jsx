// src/components/layout/MainLayout.jsx - Complete Implementation
import React, { useState, useCallback } from "react";
import { Container, Grid, Box, useMediaQuery } from "@mui/material";
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

  // Voice processing callback
  const handleTextProcessed = useCallback(
    (recognizedText, confidence) => {
      if (!recognizedText || confidence < settings.confidenceThreshold) return;

      const result = TextProcessor.processRecognizedText(
        recognizedText,
        currentSection.text,
        currentSection.keywords || [],
        settings.confidenceThreshold
      );

      updateProgress(result.matchedWords, result.progress);
      updateStats(result.progress, result.recognizedWords, result.totalWords);

      // Auto-advance logic
      if (
        settings.autoAdvance &&
        result.progress >= settings.autoAdvanceThreshold
      ) {
        setTimeout(() => {
          goToNextSection();
          completeSection();
          showSuccess("پیشرفت خوب! به بخش بعدی می‌رویم 🎉");
        }, 2000);
      }

      // Audio feedback
      if (settings.audioFeedback && result.matchedWords.length > 0) {
        // Play success sound or provide haptic feedback
        if ("vibrate" in navigator) {
          navigator.vibrate(100);
        }
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

  // Voice streaming
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    handleLanguageChange,
  } = useVoiceStreamer(settings, handleTextProcessed);

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

              {/* Recording Status */}
              <RecordingIndicator
                isRecording={isRecording}
                transcript={transcript}
              />

              {/* Progress Indicators */}
              <ProgressBars />

              {/* Main Script Content */}
              <ScriptContent />

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
                  "&:hover": { opacity: 1, right: 16 },
                }}
              >
                <Box
                  onClick={toggleFocusMode}
                  sx={{
                    p: 1,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "12px 0 0 12px",
                    cursor: "pointer",
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    boxShadow: 3,
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {focusMode ? "نمایش کامل" : "حالت تمرکز"}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Mobile Sidebar - Bottom Sheet Style */}
          {isMobile && sidebarOpen && (
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60vh",
                bgcolor: "background.paper",
                borderRadius: "20px 20px 0 0",
                zIndex: 1300,
                p: 2,
                overflow: "auto",
                boxShadow: 24,
                transform: sidebarOpen ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.3s ease",
              }}
              className="custom-scrollbar"
            >
              <Box
                sx={{
                  width: 40,
                  height: 4,
                  bgcolor: "divider",
                  borderRadius: 2,
                  mx: "auto",
                  mb: 2,
                }}
              />

              <LiveTranscript
                transcript={transcript}
                isRecording={isRecording}
                matchedWords={Array.from(matchedWords)}
              />
              <NavigationPanel />
              <QuickStats />
              <QuickActions onNotification={showSuccess} onError={showError} />
            </Box>
          )}

          {/* Mobile Overlay */}
          {isMobile && sidebarOpen && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1200,
              }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </Grid>
      </Container>

      {/* Floating Action Button */}
      <FloatingActionButton
        isRecording={isRecording}
        onStartRecording={() => {
          startRecording();
          showSuccess("ضبط آغاز شد 🎙️");
        }}
        onStopRecording={() => {
          stopRecording();
          showSuccess("ضبط متوقف شد");
        }}
      />

      {/* Dialogs */}
      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onLanguageChange={handleLanguageChange}
      />

      <StatsDialog open={showStats} onClose={() => setShowStats(false)} />

      {/* Notifications */}
      <NotificationSnackbar
        notification={notification}
        showNotification={showNotification}
        error={error}
        onHideNotification={hideNotification}
        onHideError={hideError}
      />
    </Box>
  );
};
