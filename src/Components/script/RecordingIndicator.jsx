import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Mic, MicOff, RadioButtonChecked } from "@mui/icons-material";
import { RecordingIndicator as StyledRecordingIndicator } from "../common/StyledComponents";

export const RecordingIndicator = ({ isRecording, transcript }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <StyledRecordingIndicator recording={isRecording}>
        {isRecording ? <RadioButtonChecked /> : <MicOff />}
        <Typography variant="body2" fontWeight="bold">
          {isRecording ? "در حال ضبط..." : "ضبط متوقف"}
        </Typography>
      </StyledRecordingIndicator>

      {transcript && (
        <Box
          sx={{
            mt: 1,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            متن شناسایی شده:
          </Typography>
          <Typography variant="body1">{transcript}</Typography>
        </Box>
      )}
    </Box>
  );
};
