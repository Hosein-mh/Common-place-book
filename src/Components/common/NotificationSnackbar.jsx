// src/components/common/NotificationSnackbar.jsx
import React from "react";
import { Snackbar, Alert, AlertTitle, Slide } from "@mui/material";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

export const NotificationSnackbar = ({
  notification,
  showNotification,
  error,
  onHideNotification,
  onHideError,
}) => {
  return (
    <>
      {/* Success/Info Notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={onHideNotification}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={onHideNotification}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification}
        </Alert>
      </Snackbar>

      {/* Error Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={onHideError}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={onHideError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <AlertTitle>خطا</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
