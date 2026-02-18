import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ViteConfig from './vite_config.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViteConfig />
  </StrictMode>,
)
