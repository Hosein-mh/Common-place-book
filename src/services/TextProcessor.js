export class TextProcessor {
  static processRecognizedText(
    recognizedText,
    targetText,
    keywords = [],
    confidenceThreshold = 0.7
  ) {
    if (!recognizedText || !targetText) {
      return {
        matchedWords: [],
        progress: 0,
        recognizedWords: 0,
        totalWords: 0,
      };
    }

    // Normalize text for comparison
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .replace(/[۰-۹]/g, (d) => "٠١٢٣٤٥٦٧٨٩"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
        .replace(
          /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
          " "
        )
        .replace(/\s+/g, " ")
        .trim();
    };

    const normalizedRecognized = normalizeText(recognizedText);
    const normalizedTarget = normalizeText(targetText);

    const recognizedWords = normalizedRecognized
      .split(" ")
      .filter((w) => w.length > 1);
    const targetWords = normalizedTarget.split(" ").filter((w) => w.length > 1);
    const normalizedKeywords = keywords.map(normalizeText);

    // Find matched words
    const matchedWords = [];
    recognizedWords.forEach((word) => {
      if (targetWords.includes(word) || normalizedKeywords.includes(word)) {
        matchedWords.push(word);
      }
    });

    // Calculate progress
    const uniqueMatches = [...new Set(matchedWords)];
    const uniqueTargetWords = [...new Set(targetWords)];
    const progress =
      uniqueTargetWords.length > 0
        ? Math.min((uniqueMatches.length / uniqueTargetWords.length) * 100, 100)
        : 0;

    return {
      matchedWords: uniqueMatches,
      progress: Math.round(progress),
      recognizedWords: recognizedWords.length,
      totalWords: targetWords.length,
      keywordMatches: uniqueMatches.filter((word) =>
        normalizedKeywords.includes(word)
      ),
      accuracy:
        recognizedWords.length > 0
          ? (uniqueMatches.length / recognizedWords.length) * 100
          : 0,
    };
  }

  static highlightText(text, matchedWords = [], keywords = []) {
    if (!text) return text;

    let highlightedText = text;

    // Highlight matched words
    matchedWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="matched">$&</mark>`
      );
    });

    // Highlight keywords that aren't already matched
    keywords.forEach((keyword) => {
      if (!matchedWords.includes(keyword.toLowerCase())) {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        highlightedText = highlightedText.replace(
          regex,
          `<mark class="keyword">$&</mark>`
        );
      }
    });

    return highlightedText;
  }

  static calculateReadingTime(text, wordsPerMinute = 150) {
    if (!text) return 0;
    const wordCount = text.split(" ").filter((word) => word.length > 0).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  static generateTextStatistics(text) {
    if (!text) return {};

    const words = text.split(" ").filter((word) => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

    return {
      wordCount: words.length,
      characterCount: text.length,
      characterCountNoSpaces: text.replace(/\s/g, "").length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      averageWordsPerSentence:
        sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
      readingTime: this.calculateReadingTime(text),
    };
  }
}
