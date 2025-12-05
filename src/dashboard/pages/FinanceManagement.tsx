import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import apiClient, { Finance, Invoice } from '../../services/api'
import { FinanceTable } from './finance/FinanceTable'
import { FormFinance } from './finance/FormFinance'

export const FinanceManagement: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [finances, setFinances] = useState<Finance[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Check if form should be shown based on URL
  const showForm = location.pathname.includes('/formfinance')

  const [formData, setFormData] = useState<Omit<Finance, 'id' | 'createdAt' | 'updatedAt'>>({
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    status: 'pending',
    notes: ''
  })

  // Load finances from backend
  const loadFinances = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await apiClient.getFinances()
      if (response.success && response.data) {
        setFinances(response.data)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load finances')
    } finally {
      setLoading(false)
    }
  }

  // Load invoices from backend
  const loadInvoices = async () => {
    try {
      const response = await apiClient.getInvoices()
      if (response.success && response.data) {
        setInvoices(response.data)
      }
    } catch (err: any) {
      console.error('Failed to load invoices:', err.message)
    }
  }

  useEffect(() => {
    loadFinances()
    loadInvoices()
  }, [])

  const filteredFinances = Array.isArray(finances) ? finances.filter(finance =>
    finance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finance.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'amount') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError('')

      if (editingId) {
        // Update existing finance
        const response = await apiClient.updateFinance(editingId, formData)
        if (response.success) {
          await loadFinances()
        }
      } else {
        // Create new finance
        const response = await apiClient.createFinance(formData)
        if (response.success) {
          await loadFinances()
        }
      }

      setFormData({
        type: 'income',
        category: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        status: 'pending',
        notes: ''
      })
      setEditingId(null)
      navigate('/dashboard/finances')
    } catch (err: any) {
      setError(err.message || 'Failed to save finance')
    } finally {
      setLoading(false)
    }
  }

  const handleEditFinance = (finance: Finance) => {
    setFormData({
      type: finance.type,
      category: finance.category,
      amount: finance.amount,
      description: finance.description,
      date: finance.date,
      paymentMethod: finance.paymentMethod || '',
      status: finance.status,
      notes: finance.notes || ''
    })
    setEditingId(finance.id.toString())
    navigate('/dashboard/finances/formfinance')
  }

  const handleDeleteFinance = async (financeId: number) => {
    try {
      setLoading(true)
      setError('')
      await apiClient.deleteFinance(financeId.toString())
      await loadFinances()
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to delete finance')
      setLoading(false)
      throw err
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      type: 'income',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      status: 'pending',
      notes: ''
    })
    navigate('/dashboard/finances')
  }

  // Calculate stats
  const totalIncome = finances.reduce((sum, f) => f.type === 'income' && f.status === 'completed' ? sum + Number(f.amount) : sum, 0)
  const totalExpense = finances.reduce((sum, f) => f.type === 'expense' && f.status === 'completed' ? sum + Number(f.amount) : sum, 0)
  const invoiceRevenue = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0)
  const totalPemasukan = invoiceRevenue + totalIncome
  const balance = totalPemasukan - totalExpense

  return (
    <div>
      <Helmet>
        <title>Manajemen Keuangan - NexCube Dashboard</title>
      </Helmet>

      {/* Page Container with Fade-In Animation */}
      <div className="animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manajemen Keuangan</h1>
            <p className="text-slate-600 mt-2">Kelola transaksi pemasukan dan pengeluaran</p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setTimeout(() => navigate('/dashboard/finances/formfinance'), 150)
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
            >
              + Tambah Transaksi
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <FormFinance
              formData={formData}
              editingId={editingId}
              loading={loading}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Table & Stats - Only show when not in form view */}
        {!showForm && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <p className="text-slate-600 text-sm mb-2">Total Pemasukan</p>
                <p className="text-3xl font-bold text-green-600">Rp {Math.round(totalPemasukan || 0).toLocaleString('id-ID')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <p className="text-slate-600 text-sm mb-2">Pemasukan Lainnya</p>
                <p className="text-3xl font-bold text-green-600">Rp {Math.round(totalIncome || 0).toLocaleString('id-ID')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <p className="text-slate-600 text-sm mb-2">Total Pengeluaran</p>
                <p className="text-3xl font-bold text-red-600">Rp {Math.round(totalExpense || 0).toLocaleString('id-ID')}</p>
              </div>
              <div className={`bg-white rounded-xl p-6 shadow-lg border border-slate-200`}>
                <p className="text-slate-600 text-sm mb-2">Saldo</p>
                <p className={`text-3xl font-bold ${(balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Rp {Math.round(balance || 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Finance Table Section Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">Daftar Transaksi</h2>
              <p className="text-sm text-slate-600">Kelola semua transaksi keuangan Anda</p>
            </div>

            {/* Finance Table */}
            <FinanceTable 
              finances={filteredFinances}
              loading={loading}
              onEditFinance={handleEditFinance}
              onDeleteFinance={handleDeleteFinance}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FinanceManagement
