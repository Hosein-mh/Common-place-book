import React from "react";
import { Box, Typography } from "@mui/material";
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  GraphicEq,
} from "@mui/icons-material";
import { RecordingIndicator as StyledRecordingIndicator } from "../common/StyledComponents";

export const RecordingIndicator = ({ isRecording, audioLevel }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <StyledRecordingIndicator recording={isRecording}>
        {isRecording ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {isRecording ? "در حال ضبط..." : "آماده برای ضبط"}
        </Typography>
        {isRecording && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GraphicEq />
            <Box
              sx={{
                width: 40,
                height: 4,
                bgcolor: "currentColor",
                borderRadius: 2,
                opacity: 0.7,
              }}
            >
              <Box
                sx={{
                  width: `${(audioLevel / 255) * 100}%`,
                  height: "100%",
                  bgcolor: "white",
                  borderRadius: 2,
                  transition: "width 0.1s ease",
                }}
              />
            </Box>
          </Box>
        )}
      </StyledRecordingIndicator>
    </Box>
  );
};
