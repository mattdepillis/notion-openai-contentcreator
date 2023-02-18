import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

// create the root with the new root API and render App
ReactDOM.createRoot(
  document.getElementById('app')
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
