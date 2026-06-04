import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { defineCustomElements as defineBaseUi } from '@jobtarget/base-ui/loader'
import './index.css'
import App from './App.tsx'

defineBaseUi()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
