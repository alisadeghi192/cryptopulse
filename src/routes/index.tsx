import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Home } from '@/pages/Home'
import { Markets } from '@/pages/Markets'
import { CoinDetail } from '@/pages/CoinDetail'
import { About } from '@/pages/About'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Dashboard } from '@/pages/Dashboard'
import { Watchlist } from '@/pages/Watchlist'
import { Profile } from '@/pages/Profile'
import { NotFound } from '@/pages/NotFound'
import { Converter } from '@/pages/Converter'

export const router = createBrowserRouter([
  // Public pages 
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'markets', element: <Markets /> },
      { path: 'coin/:id', element: <CoinDetail /> },
      { path: 'about', element: <About /> },
      { path: 'converter', element: <Converter /> },
    ],
  },
  // User pages
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'watchlist', element: <Watchlist /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  // Auth pages
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  // 404
  { path: '*', element: <NotFound /> },
])