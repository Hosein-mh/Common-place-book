import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installed");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <Snackbar
      open={showPrompt}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={null}
    >
      <Alert
        severity="info"
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleInstall}
              startIcon={<GetAppIcon />}
            >
              نصب
            </Button>
            <Button color="inherit" size="small" onClick={handleDismiss}>
              <CloseIcon />
            </Button>
          </Box>
        }
      >
        این برنامه را روی دستگاه خود نصب کنید تا راحت‌تر از آن استفاده کنید
      </Alert>
    </Snackbar>
  );
};
