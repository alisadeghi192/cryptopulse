import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PageLoader } from '@/components/ui/PageLoader'
import { NotFound } from '@/pages/NotFound'

// ─── Lazy loaded pages ───
const Home = lazy(() =>
  import('@/pages/Home').then((m) => ({ default: m.Home })),
)
const Markets = lazy(() =>
  import('@/pages/Markets').then((m) => ({ default: m.Markets })),
)
const CoinDetail = lazy(() =>
  import('@/pages/CoinDetail').then((m) => ({ default: m.CoinDetail })),
)
const About = lazy(() =>
  import('@/pages/About').then((m) => ({ default: m.About })),
)
const Converter = lazy(() =>
  import('@/pages/Converter').then((m) => ({ default: m.Converter })),
)
const Auth = lazy(() =>
  import('@/pages/Auth').then((m) => ({ default: m.Auth })),
)
const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Watchlist = lazy(() =>
  import('@/pages/Watchlist').then((m) => ({ default: m.Watchlist })),
)
const Profile = lazy(() =>
  import('@/pages/Profile').then((m) => ({ default: m.Profile })),
)

// ─── Suspense wrapper ───
function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  // Public pages
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <Home />
          </LazyPage>
        ),
      },
      {
        path: 'markets',
        element: (
          <LazyPage>
            <Markets />
          </LazyPage>
        ),
      },
      {
        path: 'coin/:id',
        element: (
          <LazyPage>
            <CoinDetail />
          </LazyPage>
        ),
      },
      {
        path: 'about',
        element: (
          <LazyPage>
            <About />
          </LazyPage>
        ),
      },
      {
        path: 'converter',
        element: (
          <LazyPage>
            <Converter />
          </LazyPage>
        ),
      },
    ],
  },
  // User pages
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <LazyPage>
            <Dashboard />
          </LazyPage>
        ),
      },
      {
        path: 'watchlist',
        element: (
          <LazyPage>
            <Watchlist />
          </LazyPage>
        ),
      },
      {
        path: 'profile',
        element: (
          <LazyPage>
            <Profile />
          </LazyPage>
        ),
      },
    ],
  },
  // Auth pages
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <LazyPage>
            <Auth />
          </LazyPage>
        ),
      },
      {
        path: 'register',
        element: (
          <LazyPage>
            <Auth />
          </LazyPage>
        ),
      },
    ],
  },
  // 404
  { path: '*', element: <NotFound /> },
])