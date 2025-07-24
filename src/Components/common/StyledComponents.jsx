import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: 16,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  border: `1px solid ${theme.palette.divider}`,
}));

export const RecordingIndicator = styled(Box)(({ theme, recording }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: 20,
  backgroundColor: recording
    ? theme.palette.error.main
    : theme.palette.action.hover,
  color: recording
    ? theme.palette.error.contrastText
    : theme.palette.text.primary,
  animation: recording ? "pulse 1.5s infinite" : "none",
  "@keyframes pulse": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.7 },
    "100%": { opacity: 1 },
  },
}));

export const HighlightedText = styled("span")(
  ({ theme, matched, isKeyword }) => ({
    padding: "2px 6px",
    borderRadius: 6,
    margin: "0 2px",
    transition: "all 0.3s ease",
    backgroundColor: matched
      ? theme.palette.success.light
      : isKeyword
      ? theme.palette.warning.light
      : "transparent",
    color: matched
      ? theme.palette.success.contrastText
      : isKeyword
      ? theme.palette.warning.contrastText
      : theme.palette.text.primary,
    fontWeight: matched || isKeyword ? 600 : 400,
    boxShadow: matched ? `0 2px 8px ${theme.palette.success.main}40` : "none",
  })
);
