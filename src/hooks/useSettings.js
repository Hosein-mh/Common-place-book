import { useState, useEffect } from "react";
import { StorageService } from "../services/StorageService";

const defaultSettings = {
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

export const useSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = StorageService.loadSettings();
    if (saved) {
      setSettings((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  useEffect(() => {
    StorageService.saveSettings(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
};
