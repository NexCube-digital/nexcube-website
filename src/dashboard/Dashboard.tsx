import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import DashboardSidebar from './components/Sidebar'
import DashboardHeader from './components/Header'
import DashboardStats from './components/Stats'
import ClientManagement from './pages/ClientManagement'
import InvoiceManagement from './pages/InvoiceManagement'
import FinanceManagement from './pages/FinanceManagement'
import ReportManagement from './pages/ReportManagement'

export const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [navigate])

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <DashboardStats />
      case 'clients':
        return <ClientManagement />
      case 'invoices':
        return <InvoiceManagement />
      case 'finance':
        return <FinanceManagement />
      case 'reports':
        return <ReportManagement />
      default:
        return <DashboardStats />
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Dashboard - NexCube Digital Admin</title>
        <meta name="description" content="Dashboard admin NexCube Digital untuk mengelola klien, invoice, keuangan, dan laporan" />
      </Helmet>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <DashboardHeader 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={user}
          />
          
          <main className="p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
