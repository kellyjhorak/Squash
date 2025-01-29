import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//import the function from the realtime database module
import { getDatabase } from 'firebase/database';
// Get a reference to the database service
const db = getDatabase();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
