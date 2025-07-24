import React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import { VolumeUp, Bookmark, BookmarkBorder } from "@mui/icons-material";
import { StyledPaper, HighlightedText } from "../common/StyledComponents";
import { useScript } from "../../contexts/ScriptContext";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useSettings } from "../../hooks/useSettings";

export const ScriptContent = ({ onSpeakSection, finalTranscript }) => {
  const { currentSection, currentSectionIndex, matchedWords } = useScript();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { settings } = useSettings();

  if (!currentSection) return null;

  const scriptWords = currentSection.text
    .toLowerCase()
    .replace(
      /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
      ""
    )
    .split(" ")
    .filter((w) => w.length > 0);

  return (
    <StyledPaper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            بخش {currentSectionIndex + 1}: {currentSection.title}
            {bookmarks.has(currentSectionIndex) && <Bookmark color="warning" />}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Chip size="small" label={currentSection.timeRange} />
            <Chip size="small" label={`${currentSection.duration}s`} />
            <Chip size="small" label={currentSection.emotion} color="primary" />
            <Chip
              size="small"
              label={`انرژی: ${currentSection.energy}`}
              color="secondary"
            />
            {currentSection.difficulty && (
              <Chip
                size="small"
                label={`سختی: ${currentSection.difficulty}/5`}
                color="warning"
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="پخش صوتی">
            <IconButton onClick={onSpeakSection} color="primary">
              <VolumeUp />
            </IconButton>
          </Tooltip>
          <Tooltip title="نشان‌گذاری">
            <IconButton
              onClick={() => toggleBookmark(currentSectionIndex)}
              color={bookmarks.has(currentSectionIndex) ? "warning" : "default"}
            >
              {bookmarks.has(currentSectionIndex) ? (
                <Bookmark />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Script Text */}
      <Paper sx={{ p: 3, bgcolor: "background.default", borderRadius: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            lineHeight: 2,
            fontSize: "1.1rem",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {scriptWords.map((word, index) => {
            const isMatched = matchedWords.has(index);
            const isKeyword = currentSection.keywords?.some(
              (kw) =>
                word.includes(kw.toLowerCase()) ||
                kw.toLowerCase().includes(word)
            );

            return (
              <HighlightedText
                key={index}
                matched={isMatched}
                isKeyword={isKeyword && settings.showKeywords}
              >
                {word}
              </HighlightedText>
            );
          })}
        </Typography>
      </Paper>

      {/* Keywords */}
      {settings.showKeywords && currentSection.keywords && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            🔑 کلمات کلیدی:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {currentSection.keywords.map((keyword, index) => {
              const isSpoken = finalTranscript
                .toLowerCase()
                .includes(keyword.toLowerCase());
              return (
                <Chip
                  key={index}
                  label={keyword}
                  variant={isSpoken ? "filled" : "outlined"}
                  color={isSpoken ? "success" : "default"}
                  size="small"
                  icon={isSpoken ? <span>✓</span> : undefined}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {/* Notes */}
      {settings.showNotes && currentSection.notes && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            🎬 نکات کارگردانی: {currentSection.notes}
          </Typography>
        </Alert>
      )}
    </StyledPaper>
  );
};
