import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalFonts from "./static/fonts"
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalFonts />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
, document.getElementById('root'));
