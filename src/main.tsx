import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './Store'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
