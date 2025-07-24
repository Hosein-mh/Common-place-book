import React, { useState, useEffect } from "react";
import { Snackbar, Alert, Box } from "@mui/material";
import { WifiOff, Wifi } from "@mui/icons-material";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline Message */}
      <Snackbar
        open={showOfflineMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={null}
      >
        <Alert
          severity="warning"
          icon={<WifiOff />}
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            اتصال به اینترنت قطع شده است
          </Box>
        </Alert>
      </Snackbar>

      {/* Back Online Message */}
      <Snackbar
        open={isOnline && !showOfflineMessage}
        autoHideDuration={3000}
        onClose={() => setIsOnline(true)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" icon={<Wifi />} sx={{ width: "100%" }}>
          اتصال به اینترنت برقرار شد
        </Alert>
      </Snackbar>
    </>
  );
};
