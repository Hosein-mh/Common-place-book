import { useState, useCallback } from "react";

export const useSessionStats = () => {
  const [sessionStats, setSessionStats] = useState({
    startTime: Date.now(),
    sectionsCompleted: 0,
    accuracyHistory: [],
    bestAccuracy: 0,
    averageAccuracy: 0,
    totalWords: 0,
    recognizedWords: 0,
  });

  const updateStats = useCallback(
    (accuracy, wordsRecognized = 0, totalWords = 0) => {
      setSessionStats((prev) => {
        const newHistory = [...prev.accuracyHistory.slice(-19), accuracy];
        const newAverage =
          newHistory.reduce((a, b) => a + b) / newHistory.length;

        return {
          ...prev,
          accuracyHistory: newHistory,
          bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
          averageAccuracy: newAverage,
          totalWords: prev.totalWords + totalWords,
          recognizedWords: prev.recognizedWords + wordsRecognized,
        };
      });
    },
    []
  );

  const completeSection = useCallback(() => {
    setSessionStats((prev) => ({
      ...prev,
      sectionsCompleted: prev.sectionsCompleted + 1,
    }));
  }, []);

  const resetStats = useCallback(() => {
    setSessionStats({
      startTime: Date.now(),
      sectionsCompleted: 0,
      accuracyHistory: [],
      bestAccuracy: 0,
      averageAccuracy: 0,
      totalWords: 0,
      recognizedWords: 0,
    });
  }, []);

  return {
    sessionStats,
    updateStats,
    completeSection,
    resetStats,
  };
};
