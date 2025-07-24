export class TextProcessor {
  static cleanText(text) {
    if (!text) return "";

    return text
      .toLowerCase()
      .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
      .replace(
        /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();
  }

  static calculateSimilarity(word1, word2) {
    if (!word1 || !word2) return 0;
    if (word1 === word2) return 1;

    // Phonetic similarity for Persian
    const phoneticMap = {
      ض: "ظ",
      ص: "س",
      ت: "ط",
      ز: "ذ",
      ز: "ض",
    };

    let mapped1 = word1;
    let mapped2 = word2;

    Object.entries(phoneticMap).forEach(([key, value]) => {
      mapped1 = mapped1.replace(new RegExp(key, "g"), value);
      mapped2 = mapped2.replace(new RegExp(key, "g"), value);
    });

    if (mapped1 === mapped2) return 0.95;

    // Substring matching
    const longer = word1.length > word2.length ? word1 : word2;
    const shorter = word1.length > word2.length ? word2 : word1;

    if (longer.includes(shorter) && shorter.length > 2) {
      return (shorter.length / longer.length) * 0.9;
    }

    // Levenshtein distance
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    return Math.max(0, 1 - distance / maxLength);
  }

  static levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1)
      .fill()
      .map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  static processRecognizedText(
    recognizedText,
    scriptText,
    keywords,
    confidenceThreshold
  ) {
    const recognizedWords = this.cleanText(recognizedText)
      .split(" ")
      .filter((w) => w.length > 1);
    const scriptWords = this.cleanText(scriptText)
      .split(" ")
      .filter((w) => w.length > 1);

    const matchedWords = new Set();

    recognizedWords.forEach((recognizedWord) => {
      scriptWords.forEach((scriptWord, index) => {
        const similarity = this.calculateSimilarity(recognizedWord, scriptWord);
        if (similarity > confidenceThreshold) {
          matchedWords.add(index);
        }
      });

      // Bonus matching for keywords
      if (keywords) {
        keywords.forEach((keyword) => {
          const keywordClean = this.cleanText(keyword);
          if (
            this.calculateSimilarity(recognizedWord, keywordClean) >
            confidenceThreshold * 0.9
          ) {
            scriptWords.forEach((word, index) => {
              if (this.calculateSimilarity(word, keywordClean) > 0.8) {
                matchedWords.add(index);
              }
            });
          }
        });
      }
    });

    return {
      matchedWords,
      progress: (matchedWords.size / scriptWords.length) * 100,
      totalWords: scriptWords.length,
      recognizedWords: recognizedWords.length,
    };
  }
}
