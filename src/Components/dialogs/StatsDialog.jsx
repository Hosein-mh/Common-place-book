import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";
import { 
  Analytics, 
  TrendingUp, 
  Timer, 
  CheckCircle, 
  Speed,
  EmojiEvents,
  School,
  Mic
} from "@mui/icons-material";
import { useSessionStats } from "../../hooks/useSessionStats";
import { useScript } from "../../contexts/ScriptContext";
import { formatTime, formatPercentage } from "../../utils/helpers";

export const StatsDialog = ({ open, onClose }) => {
  const { sessionStats } = useSessionStats();
  const { scriptData, currentSectionIndex } = useScript();

  const statsCards = [
    {
      title: "دقت میانگین",
      value: `${Math.round(sessionStats.averageAccuracy || 0)}%`,
      icon: <TrendingUp />,
      color: "primary",
      progress: sessionStats.averageAccuracy || 0
    },
    {
      title: "بهترین عملکرد", 
      value: `${Math.round(sessionStats.bestAccuracy || 0)}%`,
      icon: <EmojiEvents />,
      color: "success",
      progress: sessionStats.bestAccuracy || 0
    },
    {
      title: "بخش‌های تکمیل شده",
      value: `${sessionStats.completedSections}/${scriptData.sections.length}`,
      icon: <CheckCircle />,
      color: "info",
      progress: (sessionStats.completedSections / scriptData.sections.length) * 100
    },
    {
      title: "زمان تمرین",
      value: formatTime(sessionStats.sessionDuration || 0),
      icon: <Timer />,
      color: "warning",
      showProgress: false
    },
    {
      title: "کل کلمات",
      value: sessionStats.totalWords || 0,
      icon: <Mic />,
      color: "secondary",
      showProgress: false
    },
    {
      title: "کلمات تشخیص داده شده",
      value: sessionStats.recognizedWords || 0,
      icon: <Speed />,
      color: "error", 
      progress: sessionStats.totalWords > 0 ? (sessionStats.recognizedWords / sessionStats.totalWords) * 100 : 0
    }
  ];

  const achievements = [
    {
      title: "شروع قوی",
      description: "اولین بخش را تکمیل کردید",
      earned: sessionStats.completedSections > 0,
      icon: "🚀"
    },
    {
      title: "دقت بالا",
      description: "دقت بالای 80% کسب کردید",
      earned: sessionStats.bestAccuracy > 80,
      icon: "🎯"
    },
    {
      title: "پایداری",
      description: "بیش از 5 دقیقه تمرین کردید",
      earned: sessionStats.sessionDuration > 300000,
      icon: "⏰"
    },
    {
      title: "تسلط",
      description: "نیمی از بخش‌ها را تکمیل کردید",
      earned: sessionStats.completedSections >= scriptData.sections.length / 2,
      icon: "👑"
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ 
        sx: { 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        } 
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Analytics />
          <Typography variant="h5" fontWeight="bold">
            آمار تفصیلی جلسه
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ background: 'rgba(255,255,255,0.95)', color: 'text.primary', m: 2, borderRadius: 2 }}>
        {/* Main Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ color: `${stat.color}.main` }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {stat.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h3" color={`${stat.color}.main`} gutterBottom fontWeight="bold">
                    {stat.value}
                  </Typography>
                  
                  {stat.showProgress !== false && (
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress || 0}
                      color={stat.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Achievements Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents color="warning" />
            دستاورد‌ها
          </Typography>
          <Grid container spacing={2}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card 
                  sx={{ 
                    opacity: achievement.earned ? 1 : 0.5,
                    background: achievement.earned 
                      ? 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)' 
                      : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
                    color: achievement.earned ? 'white' : 'text.secondary'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h4">{achievement.icon}</Typography>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2">
                          {achievement.description}
                        </Typography>
                      </Box>
                      {achievement.earned && (
                        <CheckCircle sx={{ ml: 'auto', color: 'success.contrastText' }} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Session Details */}
        <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School color="primary" />
            جزئیات جلسه
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><Timer color="primary" /></ListItemIcon>
              <ListItemText 
                primary="زمان شروع جلسه" 
                secondary={new Date(sessionStats.startTime).toLocaleString('fa-IR')}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="بخش فعلی" 
                secondary={`بخش ${currentSectionIndex + 1}: ${scriptData.sections[currentSectionIndex]?.title}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><Analytics color="info" /></ListItemIcon>
              <ListItemText 
                primary="نرخ موفقیت کلی"
                secondary={`${formatPercentage((sessionStats.completedSections / scriptData.sections.length) * 100)}`}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Tips for Improvement */}
        <Box sx={{ mt: 3, p: 3, background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="warning.main">
            💡 پیشنهادات بهبود
          </Typography>
          <List dense>
            {sessionStats.averageAccuracy < 70 && (
              <ListItem>
                <Typography variant="body2">
                  • سعی کنید آهسته‌تر و واضح‌تر صحبت کنید
                </Typography>
              </ListItem>
            )}
            {sessionStats.completedSections < 3 && (
              <ListItem>
                <Typography variant="body2">
                  • با تمرین بیشتر، سرعت پیشرفت شما افزایش می‌یابد
                </Typography>
              </ListItem>
            )}
            {sessionStats.sessionDuration < 180000 && (
              <ListItem>
                <Typography variant="body2">
                  • برای نتایج بهتر، زمان بیشتری را به تمرین اختصاص دهید
                </Typography>
              </ListItem>
            )}
            <ListItem>
              <Typography variant="body2">
                • از قسمت تنظیمات می‌توانید حساسیت تشخیص صوت را تنظیم کنید
              </Typography>
            </ListItem>
          </List>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          size="large"
          sx={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            '&:hover': { background: 'rgba(255,255,255,0.3)' }
          }}
        >
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};