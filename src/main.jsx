import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import AuthcontextProvider from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthcontextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthcontextProvider>
  </BrowserRouter>
)
