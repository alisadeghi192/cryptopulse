import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Outlet />
    </div>
  )
}