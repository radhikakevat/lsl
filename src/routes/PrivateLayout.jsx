import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../layouts/Layout'
 
// ---- Main Layout Wrapper ----
const PrivateLayout = () => {
  // const isAuthenticated = useSelector((state) => state?.auth?.user)
  const user = useSelector((state) => state?.auth?.user)
  const isAuthenticated = !!user
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')

  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname
    if (path === '/dashboard') {
      setActiveSection('dashboard')
    } else if (path === '/employees') {
      setActiveSection('employees')
    } else if (path === '/reports') {
      setActiveSection('reports')
    } else if (path === '/rules') {
      setActiveSection('rules')
    } else if (path === '/user-management') {
      setActiveSection('user_management')
    } else if (path === '/settings') {
      setActiveSection('settings')
    }
  }, [location.pathname])

  const handleSectionChange = (section) => {
    setActiveSection(section)
    
    // Navigate to the appropriate route
    switch (section) {
      case 'dashboard':
        navigate('/dashboard')
        break
      case 'employees':
        navigate('/employees')
        break
      case 'reports':
        navigate('/reports')
        break
      case 'rules':
        navigate('/rules')
        break
      case 'user_management':
        navigate('/user-management')
        break
      case 'settings':
        navigate('/settings')
        break
      default:
        navigate('/dashboard')
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
 
  return (
    <Layout
      userName={user?.name || user?.fullName || user?.username || user?.email}
      userRole={user?.role || (Array.isArray(user?.roles) ? user.roles[0] : undefined || "Administrator")}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <Outlet />
    </Layout>
  )
}
 
export default PrivateLayout