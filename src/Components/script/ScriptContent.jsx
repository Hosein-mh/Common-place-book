import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import {
  Schedule,
  EmojiEvents,
  Psychology,
  Bookmark,
} from "@mui/icons-material";
import { HighlightedText } from "../common/StyledComponents";
import { useScript } from "../../contexts/ScriptContext";
import { useSettings } from "../../hooks/useSettings";
import { useBookmarks } from "../../hooks/useBookmarks";

export const ScriptContent = () => {
  const { currentSection, matchedWords } = useScript();
  const { settings } = useSettings();
  const { bookmarks, toggleBookmark } = useBookmarks();

  if (!currentSection) return null;

  const renderHighlightedText = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const cleanWord = word
        .toLowerCase()
        .replace(/[^\u0600-\u06FF\u0750-\u077F]/g, "");
      const isMatched = matchedWords.has(cleanWord);
      const isKeyword = currentSection.keywords?.some(
        (kw) =>
          kw.toLowerCase().includes(cleanWord) ||
          cleanWord.includes(kw.toLowerCase())
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
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {currentSection.title}
          </Typography>
          <Chip
            icon={
              bookmarks.has(currentSection.id) ? <Bookmark /> : <Bookmark />
            }
            label={bookmarks.has(currentSection.id) ? "نشان‌شده" : "نشان‌کردن"}
            clickable
            onClick={() => toggleBookmark(currentSection.id)}
            color={bookmarks.has(currentSection.id) ? "warning" : "default"}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {currentSection.timeRange}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmojiEvents fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {currentSection.emotion}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Psychology fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {currentSection.energy}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              موضوع: {currentSection.topic}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            متن اسکریپت:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 2,
              fontSize: "1.1rem",
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            {renderHighlightedText(currentSection.text)}
          </Typography>
        </Box>

        {settings.showNotes && currentSection.notes && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom color="info.main">
              💡 نکات:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                p: 2,
                bgcolor: "info.light",
                color: "info.contrastText",
                borderRadius: 2,
                fontStyle: "italic",
              }}
            >
              {currentSection.notes}
            </Typography>
          </Box>
        )}

        {settings.showKeywords && currentSection.keywords && (
          <Box>
            <Typography variant="h6" gutterBottom color="warning.main">
              🔑 کلمات کلیدی:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {currentSection.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  size="small"
                  color={
                    matchedWords.has(keyword.toLowerCase())
                      ? "success"
                      : "default"
                  }
                  variant={
                    matchedWords.has(keyword.toLowerCase())
                      ? "filled"
                      : "outlined"
                  }
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
