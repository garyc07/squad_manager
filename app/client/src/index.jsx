import React from 'react'
import App from './app/App'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { StyledEngineProvider } from '@mui/styled-engine'
import { CssBaseline } from '@mui/material'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById('root')
)

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

