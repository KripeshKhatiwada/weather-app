import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './index.css';
import App from './App';
import'./App.css';

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render() instead of ReactDOM.render()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
