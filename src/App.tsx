import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './components/theme-provider'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import UserManagement from './pages/UserManagement'
import Analytics from './pages/Analytics'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard/analytics" replace />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
