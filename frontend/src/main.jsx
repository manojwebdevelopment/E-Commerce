import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext } from './Components/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContext>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthContext>
  ,
)
