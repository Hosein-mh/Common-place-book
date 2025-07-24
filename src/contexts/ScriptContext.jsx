// src/contexts/ScriptContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { StorageService } from "../services/StorageService";

const ScriptContext = createContext();

// Default script data if no script is loaded
const defaultScriptData = {
  scriptInfo: {
    title: "اسکریپت پیش‌فرض",
    description: "یک اسکریپت تستی برای شروع",
    totalSections: 3,
    estimatedDuration: "10 دقیقه",
    level: "مبتدی",
    language: "fa-IR",
  },
  sections: [
    {
      id: 1,
      title: "معرفی",
      timeRange: "0:00-2:00",
      duration: 120,
      topic: "آشنایی اولیه",
      text: "سلام و خوش آمدید به این جلسه تمرینی. امروز قرار است با هم یاد بگیریم که چطور از این سیستم استفاده کنیم.",
      notes: "با آرامش و اعتماد به نفس شروع کنید",
      keywords: [
        "سلام",
        "خوش آمدید",
        "جلسه",
        "تمرینی",
        "یاد بگیریم",
        "سیستم",
        "استفاده",
      ],
      emotion: "welcoming",
      energy: "medium",
    },
    {
      id: 2,
      title: "توضیحات اصلی",
      timeRange: "2:00-6:00",
      duration: 240,
      topic: "محتوای اصلی",
      text: "این سیستم به شما کمک می‌کند تا مهارت‌های ارائه و سخنرانی خود را بهبود دهید. با تمرین مداوم، اعتماد به نفس شما افزایش خواهد یافت.",
      notes: "تأکید روی کلمات کلیدی",
      keywords: [
        "سیستم",
        "کمک",
        "مهارت‌های",
        "ارائه",
        "سخنرانی",
        "بهبود",
        "تمرین",
        "مداوم",
        "اعتماد",
        "افزایش",
      ],
      emotion: "encouraging",
      energy: "medium-high",
    },
    {
      id: 3,
      title: "جمع‌بندی",
      timeRange: "6:00-8:00",
      duration: 120,
      topic: "نتیجه‌گیری",
      text: "امیدوارم این جلسه برای شما مفید بوده باشد. با تمرین بیشتر، به اهداف خود خواهید رسید. موفق باشید!",
      notes: "پایان مثبت و انگیزه‌بخش",
      keywords: ["امیدوارم", "جلسه", "مفید", "تمرین", "بیشتر", "اهداف", "موفق"],
      emotion: "concluding",
      energy: "medium",
    },
  ],
};

// Reducer for script state management
const scriptReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_SCRIPT":
      return {
        ...state,
        scriptData: action.payload,
        currentSectionIndex: 0,
        currentSection: action.payload.sections[0],
        progress: 0,
        matchedWords: new Set(),
      };

    case "JUMP_TO_SECTION":
      const newIndex = action.payload;
      return {
        ...state,
        currentSectionIndex: newIndex,
        currentSection: state.scriptData.sections[newIndex],
        progress: 0,
        matchedWords: new Set(),
      };

    case "NEXT_SECTION":
      const nextIndex = Math.min(
        state.currentSectionIndex + 1,
        state.scriptData.sections.length - 1
      );
      return {
        ...state,
        currentSectionIndex: nextIndex,
        currentSection: state.scriptData.sections[nextIndex],
        progress: 0,
        matchedWords: new Set(),
      };

    case "PREVIOUS_SECTION":
      const prevIndex = Math.max(state.currentSectionIndex - 1, 0);
      return {
        ...state,
        currentSectionIndex: prevIndex,
        currentSection: state.scriptData.sections[prevIndex],
        progress: 0,
        matchedWords: new Set(),
      };

    case "UPDATE_PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
        matchedWords: new Set(action.payload.matchedWords),
      };

    case "RESET_CURRENT_SECTION":
      return {
        ...state,
        progress: 0,
        matchedWords: new Set(),
      };

    default:
      return state;
  }
};

const initialState = {
  scriptData: defaultScriptData,
  currentSectionIndex: 0,
  currentSection: defaultScriptData.sections[0],
  progress: 0,
  matchedWords: new Set(),
};

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error("useScript must be used within a ScriptProvider");
  }
  return context;
};

export const ScriptProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scriptReducer, initialState);

  // Load saved script on mount
  useEffect(() => {
    const savedScript = StorageService.loadScript();
    if (savedScript) {
      dispatch({ type: "LOAD_SCRIPT", payload: savedScript });
    }
  }, []);

  // Save script when it changes
  useEffect(() => {
    if (state.scriptData && state.scriptData !== defaultScriptData) {
      StorageService.saveScript(state.scriptData);
    }
  }, [state.scriptData]);

  const loadScript = (scriptData) => {
    dispatch({ type: "LOAD_SCRIPT", payload: scriptData });
  };

  const jumpToSection = (index) => {
    if (index >= 0 && index < state.scriptData.sections.length) {
      dispatch({ type: "JUMP_TO_SECTION", payload: index });
    }
  };

  const goToNextSection = () => {
    dispatch({ type: "NEXT_SECTION" });
  };

  const goToPreviousSection = () => {
    dispatch({ type: "PREVIOUS_SECTION" });
  };

  const updateProgress = (matchedWords, progress) => {
    dispatch({
      type: "UPDATE_PROGRESS",
      payload: { matchedWords, progress },
    });
  };

  const resetCurrentSection = () => {
    dispatch({ type: "RESET_CURRENT_SECTION" });
  };

  const value = {
    ...state,
    loadScript,
    jumpToSection,
    goToNextSection,
    goToPreviousSection,
    updateProgress,
    resetCurrentSection,
  };

  return (
    <ScriptContext.Provider value={value}>{children}</ScriptContext.Provider>
  );
};
