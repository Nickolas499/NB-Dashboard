import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.tsx'
import {AssignProvider} from './context/assignContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <AssignProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AssignProvider>
    </AuthProvider>
  </StrictMode>
)
