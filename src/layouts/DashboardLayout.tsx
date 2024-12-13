import { Outlet } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme-toggle'

const DashboardLayout = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard/analytics')}
                >
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard/users')}
                >
                  Users
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout 