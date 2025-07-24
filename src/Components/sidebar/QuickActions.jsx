import React, { useRef } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Upload, Download, Refresh } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";
import { useScript } from "../../contexts/ScriptContext";
import { useSessionStats } from "../../hooks/useSessionStats";
import { StorageService } from "../../services/StorageService";

export const QuickActions = ({ onNotification, onError }) => {
  const { loadScript, jumpToSection, resetCurrentSection } = useScript();
  const { resetStats, sessionStats } = useSessionStats();
  const fileInputRef = useRef(null);

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json") {
      onError("لطفاً یک فایل JSON معتبر انتخاب کنید.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.sections || !Array.isArray(data.sections)) {
          throw new Error("ساختار فایل نامعتبر است");
        }

        loadScript(data);
        onNotification("فایل با موفقیت بارگذاری شد");
      } catch (error) {
        onError("خطا در خواندن فایل: " + error.message);
      }
    };
    reader.onerror = () => onError("خطا در خواندن فایل");
    reader.readAsText(file);
  };

  const handleExport = () => {
    const success = StorageService.exportSessionData({
      sessionStats,
      exportDate: new Date().toISOString(),
    });

    if (success) {
      onNotification("داده‌ها با موفقیت دانلود شد");
    } else {
      onError("خطا در دانلود داده‌ها");
    }
  };

  const handleReset = () => {
    jumpToSection(0);
    resetCurrentSection();
    resetStats();
    onNotification("سیستم بازنشانی شد");
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        ⚡ عملیات سریع
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          startIcon={<Upload />}
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          fullWidth
        >
          بارگذاری اسکریپت
        </Button>
        <Button
          startIcon={<Download />}
          variant="outlined"
          onClick={handleExport}
          fullWidth
        >
          دانلود جلسه
        </Button>
        <Button
          startIcon={<Refresh />}
          variant="outlined"
          onClick={handleReset}
          fullWidth
        >
          شروع مجدد
        </Button>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileImport}
      />
    </StyledPaper>
  );
};
