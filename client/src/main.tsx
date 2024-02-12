import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../app/globals.css'
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { BrowserRouter as Routers } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
      </Routers>
  </React.StrictMode>,
)
