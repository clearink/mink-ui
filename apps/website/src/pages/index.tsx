import { HashRouter, Routes } from 'react-router-dom'

import useRenderRoutes from '@/hooks/use-render-routes'
import routes from '@/routes'

export default function App() {
  const elements = useRenderRoutes(routes)

  return (
    <HashRouter>
      <Routes>
        {elements}
      </Routes>
    </HashRouter>
  )
}
