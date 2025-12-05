import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  totalAmount: number
  status: 'website' | 'desain' | 'fotografi' | 'lainnya'
  notes: string
}

export const InvoiceManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'PT Maju Bersama',
      clientEmail: 'info@majubersama.com',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      items: [
        { id: '1', description: 'Website Development', quantity: 1, unitPrice: 2000000 },
        { id: '2', description: 'UI/UX Design', quantity: 1, unitPrice: 1500000 }
      ],
      totalAmount: 3500000,
      status: 'website',
      notes: 'Thank you for your business'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'Karomah Food',
      clientEmail: 'karomah@email.com',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      items: [
        { id: '1', description: 'Menu Digital', quantity: 1, unitPrice: 1200000 }
      ],
      totalAmount: 1200000,
      status: 'desain',
      notes: ''
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('semua')

  // Generate invoice number otomatis
  const generateInvoiceNumber = () => {
    const currentYear = new Date().getFullYear()
    const invoiceCount = invoices.filter(inv => inv.invoiceNumber.includes(String(currentYear))).length + 1
    return `INV-${currentYear}-${String(invoiceCount).padStart(3, '0')}`
  }

  const [formData, setFormData] = useState<Omit<Invoice, 'id' | 'totalAmount'>>({
    invoiceNumber: generateInvoiceNumber(),
    clientName: '',
    clientEmail: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
    status: 'website',
    notes: ''
  })

  const filteredInvoices = filterStatus === 'semua'
    ? invoices
    : invoices.filter(inv => inv.status === filterStatus)

  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData(prev => ({ ...prev, items: newItems }))
  }

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0
    }
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }))
  }

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const totalAmount = calculateTotal(formData.items)

    if (editingId) {
      setInvoices(prev => prev.map(inv =>
        inv.id === editingId
          ? { ...inv, ...formData, totalAmount }
          : inv
      ))
      setEditingId(null)
    } else {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        ...formData,
        totalAmount
      }
      setInvoices(prev => [newInvoice, ...prev])
    }

    handleCancel()
  }

  const handleEdit = (invoice: Invoice) => {
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      items: invoice.items,
      status: invoice.status,
      notes: invoice.notes
    })
    setEditingId(invoice.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus invoice ini?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      clientName: '',
      clientEmail: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
      status: 'website',
      notes: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'website':
        return 'bg-blue-100 text-blue-700'
      case 'desain':
        return 'bg-rose-100 text-rose-700'
      case 'fotografi':
        return 'bg-purple-100 text-purple-700'
      case 'lainnya':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'website':
        return 'Website'
      case 'desain':
        return 'Desain Grafis'
      case 'fotografi':
        return 'Fotografi'
      case 'lainnya':
        return 'Lainnya'
      default:
        return status
    }
  }

  const currentTotal = calculateTotal(formData.items)

  return (
    <div>
      <Helmet>
        <title>Manajemen Invoice - NexCube Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Invoice</h1>
          <p className="text-slate-600 mt-2">Kelola invoice dan pembayaran klien</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            + Buat Invoice
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            {editingId ? 'Edit Invoice' : 'Buat Invoice Baru'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto-filled Invoice Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor Invoice
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 font-bold cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">⚡ Auto-generated</p>
              </div>

              {/* Kategori/Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kategori Layanan <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange(e, 'status')}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="website">Website</option>
                  <option value="desain">Desain Grafis</option>
                  <option value="fotografi">Fotografi</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Klien <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange(e, 'clientName')}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama klien"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Klien <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange(e, 'clientEmail')}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Invoice <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => handleInputChange(e, 'issueDate')}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Jatuh Tempo <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange(e, 'dueDate')}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Badge Display */}
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(formData.status)}`}>
                  📋 {getStatusLabel(formData.status)}
                </span>
                <p className="text-sm text-slate-600">Kategori invoice yang akan dibuat</p>
              </div>
            </div>

            {/* Items Section */}
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Item Invoice</h3>
              
              <div className="space-y-4 mb-4">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Deskripsi"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Harga"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', parseInt(e.target.value) || 0)}
                        min="0"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-slate-700 flex-1">
                        Rp {(item.quantity * item.unitPrice).toLocaleString('id-ID')}
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-bold hover:bg-red-200 transition-all"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="w-full px-4 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-100 transition-all"
              >
                + Tambah Item
              </button>
            </div>

            {/* Total */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="text-right">
                <p className="text-slate-600 mb-2">Total Amount:</p>
                <p className="text-3xl font-bold text-blue-700">
                  Rp {currentTotal.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Catatan
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange(e, 'notes')}
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Catatan atau pesan untuk klien"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {editingId ? 'Update Invoice' : 'Buat Invoice'}
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
      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="semua">Semua Kategori</option>
          <option value="website">Website</option>
          <option value="desain">Desain Grafis</option>
          <option value="fotografi">Fotografi</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">No. Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Klien</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Jumlah</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Kategori</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{invoice.clientName}</td>
                    <td className="px-6 py-4 text-slate-600">{invoice.issueDate}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      Rp {invoice.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
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
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada invoice
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Total Invoice</p>
          <p className="text-3xl font-bold text-slate-900">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Website</p>
          <p className="text-3xl font-bold text-blue-600">
            Rp {invoices.filter(i => i.status === 'website').reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString('id-ID')}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Desain Grafis</p>
          <p className="text-3xl font-bold text-rose-600">
            Rp {invoices.filter(i => i.status === 'desain').reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString('id-ID')}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">
            Rp {invoices.reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceManagement
