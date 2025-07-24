import { useState, useCallback } from "react";

export const useNotifications = () => {
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState("");

  const showSuccess = useCallback((message) => {
    setNotification(message);
    setShowNotification(true);
  }, []);

  const showError = useCallback((message) => {
    setError(message);
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  const hideError = useCallback(() => {
    setError("");
  }, []);

  return {
    notification,
    showNotification,
    error,
    showSuccess,
    showError,
    hideNotification,
    hideError,
  };
};
