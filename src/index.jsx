import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalFonts from "./static/fonts/fonts"
import App from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from "./utils/muiTheme";

ReactDOM.render(
  <React.StrictMode>
    <GlobalFonts />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
, document.getElementById('root'));
