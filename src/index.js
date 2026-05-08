import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Not using react-router to avoid hook resolution issues; simple in-app navigation

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Starting React app');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
