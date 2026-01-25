import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { HelmetProvider, Helmet } from 'react-helmet-async';
import App from './app/App.tsx';
import './styles/index.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
        <Helmet>

        </Helmet>
        
        <App />
    </HelmetProvider>
  </StrictMode>,
);