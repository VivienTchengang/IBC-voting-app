import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './routes/layout'
import { Ranking } from './routes/(auth)/ranking/ranking'
import { Login } from './routes/login/login'
import { Voting } from './routes/(auth)/voting'
import { AuthLayout } from './routes/(auth)/auth-layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'voting',
            element: <Voting />
          },
          {
            path: 'ranking',
            element: <Ranking />
          }
        ]
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
