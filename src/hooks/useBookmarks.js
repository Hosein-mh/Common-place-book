import { useState, useEffect, useCallback } from "react";
import { StorageService } from "../services/StorageService";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(new Set());

  useEffect(() => {
    const saved = StorageService.loadBookmarks();
    setBookmarks(saved);
  }, []);

  useEffect(() => {
    StorageService.saveBookmarks(bookmarks);
  }, [bookmarks]);

  const toggleBookmark = useCallback((index) => {
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(index)) {
        newBookmarks.delete(index);
      } else {
        newBookmarks.add(index);
      }
      return newBookmarks;
    });
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks(new Set());
  }, []);

  return {
    bookmarks,
    toggleBookmark,
    clearBookmarks,
  };
};
