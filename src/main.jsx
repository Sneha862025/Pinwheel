import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PinsProvider } from './hooks/usePins';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PinsProvider>
        <App />
      </PinsProvider>
    </BrowserRouter>
  </StrictMode>
);
