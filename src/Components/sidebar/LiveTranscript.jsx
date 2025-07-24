import React, { useEffect, useRef } from "react";
import { Typography, Box, Paper, Chip } from "@mui/material";
import { Hearing, VolumeUp } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";

export const LiveTranscript = ({
  transcript,
  isRecording,
  matchedWords = [],
}) => {
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const highlightTranscript = (text) => {
    if (!text || !matchedWords.length) return text;

    let highlightedText = text;
    matchedWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<mark style="background-color: #4caf50; color: white; padding: 2px 4px; border-radius: 4px;">$&</mark>`
      );
    });

    return highlightedText;
  };

  return (
    <StyledPaper>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Hearing />
        <Typography variant="h6">متن زنده</Typography>
        {isRecording && (
          <Chip
            icon={<VolumeUp />}
            label="فعال"
            size="small"
            color="success"
            sx={{ animation: "pulse 1.5s infinite" }}
          />
        )}
      </Box>

      <Paper
        ref={transcriptRef}
        sx={{
          minHeight: 120,
          maxHeight: 200,
          overflow: "auto",
          p: 2,
          bgcolor: isRecording ? "action.hover" : "background.default",
          border: 1,
          borderColor: isRecording ? "success.main" : "divider",
          borderRadius: 2,
          transition: "all 0.3s ease",
        }}
      >
        {transcript ? (
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{
              __html: highlightTranscript(transcript),
            }}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic", textAlign: "center", mt: 4 }}
          >
            {isRecording
              ? "در انتظار صدای شما..."
              : "برای شروع ضبط، روی دکمه میکرفون کلیک کنید"}
          </Typography>
        )}
      </Paper>

      {matchedWords.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            کلمات تطبیق یافته: {matchedWords.length}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {matchedWords.slice(0, 10).map((word, index) => (
              <Chip
                key={index}
                label={word}
                size="small"
                color="success"
                variant="outlined"
              />
            ))}
            {matchedWords.length > 10 && (
              <Chip
                label={`+${matchedWords.length - 10}`}
                size="small"
                color="success"
                variant="filled"
              />
            )}
          </Box>
        </Box>
      )}
    </StyledPaper>
  );
};
