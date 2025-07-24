import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Error as ErrorIcon, Refresh } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3
          }}
        >
          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: 500, 
              textAlign: 'center',
              borderRadius: 3,
              boxShadow: 24
            }}
          >
            <ErrorIcon 
              sx={{ 
                fontSize: 80, 
                color: 'error.main', 
                mb: 2 
              }} 
            />
            
            <Typography variant="h4" gutterBottom color="error">
              خطای غیرمنتظره
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              متأسفانه خطایی در برنامه رخ داده است. لطفاً صفحه را مجدداً بارگذاری کنید.
            </Typography>
            
            <Button 
              variant="contained" 
              startIcon={<Refresh />}
              onClick={this.handleReload}
              size="large"
            >
              بارگذاری مجدد
            </Button>

            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="caption" color="error">
                  خطا: {this.state.error && this.state.error.toString()}
                </Typography>
                <pre style={{ fontSize: '10px', overflow: 'auto', maxHeight: 200 }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </Box>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;