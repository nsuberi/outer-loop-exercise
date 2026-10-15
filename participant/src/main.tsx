import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#225548' },
    secondary: { main: '#9D5638' },
    background: { default: '#F6F4ED', paper: '#FFFFFF' },
    text: { primary: '#18312B', secondary: '#52665F' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-.04em', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' },
    h2: { fontWeight: 750, letterSpacing: '-.03em', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' },
    h3: { fontWeight: 700, letterSpacing: '-.025em', fontSize: '1.45rem' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: { styleOverrides: { root: { border: '1px solid #E6E8E2', boxShadow: '0 12px 35px rgba(23,50,42,.06)' } } },
    MuiButton: { defaultProps: { disableElevation: true } }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter><App /></BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
