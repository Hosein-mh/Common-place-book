import React, { createContext, useContext, useState, useCallback } from "react";
import { sampleScriptData } from "../data/sampleScript";

const ScriptContext = createContext();

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error("useScript must be used within ScriptProvider");
  }
  return context;
};

export const ScriptProvider = ({ children }) => {
  const [scriptData, setScriptData] = useState(sampleScriptData);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [matchedWords, setMatchedWords] = useState(new Set());
  const [progress, setProgress] = useState(0);

  const currentSection = scriptData.sections[currentSectionIndex];
  const overallProgress =
    ((currentSectionIndex + 1) / scriptData.sections.length) * 100;

  const goToNextSection = useCallback(() => {
    if (currentSectionIndex < scriptData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      resetCurrentSection();
    }
  }, [currentSectionIndex, scriptData.sections.length]);

  const goToPreviousSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      resetCurrentSection();
    }
  }, [currentSectionIndex]);

  const jumpToSection = useCallback(
    (index) => {
      if (index >= 0 && index < scriptData.sections.length) {
        setCurrentSectionIndex(index);
        resetCurrentSection();
      }
    },
    [scriptData.sections.length]
  );

  const resetCurrentSection = useCallback(() => {
    setMatchedWords(new Set());
    setProgress(0);
  }, []);

  const updateProgress = useCallback((newMatchedWords, newProgress) => {
    setMatchedWords(newMatchedWords);
    setProgress(newProgress);
  }, []);

  const loadScript = useCallback(
    (newScript) => {
      setScriptData(newScript);
      setCurrentSectionIndex(0);
      resetCurrentSection();
    },
    [resetCurrentSection]
  );

  const value = {
    scriptData,
    currentSection,
    currentSectionIndex,
    matchedWords,
    progress,
    overallProgress,
    goToNextSection,
    goToPreviousSection,
    jumpToSection,
    resetCurrentSection,
    updateProgress,
    loadScript,
  };

  return (
    <ScriptContext.Provider value={value}>{children}</ScriptContext.Provider>
  );
};
