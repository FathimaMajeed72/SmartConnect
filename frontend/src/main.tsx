import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StoreProvider from './app/providers/StoreProvider.tsx'
import AuthInitializer from "./app/providers/AuthInitializer"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </StoreProvider>
  </StrictMode>,
)
