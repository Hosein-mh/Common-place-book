import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { Mic } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";

export const LiveTranscript = ({
  liveTranscript,
  finalTranscript,
  isRecording,
  confidence,
}) => {
  return (
    <StyledPaper>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Mic />
        متن زنده
      </Typography>

      {liveTranscript && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: "action.hover", minHeight: 60 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            در حال تایپ... (اطمینان: {Math.round(confidence * 100)}%)
          </Typography>
          <Typography variant="body1" sx={{ direction: "rtl" }}>
            {liveTranscript}
          </Typography>
        </Paper>
      )}

      {finalTranscript && (
        <Paper
          sx={{
            p: 2,
            bgcolor: "success.light",
            color: "success.contrastText",
            minHeight: 60,
            mb: liveTranscript ? 0 : 2,
          }}
        >
          <Typography variant="body2" gutterBottom>
            متن نهایی:
          </Typography>
          <Typography variant="body1" sx={{ direction: "rtl" }}>
            {finalTranscript}
          </Typography>
        </Paper>
      )}

      {!liveTranscript && !finalTranscript && (
        <Paper sx={{ p: 3, textAlign: "center", bgcolor: "action.hover" }}>
          <Typography variant="body2" color="text.secondary">
            {isRecording ? "منتظر صدای شما..." : "برای شروع ضبط کنید"}
          </Typography>
        </Paper>
      )}
    </StyledPaper>
  );
};
