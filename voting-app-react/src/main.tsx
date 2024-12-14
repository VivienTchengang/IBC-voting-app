import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Root } from './routes/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './routes/layout'
import { Ranking } from './routes/ranking/ranking'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Root />
      },
      {
        path: 'ranking',
        element: <Ranking />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
