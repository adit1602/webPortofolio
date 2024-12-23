import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

// Initialize AOS
AOS.init({
  duration: 800, // Animation duration
  once: false, // Whether animation should happen only once
  offset: 120, // Offset (in pixels) from the original trigger point
  
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)