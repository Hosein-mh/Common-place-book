import React, { useState, useCallback } from "react";
import { Container, Grid, CssBaseline } from "@mui/material";
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

export const MainLayout = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

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
  } = useScript();

  // Voice processing callback
  const handleTextProcessed = useCallback(
    (recognizedText, confidence) => {
      if (!recognizedText || confidence < settings.confidenceThreshold) return;

      const result = TextProcessor.processRecognizedText(
        recognizedText,
        currentSection.text,
        currentSection.keywords,
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
          showSuccess("پیشرفت خوب! به بخش بعدی رفتیم 🎉");
        }, 1500);
      }
    },
    [
      currentSection,
      settings,
      updateProgress,
      updateStats,
      goToNextSection,
      completeSection,
      showSuccess,
    ]
  );

  // Voice streamer
  const {
    isRecording,
    audioLevel,
    liveTranscript,
    finalTranscript,
    confidence,
    startRecording,
    stopRecording,
  } = useVoiceStreamer(settings.language, handleTextProcessed, showError);

  // Text-to-speech
  const handleSpeakSection = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentSection.text);
      utterance.lang = settings.language;
      utterance.rate = settings.speakingRate;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, [currentSection.text, settings.language, settings.speakingRate]);

  // Language change handler
  const handleLanguageChange = useCallback(
    (language) => {
      // Language change is handled by the voice streamer hook
      showSuccess(`زبان به ${language} تغییر کرد`);
    },
    [showSuccess]
  );

  return (
    <>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        onSettingsClick={() => setShowSettings(true)}
        onStatsClick={() => setShowStats(true)}
        onFocusModeToggle={() => setFocusMode(!focusMode)}
        focusMode={focusMode}
      />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <ScriptHeader />

        {/* Recording Indicator */}
        <RecordingIndicator isRecording={isRecording} audioLevel={audioLevel} />

        {/* Progress Bars */}
        <ProgressBars />

        {/* Quick Stats (if not in focus mode) */}
        {!focusMode && <QuickStats confidence={confidence} />}

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Script Content */}
          <Grid item xs={12} lg={8}>
            <ScriptContent
              onSpeakSection={handleSpeakSection}
              finalTranscript={finalTranscript}
            />
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Live Transcript */}
            <LiveTranscript
              liveTranscript={liveTranscript}
              finalTranscript={finalTranscript}
              isRecording={isRecording}
              confidence={confidence}
            />

            {/* Navigation Panel */}
            <NavigationPanel />

            {/* Quick Actions (if not in focus mode) */}
            {!focusMode && (
              <QuickActions onNotification={showSuccess} onError={showError} />
            )}
          </Grid>
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
    </>
  );
};

// utils/constants.js
export const VOICE_LANGUAGES = {
  "fa-IR": "فارسی",
  "en-US": "English",
  "ar-SA": "العربية",
};

export const DEFAULT_SETTINGS = {
  autoAdvance: true,
  autoAdvanceThreshold: 75,
  speakingRate: 0.8,
  confidenceThreshold: 0.7,
  showKeywords: true,
  showNotes: true,
  language: "fa-IR",
  continuousRecording: true,
  audioFeedback: true,
};

export const STORAGE_KEYS = {
  SETTINGS: "voiceAppSettings",
  BOOKMARKS: "scriptBookmarks",
  SCRIPT: "lastImportedScript",
  DARK_MODE: "darkMode",
};
