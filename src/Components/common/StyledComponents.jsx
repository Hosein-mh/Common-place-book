// src/components/common/StyledComponents.jsx - Complete Implementation
import { styled, keyframes } from "@mui/material/styles";
import {
  Paper,
  Box,
  Chip,
  Card,
  LinearProgress,
  Fab,
  Button,
} from "@mui/material";

// Keyframe animations
const pulse = keyframes`
  0% { 
    opacity: 1; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.02); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1); 
  }
`;

const glow = keyframes`
  0% { 
    box-shadow: 0 0 5px currentColor; 
  }
  50% { 
    box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
  }
  100% { 
    box-shadow: 0 0 5px currentColor; 
  }
`;

const slideIn = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const fadeIn = keyframes`
  0% { 
    opacity: 0; 
  }
  100% { 
    opacity: 1; 
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Main styled components
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: 20,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: "blur(10px)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 20px 40px rgba(0, 0, 0, 0.6)"
        : "0 20px 40px rgba(0, 0, 0, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
        : "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)",
  },
}));

export const RecordingIndicator = styled(Box)(({ theme, recording }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
  borderRadius: 25,
  background: recording
    ? "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)"
    : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
  color: recording
    ? theme.palette.error.contrastText
    : theme.palette.text.primary,
  animation: recording ? `${pulse} 1.5s infinite` : "none",
  border: `2px solid ${
    recording ? theme.palette.error.main : theme.palette.divider
  }`,
  boxShadow: recording
    ? "0 8px 25px rgba(244, 67, 54, 0.4)"
    : "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": recording
    ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        animation: `${shimmer} 2s infinite`,
      }
    : {},
}));

export const HighlightedText = styled("span")(
  ({ theme, matched, isKeyword }) => ({
    padding: "4px 8px",
    borderRadius: 8,
    margin: "0 2px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-block",
    position: "relative",
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
    boxShadow: matched
      ? `0 4px 15px ${theme.palette.success.main}40`
      : isKeyword
      ? `0 4px 15px ${theme.palette.warning.main}40`
      : "none",
    transform: matched || isKeyword ? "scale(1.05)" : "scale(1)",
    "&:hover": {
      transform: "scale(1.1)",
      zIndex: 1,
    },
    "&::before":
      matched || isKeyword
        ? {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 8,
            background: matched
              ? `linear-gradient(45deg, ${theme.palette.success.main}20, ${theme.palette.success.light}20)`
              : `linear-gradient(45deg, ${theme.palette.warning.main}20, ${theme.palette.warning.light}20)`,
            zIndex: -1,
          }
        : {},
  })
);

export const GlassCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "rgba(26, 26, 26, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(20px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  borderRadius: 20,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    background:
      theme.palette.mode === "dark"
        ? "rgba(26, 26, 26, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 25px 50px rgba(0, 0, 0, 0.7)"
        : "0 25px 50px rgba(0, 0, 0, 0.15)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        : "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
  },
}));

export const AnimatedChip = styled(Chip)(({ theme, matched }) => ({
  borderRadius: 12,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontWeight: 500,
  position: "relative",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
  },
  ...(matched && {
    animation: `${glow} 2s infinite`,
    background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
    color: theme.palette.success.contrastText,
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      borderRadius: 14,
      background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
      zIndex: -1,
      opacity: 0.3,
      filter: "blur(4px)",
    },
  }),
}));

export const FloatingContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 24,
  right: theme.direction === "rtl" ? "auto" : 24,
  left: theme.direction === "rtl" ? 24 : "auto",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
}));

export const AnimatedFab = styled(Fab)(({ theme, recording }) => ({
  boxShadow: recording
    ? "0 12px 35px rgba(244, 67, 54, 0.4)"
    : "0 8px 25px rgba(25, 118, 210, 0.3)",
  background: recording
    ? "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)"
    : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
  animation: recording ? `${pulse} 1.5s infinite` : "none",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: recording
      ? "0 15px 40px rgba(244, 67, 54, 0.5)"
      : "0 12px 30px rgba(25, 118, 210, 0.4)",
    background: recording
      ? "linear-gradient(135deg, #d32f2f 0%, #c62828 100%)"
      : "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "0",
    height: "0",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.3)",
    transition: "all 0.6s ease-out",
    transform: "translate(-50%, -50%)",
  },
  "&:active::before": {
    width: "120px",
    height: "120px",
  },
}));

export const GradientProgress = styled(LinearProgress)(
  ({ theme, color = "primary" }) => ({
    borderRadius: 10,
    height: 8,
    background: theme.palette.mode === "dark" ? "#333" : "#e2e8f0",
    "& .MuiLinearProgress-bar": {
      borderRadius: 10,
      background:
        color === "success"
          ? "linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)"
          : color === "warning"
          ? "linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)"
          : color === "error"
          ? "linear-gradient(90deg, #f44336 0%, #e57373 100%)"
          : theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #90caf9 0%, #42a5f5 100%)"
          : "linear-gradient(90deg, #1976d2 0%, #1565c0 100%)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        animation: `${shimmer} 2s infinite`,
      },
    },
  })
);

export const SkeletonLoader = styled(Box)(
  ({ theme, width = "100%", height = "20px" }) => ({
    width,
    height,
    borderRadius: 4,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)"
        : "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1.5s infinite`,
  })
);

export const StyledButton = styled(Button)(
  ({ theme, variant = "contained" }) => ({
    borderRadius: 12,
    textTransform: "none",
    fontWeight: 600,
    padding: theme.spacing(1.5, 3),
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    ...(variant === "contained" && {
      background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
      boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
      "&:hover": {
        background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
        boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
        transform: "translateY(-2px)",
      },
    }),
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "0",
      height: "0",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.2)",
      transition: "all 0.6s ease-out",
      transform: "translate(-50%, -50%)",
    },
    "&:active::before": {
      width: "200px",
      height: "200px",
    },
  })
);

export const GradientBox = styled(Box)(({ theme, gradient = "primary" }) => ({
  background:
    gradient === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : gradient === "success"
      ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
      : gradient === "warning"
      ? "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)"
      : gradient === "error"
      ? "linear-gradient(135deg, #f44336 0%, #e57373 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: 20,
  padding: theme.spacing(3),
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    zIndex: -1,
  },
}));

export const PulsingDot = styled(Box)(({ theme, color = "primary" }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: theme.palette[color].main,
  animation: `${pulse} 1.5s infinite`,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    borderRadius: "50%",
    backgroundColor: theme.palette[color].main,
    opacity: 0.3,
    animation: `${pulse} 1.5s infinite 0.5s`,
  },
}));

export const SlideInContainer = styled(Box)(() => ({
  animation: `${slideIn} 0.5s ease-out`,
}));

export const FadeInContainer = styled(Box)(() => ({
  animation: `${fadeIn} 0.3s ease-out`,
}));

export const HoverCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 20px 40px rgba(0, 0, 0, 0.6)"
        : "0 20px 40px rgba(0, 0, 0, 0.15)",
    borderColor: theme.palette.primary.main,
  },
}));

// Responsive helpers
export const MobileOnly = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none !important",
  },
}));

export const DesktopOnly = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}));

// Utility components
export const Spacer = styled(Box)(({ size = 1 }) => ({
  height: `${size * 8}px`,
}));

export const FlexCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FlexBetween = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const ScrollableContainer = styled(Box)(() => ({
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
}));
