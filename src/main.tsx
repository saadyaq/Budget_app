import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary'

// 🚀 REVOLUTIONARY BUDGET APP - VERSION 2.0.0
// Features: Glassmorphism 2.0, Aurora gradients, Physics animations, 3D Gamification
console.log('🌟 Revolutionary Budget App Loading... Build: 2025-08-12');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
