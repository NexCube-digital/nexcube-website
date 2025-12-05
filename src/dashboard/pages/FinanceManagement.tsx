import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  paymentMethod: string
  status: 'completed' | 'pending' | 'cancelled'
  notes: string
}

export const FinanceManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-20',
      type: 'income',
      category: 'Project Payment',
      description: 'Website Development - PT Maju Bersama',
      amount: 2000000,
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      notes: ''
    },
    {
      id: '2',
      date: '2024-01-19',
      type: 'expense',
      category: 'Operational',
      description: 'Sewa Kantor Januari',
      amount: 500000,
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      notes: 'Monthly office rent'
    },
    {
      id: '3',
      date: '2024-01-18',
      type: 'income',
      category: 'Design Service',
      description: 'Logo Design - Karomah Food',
      amount: 1500000,
      paymentMethod: 'Cash',
      status: 'completed',
      notes: ''
    },
    {
      id: '4',
      date: '2024-01-17',
      type: 'expense',
      category: 'Software License',
      description: 'Adobe Creative Cloud Subscription',
      amount: 250000,
      paymentMethod: 'Credit Card',
      status: 'completed',
      notes: 'Monthly subscription'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'income',
    category: '',
    description: '',
    amount: 0,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    notes: ''
  })

  const incomeCategories = ['Project Payment', 'Design Service', 'Consulting', 'Other Income']
  const expenseCategories = ['Operational', 'Software License', 'Equipment', 'Marketing', 'Staff', 'Other Expense']
  const paymentMethods = ['Bank Transfer', 'Cash', 'Credit Card', 'E-Wallet']

  const filteredTransactions = transactions.filter(trans => {
    const typeMatch = filterType === 'all' || trans.type === filterType
    const dateStart = dateRange.start ? new Date(trans.date) >= new Date(dateRange.start) : true
    const dateEnd = dateRange.end ? new Date(trans.date) <= new Date(dateRange.end) : true
    return typeMatch && dateStart && dateEnd
  })

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalIncome - totalExpense

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.description || !formData.amount) {
      alert('Harap isi deskripsi dan jumlah')
      return
    }

    if (editingId) {
      setTransactions(prev =>
        prev.map(trans =>
          trans.id === editingId
            ? { ...trans, ...formData }
            : trans
        )
      )
      setEditingId(null)
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...formData
      }
      setTransactions(prev => [newTransaction, ...prev])
    }

    handleCancel()
  }

  const handleEdit = (transaction: Transaction) => {
    setFormData({
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount,
      paymentMethod: transaction.paymentMethod,
      status: transaction.status,
      notes: transaction.notes
    })
    setEditingId(transaction.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      setTransactions(prev => prev.filter(trans => trans.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      category: '',
      description: '',
      amount: 0,
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      notes: ''
    })
  }

  const getCategoryOptions = () => {
    return formData.type === 'income' ? incomeCategories : expenseCategories
  }

  // Generate monthly report
  const getMonthlyReport = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyIncome = transactions
      .filter(t => {
        const date = new Date(t.date)
        return t.type === 'income' && date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, t) => sum + t.amount, 0)

    const monthlyExpense = transactions
      .filter(t => {
        const date = new Date(t.date)
        return t.type === 'expense' && date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, t) => sum + t.amount, 0)

    return { monthlyIncome, monthlyExpense, monthlyProfit: monthlyIncome - monthlyExpense }
  }

  const monthlyReport = getMonthlyReport()

  return (
    <div>
      <Helmet>
        <title>Manajemen Keuangan - NexCube Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Keuangan</h1>
          <p className="text-slate-600 mt-2">Kelola pemasukan dan pengeluaran bisnis Anda</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            + Tambah Transaksi
          </button>
        )}
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Total Pemasukan</p>
          <p className="text-3xl font-bold text-green-600">Rp {totalIncome.toLocaleString('id-ID')}</p>
          <p className="text-xs text-slate-500 mt-2">Semua transaksi</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Total Pengeluaran</p>
          <p className="text-3xl font-bold text-red-600">Rp {totalExpense.toLocaleString('id-ID')}</p>
          <p className="text-xs text-slate-500 mt-2">Semua transaksi</p>
        </div>

        <div className={`rounded-2xl p-6 shadow-lg border ${netProfit >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'}`}>
          <p className="text-slate-600 text-sm mb-2">Net Profit</p>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            Rp {netProfit.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-slate-500 mt-2">Total tahun ini</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-blue-200">
          <p className="text-slate-600 text-sm mb-2">Bulan Ini</p>
          <div className="space-y-1 text-xs">
            <p className="text-green-700 font-bold">↑ Rp {monthlyReport.monthlyIncome.toLocaleString('id-ID')}</p>
            <p className="text-red-700 font-bold">↓ Rp {monthlyReport.monthlyExpense.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            {editingId ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipe <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Pemasukan</option>
                  <option value="expense">Pengeluaran</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  {getCategoryOptions().map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jumlah (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Metode Pembayaran
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="completed">Selesai</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi transaksi"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Catatan
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Catatan tambahan (opsional)"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {editingId ? 'Update Transaksi' : 'Tambah Transaksi'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-300 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Filter Transaksi</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Dari Tanggal</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sampai Tanggal</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setDateRange({ start: '', end: '' })}
              className="w-full px-4 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Deskripsi</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Metode</th>
                <th className="px-6 py-4 text-right text-sm font-bold">Jumlah</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900">{transaction.description}</div>
                      {transaction.notes && (
                        <div className="text-xs text-slate-500 mt-1">{transaction.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{transaction.paymentMethod}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-bold ${
                        transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        transaction.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {transaction.status === 'completed' ? 'Selesai' :
                         transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-bold hover:bg-red-200 transition-all"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada transaksi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Chart Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Ringkasan Bulanan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <span className="font-semibold text-green-700">Pemasukan Bulan Ini</span>
              <span className="text-2xl font-bold text-green-700">Rp {monthlyReport.monthlyIncome.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-200">
              <span className="font-semibold text-red-700">Pengeluaran Bulan Ini</span>
              <span className="text-2xl font-bold text-red-700">Rp {monthlyReport.monthlyExpense.toLocaleString('id-ID')}</span>
            </div>
            <div className={`flex justify-between items-center p-4 rounded-xl border ${
              monthlyReport.monthlyProfit >= 0
                ? 'bg-blue-50 border-blue-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <span className={`font-semibold ${monthlyReport.monthlyProfit >= 0 ? 'text-blue-700' : 'text-yellow-700'}`}>
                Profit Bulan Ini
              </span>
              <span className={`text-2xl font-bold ${monthlyReport.monthlyProfit >= 0 ? 'text-blue-700' : 'text-yellow-700'}`}>
                Rp {monthlyReport.monthlyProfit.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Statistik</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Transaksi</span>
              <span className="text-2xl font-bold text-slate-900">{transactions.length}</span>
            </div>
            <div className="h-px bg-slate-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Transaksi Pemasukan</span>
              <span className="text-lg font-bold text-green-700">{transactions.filter(t => t.type === 'income').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Transaksi Pengeluaran</span>
              <span className="text-lg font-bold text-red-700">{transactions.filter(t => t.type === 'expense').length}</span>
            </div>
            <div className="h-px bg-slate-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Rata-rata Pemasukan</span>
              <span className="text-lg font-bold text-blue-700">
                Rp {Math.round(totalIncome / Math.max(transactions.filter(t => t.type === 'income').length, 1)).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceManagement
