import { useState, useCallback } from "react";

export const useNotifications = () => {
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState("");

  const showSuccess = useCallback((message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  }, []);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 6000);
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
    setNotification("");
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
