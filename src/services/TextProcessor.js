// src/services/TextProcessor.js - Enhanced with session state handling
export class TextProcessor {
  static processRecognizedText(
    recognizedText,
    targetText,
    keywords = [],
    confidenceThreshold = 0.7,
    sessionState = null
  ) {
    if (!recognizedText || !targetText) {
      return {
        progress: 0,
        matchedWords: [],
        recognizedWords: 0,
        totalWords: 0,
        confidence: 0,
        sessionAdjusted: false,
      };
    }

    // Clean and prepare texts
    const cleanRecognized = this.cleanPersianText(recognizedText);
    const cleanTarget = this.cleanPersianText(targetText);
    const cleanKeywords = keywords.map((k) => this.cleanPersianText(k));

    // Tokenize words
    const recognizedWords = this.tokenizeWords(cleanRecognized);
    const targetWords = this.tokenizeWords(cleanTarget);

    // Find matches
    const matchResult = this.findMatches(
      recognizedWords,
      targetWords,
      cleanKeywords
    );

    // Calculate base progress
    const baseProgress = this.calculateProgress(
      matchResult.exactMatches,
      matchResult.keywordMatches,
      targetWords.length,
      cleanKeywords.length
    );

    // Apply session state adjustments if resuming
    let finalProgress = baseProgress;
    let sessionAdjusted = false;

    if (
      sessionState &&
      sessionState.isResuming &&
      sessionState.sectionProgress > 0
    ) {
      // Ensure progress doesn't go backwards when resuming
      finalProgress = Math.max(baseProgress, sessionState.sectionProgress);
      sessionAdjusted = finalProgress > baseProgress;

      console.log(
        `TextProcessor: Session adjustment applied. Base: ${baseProgress}%, Final: ${finalProgress}%`
      );
    }

    return {
      progress: Math.min(finalProgress, 100),
      matchedWords: [
        ...matchResult.exactMatches,
        ...matchResult.keywordMatches,
      ],
      recognizedWords: recognizedWords.length,
      totalWords: targetWords.length,
      confidence: matchResult.confidence,
      sessionAdjusted,
      // Additional metadata
      exactMatchCount: matchResult.exactMatches.length,
      keywordMatchCount: matchResult.keywordMatches.length,
      matchRatio:
        matchResult.exactMatches.length / Math.max(targetWords.length, 1),
      keywordCoverage:
        matchResult.keywordMatches.length / Math.max(cleanKeywords.length, 1),
    };
  }

