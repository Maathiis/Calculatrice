import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Calculatrice from './components/Calculatrice.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calculatrice />
  </StrictMode>,
);
