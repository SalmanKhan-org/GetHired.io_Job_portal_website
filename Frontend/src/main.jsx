
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppContextProvider } from './context/appContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


// ✅ Add your Clerk publishable key here
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY




createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}  afterSignOutUrl={'/'}>
  <AppContextProvider>
        <App />
  </AppContextProvider>
    </ClerkProvider >
  
)
