 // src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(rootElement);

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
