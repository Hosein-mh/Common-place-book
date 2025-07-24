import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { RecordVoiceOver, Timeline, Speed } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";
import { useScript } from "../../contexts/ScriptContext";

export const ScriptHeader = () => {
  const { scriptData } = useScript();

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {scriptData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {scriptData.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Chip
            icon={<RecordVoiceOver />}
            label={`نویسنده: ${scriptData.author}`}
            variant="outlined"
          />
          <Chip
            icon={<Timeline />}
            label={`مدت: ${scriptData.duration}`}
            variant="outlined"
          />
          <Chip
            icon={<Speed />}
            label={`زبان: ${scriptData.language}`}
            variant="outlined"
          />
        </Box>
      </Box>
    </StyledPaper>
  );
};
