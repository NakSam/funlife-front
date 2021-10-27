import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { theme } from "./utils/muiTheme";
import { ThemeProvider } from '@mui/material';
import GlobalFonts from "./static/fonts/fonts"

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
