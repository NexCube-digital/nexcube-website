import React, { useState, useEffect } from 'react'
import apiClient, { Invoice, Finance } from '../../services/api'

interface InvoiceData {
  id: number
  invoiceNumber: string
  clientName?: string
  clientId?: number
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issueDate: string
  dueDate: string
}

export const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    overdueInvoices: 0,
    recentInvoices: [] as InvoiceData[]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        
        // Get contacts count
        const contactsResponse = await apiClient.getContacts()
        const totalClients = (Array.isArray(contactsResponse.data) ? contactsResponse.data.length : 0) || 0
        
        // Get invoices
        let invoices: InvoiceData[] = []
        try {
          const invoicesResponse = await apiClient.getInvoices()
          if (Array.isArray(invoicesResponse.data)) {
            invoices = invoicesResponse.data
          }
        } catch (error) {
          console.warn('Failed to load invoices:', error)
        }

        // Get finances to calculate revenue
        let finances: any[] = []
        try {
          const financesResponse = await apiClient.getFinances()
          if (Array.isArray(financesResponse.data)) {
            finances = financesResponse.data
          }
        } catch (error) {
          console.warn('Failed to load finances:', error)
        }

        // Calculate stats
        const totalInvoices = invoices.length
        const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length
        
        // Total Revenue from ALL invoices (not just paid)
        const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0)
        
        // Get recent invoices (last 3)
        const recentInvoices = invoices
          .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
          .slice(0, 3)

        setStats({
          totalClients: totalClients || 0,
          totalInvoices: totalInvoices || 0,
          totalRevenue: totalRevenue || 0,
          overdueInvoices: overdueInvoices || 0,
          recentInvoices: recentInvoices || []
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
        setStats({
          totalClients: 0,
          totalInvoices: 0,
          totalRevenue: 0,
          overdueInvoices: 0,
          recentInvoices: []
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    {
      label: 'Total Klien',
      value: stats.totalClients,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM15 16a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Total Invoice',
      value: stats.totalInvoices,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Total Revenue',
      value: `Rp ${Math.round((stats.totalRevenue || 0) / 1000000)}Jt`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Overdue Invoices',
      value: stats.overdueInvoices,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Invoice Terbaru</h2>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {Array.isArray(stats.recentInvoices) && stats.recentInvoices.length > 0 ? (
              stats.recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-semibold text-slate-900">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-slate-600">{invoice.clientName || 'Unknown Client'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">Rp {((invoice.amount || 0) / 1000000).toFixed(1)}Jt</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'sent' ? 'bg-yellow-100 text-yellow-700' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>Tidak ada invoice terbaru</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Ringkasan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-semibold">Total Invoices</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">{stats.totalInvoices}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <p className="text-sm text-green-700 font-semibold">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900 mt-2">Rp {((stats.totalRevenue || 0) / 1000000).toFixed(0)}M</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-700 font-semibold">Overdue Invoices</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">{stats.overdueInvoices}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
