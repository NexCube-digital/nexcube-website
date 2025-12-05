import React, { useState, useEffect } from 'react'

export const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    pendingInvoices: 0
  })

  useEffect(() => {
    // Fetch stats dari API
    setStats({
      totalClients: 24,
      totalInvoices: 156,
      totalRevenue: 125000000,
      pendingInvoices: 8
    })
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
      value: `Rp ${(stats.totalRevenue / 1000000).toFixed(0)}M`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Invoice Pending',
      value: stats.pendingInvoices,
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
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-semibold text-slate-900">INV-2024-{String(item).padStart(3, '0')}</p>
                  <p className="text-sm text-slate-600">Client Name</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">Rp 5.000.000</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Ringkasan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-semibold">Invoices This Month</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">24</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <p className="text-sm text-green-700 font-semibold">Revenue This Month</p>
              <p className="text-2xl font-bold text-green-900 mt-2">Rp 45M</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-700 font-semibold">Overdue Invoices</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