  static cleanPersianText(text) {
    if (!text) return "";

    return (
      text
        // Remove extra whitespace
        .trim()
        .replace(/\s+/g, " ")
        // Remove punctuation but keep Persian characters
        .replace(
          /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
          ""
        )
        // Normalize Persian characters
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/ء/g, "")
        .toLowerCase()
    );
  }

  static tokenizeWords(text) {
    if (!text) return [];

    return text
      .split(/\s+/)
      .filter((word) => word.length > 1) // Filter out single characters
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
  }

  static findMatches(recognizedWords, targetWords, keywords = []) {
    const exactMatches = new Set();
    const keywordMatches = new Set();
    let totalConfidence = 0;
    let matchCount = 0;

    // Find exact word matches
    recognizedWords.forEach((word) => {
      if (targetWords.includes(word)) {
        exactMatches.add(word);
        totalConfidence += 1.0;
        matchCount++;
      }
    });

    // Find keyword matches (higher weight)
    recognizedWords.forEach((word) => {
      if (keywords.includes(word)) {
        keywordMatches.add(word);
        totalConfidence += 1.5; // Keywords have higher weight
        matchCount++;
      }
    });

    // Find partial matches (fuzzy matching for Persian)
    recognizedWords.forEach((recognizedWord) => {
      targetWords.forEach((targetWord) => {
        if (this.calculateSimilarity(recognizedWord, targetWord) > 0.8) {
          exactMatches.add(targetWord);
          totalConfidence += 0.8;
          matchCount++;
        }
      });
    });

    const averageConfidence = matchCount > 0 ? totalConfidence / matchCount : 0;

    return {
      exactMatches: Array.from(exactMatches),
      keywordMatches: Array.from(keywordMatches),
      confidence: Math.min(averageConfidence, 1.0),
    };
  }

  static calculateProgress(
    exactMatches,
    keywordMatches,
    totalWords,
    totalKeywords
  ) {
    if (totalWords === 0) return 0;

    // Weight calculation
    const exactMatchWeight = 0.6;
    const keywordWeight = 0.4;

    // Calculate scores
    const exactScore =
      (exactMatches.length / Math.max(totalWords, 1)) * exactMatchWeight;
    const keywordScore =
      totalKeywords > 0
        ? (keywordMatches.length / totalKeywords) * keywordWeight
        : 0;

    const totalProgress = (exactScore + keywordScore) * 100;

    // Apply bonus for keyword completion
    const keywordBonus =
      totalKeywords > 0 && keywordMatches.length === totalKeywords ? 10 : 0;

    return Math.min(totalProgress + keywordBonus, 100);
  }

  static calculateSimilarity(word1, word2) {
    if (!word1 || !word2) return 0;
    if (word1 === word2) return 1;

    // Levenshtein distance for Persian text
    const matrix = Array(word2.length + 1)
      .fill(null)
      .map(() => Array(word1.length + 1).fill(null));

    for (let i = 0; i <= word1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= word2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= word2.length; j++) {
      for (let i = 1; i <= word1.length; i++) {
        const indicator = word1[i - 1] === word2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    const distance = matrix[word2.length][word1.length];
    const maxLength = Math.max(word1.length, word2.length);

    return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
  }

  // NEW: Session state management
  static mergeSessionProgress(currentProgress, sessionState) {
    if (!sessionState || !sessionState.isResuming) {
      return currentProgress;
    }

    const { sectionProgress, lastPosition } = sessionState;

    // Use the higher of current progress or saved progress
    const mergedProgress = Math.max(currentProgress, sectionProgress);

    console.log(
      `Merging progress: Current ${currentProgress}%, Session ${sectionProgress}%, Final ${mergedProgress}%`
    );

    return {
      progress: mergedProgress,
      wasAdjusted: mergedProgress > currentProgress,
      adjustmentAmount: mergedProgress - currentProgress,
    };
  }

  // NEW: Advanced matching with context
  static processWithContext(
    recognizedText,
    targetText,
    keywords,
    context = {}
  ) {
    const baseResult = this.processRecognizedText(
      recognizedText,
      targetText,
      keywords
    );

    // Apply contextual adjustments
    if (context.previousMatches) {
      // Boost confidence if continuing from previous matches
      baseResult.confidence *= 1.1;
    }

    if (context.timeInSection > 30000) {
      // 30 seconds
      // Slight progress boost for longer engagement
      baseResult.progress = Math.min(baseResult.progress * 1.05, 100);
    }

    return baseResult;
  }

  // NEW: Real-time progress tracking
  static trackProgressOverTime(progressHistory, currentProgress) {
    const now = Date.now();

    // Add current progress to history
    progressHistory.push({
      progress: currentProgress,
      timestamp: now,
    });

    // Keep only last 10 entries
    if (progressHistory.length > 10) {
      progressHistory.shift();
    }

    // Calculate velocity (progress per second)
    if (progressHistory.length >= 2) {
      const latest = progressHistory[progressHistory.length - 1];
      const previous = progressHistory[progressHistory.length - 2];
      const timeDiff = (latest.timestamp - previous.timestamp) / 1000; // seconds
      const progressDiff = latest.progress - previous.progress;

      return {
        velocity: timeDiff > 0 ? progressDiff / timeDiff : 0,
        trend:
          progressDiff > 0
            ? "increasing"
            : progressDiff < 0
              ? "decreasing"
              : "stable",
      };
    }

    return { velocity: 0, trend: "stable" };
  }

  // NEW: Quality assessment
  static assessQuality(matchResult, targetLength, timeSpent) {
    const matchRatio = matchResult.matchedWords.length / targetLength;
    const timeEfficiency = targetLength / (timeSpent / 1000); // words per second

    let quality = "poor";
    if (matchRatio > 0.8 && timeEfficiency > 0.5) quality = "excellent";
    else if (matchRatio > 0.6 && timeEfficiency > 0.3) quality = "good";
    else if (matchRatio > 0.4) quality = "fair";

    return {
      quality,
      matchRatio,
      timeEfficiency,
      suggestions: this.generateSuggestions(matchRatio, timeEfficiency),
    };
  }

  static generateSuggestions(matchRatio, timeEfficiency) {
    const suggestions = [];

    if (matchRatio < 0.5) {
      suggestions.push("سعی کنید کلمات کلیدی را واضح‌تر تلفظ کنید");
    }

    if (timeEfficiency < 0.2) {
      suggestions.push("می‌توانید سرعت خواندن خود را افزایش دهید");
    }

    if (matchRatio > 0.8 && timeEfficiency > 0.5) {
      suggestions.push("عملکرد عالی! به همین روال ادامه دهید");
    }

    return suggestions;
  }
}
