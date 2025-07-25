// src/utils/constants.js - Updated with new settings
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
  // NEW: Enhanced voice settings
  autoResume: true,
  silenceThreshold: 3000, // 3 seconds in milliseconds
  maxResumeAttempts: 3,
  resumeDelay: 1000, // 1 second delay before resume
  sessionPersistence: true,
};

export const STORAGE_KEYS = {
  SETTINGS: "voiceAppSettings",
  BOOKMARKS: "scriptBookmarks",
  SCRIPT: "lastImportedScript",
  DARK_MODE: "darkMode",
  SESSION_STATS: "sessionStats",
  USER_PREFERENCES: "userPreferences",
  // NEW: Session state storage
  SESSION_STATE: "currentSessionState",
  VOICE_PROGRESS: "voiceProgress",
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
  RESUME_RECORDING: "KeyC", // NEW: Resume recording shortcut
};

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  RECORDING_PULSE: 1500,
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
  mysterious: "#673ab7",
  suspenseful: "#ff5722",
  "philosophical-deep": "#3f51b5",
  warning: "#ff9800",
  "challenging-direct": "#f44336",
};

export const ENERGY_LEVELS = {
  low: { intensity: 0.3, color: "#90a4ae" },
  "medium-low": { intensity: 0.4, color: "#78909c" },
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
  PAUSED: "paused", // NEW: Paused state
  PROCESSING: "processing",
  ERROR: "error",
  RESUMING: "resuming", // NEW: Resuming state
};

// NEW: Voice recognition settings
export const VOICE_SETTINGS = {
  MIN_SILENCE_THRESHOLD: 1000, // 1 second
  MAX_SILENCE_THRESHOLD: 10000, // 10 seconds
  DEFAULT_SILENCE_THRESHOLD: 3000, // 3 seconds
  MIN_CONFIDENCE: 0.1,
  MAX_CONFIDENCE: 1.0,
  DEFAULT_CONFIDENCE: 0.7,
  MAX_RESUME_ATTEMPTS: 5,
  RESUME_DELAY_RANGE: [500, 3000], // 0.5 to 3 seconds
};

// NEW: Session management
export const SESSION_CONFIG = {
  AUTO_SAVE_INTERVAL: 5000, // 5 seconds
  MAX_SESSION_DURATION: 3600000, // 1 hour in milliseconds
  PROGRESS_SAVE_THRESHOLD: 5, // Save when progress increases by 5%
  SESSION_TIMEOUT: 1800000, // 30 minutes of inactivity
};

// NEW: Audio processing
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 44100,
  ECHO_CANCELLATION: true,
  NOISE_SUPPRESSION: true,
  AUTO_GAIN_CONTROL: true,
  VISUALIZATION_UPDATE_RATE: 60, // FPS for audio visualization
};

// NEW: Error messages in Persian
export const ERROR_MESSAGES = {
  MICROPHONE_DENIED:
    "دسترسی به میکروفون رد شد. لطفاً در تنظیمات مرورگر اجازه دهید.",
  SPEECH_NOT_SUPPORTED: "مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند.",
  NETWORK_ERROR: "خطا در اتصال شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.",
  AUDIO_CONTEXT_ERROR: "خطا در راه‌اندازی سیستم صوتی.",
  SESSION_EXPIRED: "جلسه منقضی شده است. لطفاً دوباره شروع کنید.",
  RESUME_FAILED: "خطا در ادامه ضبط. تلاش مجدد...",
};

// NEW: Success messages in Persian
export const SUCCESS_MESSAGES = {
  RECORDING_STARTED: "ضبط با موفقیت شروع شد",
  RECORDING_RESUMED: "ضبط از نقطه قبلی ادامه یافت",
  PROGRESS_SAVED: "پیشرفت ذخیره شد",
  SECTION_COMPLETED: "بخش با موفقیت تکمیل شد",
  SETTINGS_SAVED: "تنظیمات ذخیره شد",
};

export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  MAX_TRANSCRIPT_LENGTH: 1000,
  CLEANUP_INTERVAL: 30000, // 30 seconds
};
