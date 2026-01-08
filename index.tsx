import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* FIX: Wrap the App component with LanguageProvider to provide the language context to all child components. */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
