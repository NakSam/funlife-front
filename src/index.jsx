import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Navbar from "./components/common/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Navbar />
    </BrowserRouter>
  </React.StrictMode>
, document.getElementById('root'));
