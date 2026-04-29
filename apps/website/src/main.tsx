import * as React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/pages'

import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <App />,
// )
