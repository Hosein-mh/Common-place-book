export class StorageService {
  static saveSettings(settings) {
    try {
      localStorage.setItem("voiceAppSettings", JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    }
  }

  static loadSettings() {
    try {
      const saved = localStorage.getItem("voiceAppSettings");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load settings:", error);
      return null;
    }
  }

  static saveBookmarks(bookmarks) {
    try {
      localStorage.setItem(
        "scriptBookmarks",
        JSON.stringify(Array.from(bookmarks))
      );
      return true;
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
      return false;
    }
  }

  static loadBookmarks() {
    try {
      const saved = localStorage.getItem("scriptBookmarks");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
      return new Set();
    }
  }

  static saveScript(script) {
    try {
      localStorage.setItem("lastImportedScript", JSON.stringify(script));
      return true;
    } catch (error) {
      console.error("Failed to save script:", error);
      return false;
    }
  }

  static loadScript() {
    try {
      const saved = localStorage.getItem("lastImportedScript");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load script:", error);
      return null;
    }
  }

  static exportSessionData(data) {
    try {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `voice-script-session-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      link.click();

      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error("Failed to export data:", error);
      return false;
    }
  }
}
