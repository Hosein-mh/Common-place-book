// src/hooks/useSessionStats.js
import { useState, useEffect, useCallback } from "react";
import { StorageService } from "../services/StorageService";

export const useSessionStats = () => {
  const [sessionStats, setSessionStats] = useState({
    totalSections: 0,
    completedSections: 0,
    averageAccuracy: 0,
    bestAccuracy: 0,
    totalWords: 0,
    recognizedWords: 0,
    sessionDuration: 0,
    startTime: new Date(),
    sectionStats: [],
  });

  useEffect(() => {
    const saved = StorageService.loadSessionStats();
    if (saved) {
      // Fix: Ensure startTime is always a Date object
      const processedSaved = {
        ...saved,
        startTime: saved.startTime ? new Date(saved.startTime) : new Date(),
      };
      setSessionStats((prev) => ({ ...prev, ...processedSaved }));
    }
  }, []);

  useEffect(() => {
    StorageService.saveSessionStats(sessionStats);
  }, [sessionStats]);

  const updateStats = useCallback((progress, recognizedWords, totalWords) => {
    setSessionStats((prev) => {
      // Fix: Ensure startTime is a Date object before calling getTime()
      const startTime =
        prev.startTime instanceof Date
          ? prev.startTime
          : new Date(prev.startTime);

      return {
        ...prev,
        averageAccuracy:
          (prev.averageAccuracy * prev.completedSections + progress) /
          (prev.completedSections + 1),
        bestAccuracy: Math.max(prev.bestAccuracy, progress),
        totalWords: prev.totalWords + totalWords,
        recognizedWords: prev.recognizedWords + recognizedWords,
        sessionDuration: Date.now() - startTime.getTime(),
      };
    });
  }, []);

  const completeSection = useCallback(() => {
    setSessionStats((prev) => ({
      ...prev,
      completedSections: prev.completedSections + 1,
    }));
  }, []);

  const resetStats = useCallback(() => {
    setSessionStats({
      totalSections: 0,
      completedSections: 0,
      averageAccuracy: 0,
      bestAccuracy: 0,
      totalWords: 0,
      recognizedWords: 0,
      sessionDuration: 0,
      startTime: new Date(),
      sectionStats: [],
    });
  }, []);

  return {
    sessionStats,
    updateStats,
    completeSection,
    resetStats,
  };
};
