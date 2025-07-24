import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const NotificationSnackbar = ({
  notification,
  showNotification,
  error,
  onHideNotification,
  onHideError,
}) => {
  const { isRTL } = useTheme();

  return (
    <>
      {/* Success Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={onHideNotification}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isRTL ? "left" : "right",
        }}
      >
        <Alert
          onClose={onHideNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notification}
        </Alert>
      </Snackbar>

      {/* Error Notification */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={onHideError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onHideError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
