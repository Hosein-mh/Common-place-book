export class StorageService {
  static KEYS = {
    SETTINGS: "voiceAppSettings",
    BOOKMARKS: "scriptBookmarks",
    SCRIPT: "lastImportedScript",
    SESSION_STATS: "sessionStats",
    DARK_MODE: "darkMode",
  };

  // Settings
  static saveSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  }

  static loadSettings() {
    try {
      const saved = localStorage.getItem(this.KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading settings:", error);
      return null;
    }
  }

  // Bookmarks
  static saveBookmarks(bookmarks) {
    try {
      const bookmarksArray = Array.from(bookmarks);
      localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(bookmarksArray));
      return true;
    } catch (error) {
      console.error("Error saving bookmarks:", error);
      return false;
    }
  }

  static loadBookmarks() {
    try {
      const saved = localStorage.getItem(this.KEYS.BOOKMARKS);
      const bookmarksArray = saved ? JSON.parse(saved) : [];
      return new Set(bookmarksArray);
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      return new Set();
    }
  }

  // Script
  static saveScript(script) {
    try {
      localStorage.setItem(this.KEYS.SCRIPT, JSON.stringify(script));
      return true;
    } catch (error) {
      console.error("Error saving script:", error);
      return false;
    }
  }

  static loadScript() {
    try {
      const saved = localStorage.getItem(this.KEYS.SCRIPT);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading script:", error);
      return null;
    }
  }

  // Session Stats
  static saveSessionStats(stats) {
    try {
      localStorage.setItem(this.KEYS.SESSION_STATS, JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error("Error saving session stats:", error);
      return false;
    }
  }

  static loadSessionStats() {
    try {
      const saved = localStorage.getItem(this.KEYS.SESSION_STATS);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading session stats:", error);
      return null;
    }
  }

  // Export session data
  static exportSessionData(data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `session-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error exporting session data:", error);
      return false;
    }
  }

  // Clear all data
  static clearAllData() {
    try {
      Object.values(this.KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  }
}
