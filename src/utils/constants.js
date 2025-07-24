export const VOICE_LANGUAGES = {
  "fa-IR": "فارسی",
  "en-US": "English",
  "ar-SA": "العربية",
  "tr-TR": "Türkçe",
  "ur-PK": "اردو",
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
  focusMode: false,
  autoSave: true,
  keyboardShortcuts: true,
};

export const STORAGE_KEYS = {
  SETTINGS: "voiceAppSettings",
  BOOKMARKS: "scriptBookmarks",
  SCRIPT: "lastImportedScript",
  DARK_MODE: "darkMode",
  SESSION_STATS: "sessionStats",
  USER_PREFERENCES: "userPreferences",
};

export const KEYBOARD_SHORTCUTS = {
  START_RECORDING: "Space",
  STOP_RECORDING: "Space",
  NEXT_SECTION: "ArrowRight",
  PREVIOUS_SECTION: "ArrowLeft",
  TOGGLE_SETTINGS: "KeyS",
  TOGGLE_STATS: "KeyT",
  TOGGLE_FOCUS_MODE: "KeyF",
  RESET_SECTION: "KeyR",
};

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};

export const EMOTION_COLORS = {
  welcoming: "#4caf50",
  encouraging: "#2196f3",
  "wise-concluding": "#9c27b0",
  neutral: "#757575",
  excited: "#ff9800",
  calm: "#00bcd4",
  serious: "#795548",
};

export const ENERGY_LEVELS = {
  low: { intensity: 0.3, color: "#90a4ae" },
  medium: { intensity: 0.6, color: "#42a5f5" },
  "medium-high": { intensity: 0.8, color: "#66bb6a" },
  high: { intensity: 1.0, color: "#ef5350" },
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const RECORDING_STATES = {
  IDLE: "idle",
  RECORDING: "recording",
  PROCESSING: "processing",
  ERROR: "error",
};
