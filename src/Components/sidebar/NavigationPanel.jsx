import React from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { NavigateBefore, NavigateNext, Bookmark } from "@mui/icons-material";
import { StyledPaper } from "../common/StyledComponents";
import { useScript } from "../../contexts/ScriptContext";
import { useBookmarks } from "../../hooks/useBookmarks";

export const NavigationPanel = () => {
  const {
    scriptData,
    currentSectionIndex,
    goToNextSection,
    goToPreviousSection,
    jumpToSection,
  } = useScript();
  const { bookmarks } = useBookmarks();

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        🧭 ناوبری
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          startIcon={<NavigateBefore />}
          onClick={goToPreviousSection}
          disabled={currentSectionIndex === 0}
          variant="outlined"
          size="small"
          fullWidth
        >
          قبلی
        </Button>
        <Button
          endIcon={<NavigateNext />}
          onClick={goToNextSection}
          disabled={currentSectionIndex === scriptData.sections.length - 1}
          variant="outlined"
          size="small"
          fullWidth
        >
          بعدی
        </Button>
      </Box>

      <FormControl fullWidth size="small">
        <InputLabel>انتخاب بخش</InputLabel>
        <Select
          value={currentSectionIndex}
          label="انتخاب بخش"
          onChange={(e) => jumpToSection(e.target.value)}
        >
          {scriptData.sections.map((section, index) => (
            <MenuItem key={section.id} value={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                {bookmarks.has(index) && (
                  <Bookmark fontSize="small" color="warning" />
                )}
                <Typography variant="body2">
                  {index + 1}. {section.title}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {bookmarks.size > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            📑 نشان‌شده‌ها:
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {Array.from(bookmarks).map((index) => (
              <Chip
                key={index}
                label={index + 1}
                size="small"
                color="warning"
                onClick={() => jumpToSection(index)}
                clickable
              />
            ))}
          </Box>
        </Box>
      )}
    </StyledPaper>
  );
};
