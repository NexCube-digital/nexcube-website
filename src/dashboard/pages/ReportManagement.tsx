import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import html2pdf from 'html2pdf.js'

interface ReportData {
  type: 'clients' | 'invoices' | 'finance'
  dateRange: {
    start: string
    end: string
  }
  data: any[]
}

export const ReportManagement: React.FC = () => {
  const [reportType, setReportType] = useState<'clients' | 'invoices' | 'finance'>('clients')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  // Dummy data untuk laporan
  const clientsData = [
    { id: '1', name: 'PT Maju Bersama', email: 'info@majubersama.com', phone: '+62 812 3456 7890', company: 'PT Maju Bersama', status: 'aktif', createdAt: '2024-01-15' },
    { id: '2', name: 'Karomah Food', email: 'karomah@email.com', phone: '+62 813 4567 8901', company: 'Karomah Food', status: 'aktif', createdAt: '2024-01-20' }
  ]

  const invoicesData = [
    { id: '1', invoiceNumber: 'INV-2024-001', clientName: 'PT Maju Bersama', totalAmount: 3500000, status: 'website', issueDate: '2024-01-15', dueDate: '2024-02-15' },
    { id: '2', invoiceNumber: 'INV-2024-002', clientName: 'Karomah Food', totalAmount: 1200000, status: 'desain', issueDate: '2024-01-20', dueDate: '2024-02-20' }
  ]

  const financeData = [
    { id: '1', date: '2024-01-20', type: 'income', category: 'Project Payment', description: 'Website Development - PT Maju Bersama', amount: 2000000, status: 'completed' },
    { id: '2', date: '2024-01-19', type: 'expense', category: 'Operational', description: 'Sewa Kantor Januari', amount: 500000, status: 'completed' }
  ]

  const handleGeneratePDF = () => {
    if (!reportRef.current) return

    setIsGenerating(true)

    const element = reportRef.current
    const opt = {
      margin: 10,
      filename: `report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' }
    }

    html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false)
    })
  }

  const handlePrint = () => {
    if (!reportRef.current) return

    const printWindow = window.open('', '', 'height=600,width=800')
    if (printWindow) {
      printWindow.document.write(reportRef.current.innerHTML)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div>
      <Helmet>
        <title>Laporan - NexCube Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Laporan & Cetak</h1>
        <p className="text-slate-600 mt-2">Generate dan cetak laporan data bisnis Anda</p>
      </div>

      {/* Report Generation Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Buat Laporan</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipe Laporan <span className="text-red-500">*</span>
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'clients' | 'invoices' | 'finance')}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="clients">Laporan Klien</option>
              <option value="invoices">Laporan Invoice</option>
              <option value="finance">Laporan Keuangan</option>
            </select>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Dari Tanggal
            </label>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sampai Tanggal
            </label>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 overflow-auto" ref={reportRef} style={{ maxHeight: '70vh' }}>
        {/* Report Header */}
        <div className="text-center mb-8 pb-8 border-b-2 border-slate-300">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">NexCube Digital</h1>
          <p className="text-slate-600">Laporan {reportType === 'clients' ? 'Klien' : reportType === 'invoices' ? 'Invoice' : 'Keuangan'}</p>
          {dateStart && dateEnd && (
            <p className="text-slate-500 text-sm mt-2">
              Periode: {formatDate(dateStart)} - {formatDate(dateEnd)}
            </p>
          )}
          <p className="text-slate-500 text-xs mt-2">Tanggal Laporan: {formatDate(new Date().toISOString().split('T')[0])}</p>
        </div>

        {/* Report Content - Clients */}
        {reportType === 'clients' && (
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="px-4 py-2 text-left font-bold text-slate-800">No.</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Nama</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Email</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Telepon</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Perusahaan</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client, index) => (
                  <tr key={client.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-2 text-slate-700">{index + 1}</td>
                    <td className="px-4 py-2 text-slate-700 font-medium">{client.name}</td>
                    <td className="px-4 py-2 text-slate-600">{client.email}</td>
                    <td className="px-4 py-2 text-slate-600">{client.phone}</td>
                    <td className="px-4 py-2 text-slate-600">{client.company}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        client.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {client.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700"><strong>Total Klien:</strong> {clientsData.length}</p>
              <p className="text-sm text-slate-700"><strong>Klien Aktif:</strong> {clientsData.filter(c => c.status === 'aktif').length}</p>
            </div>
          </div>
        )}

        {/* Report Content - Invoices */}
        {reportType === 'invoices' && (
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="px-4 py-2 text-left font-bold text-slate-800">No.</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">No. Invoice</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Klien</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Tanggal</th>
                  <th className="px-4 py-2 text-right font-bold text-slate-800">Jumlah</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoicesData.map((invoice, index) => (
                  <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-2 text-slate-700">{index + 1}</td>
                    <td className="px-4 py-2 text-slate-700 font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-2 text-slate-600">{invoice.clientName}</td>
                    <td className="px-4 py-2 text-slate-600">{invoice.issueDate}</td>
                    <td className="px-4 py-2 text-right text-slate-700 font-semibold">{formatCurrency(invoice.totalAmount)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        invoice.status === 'website' ? 'bg-blue-100 text-blue-700' :
                        invoice.status === 'desain' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {invoice.status === 'website' ? 'Website' : invoice.status === 'desain' ? 'Desain' : 'Lainnya'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700"><strong>Total Invoice:</strong> {invoicesData.length}</p>
              <p className="text-sm text-slate-700"><strong>Total Revenue:</strong> {formatCurrency(invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0))}</p>
            </div>
          </div>
        )}

        {/* Report Content - Finance */}
        {reportType === 'finance' && (
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="px-4 py-2 text-left font-bold text-slate-800">No.</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Tanggal</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Tipe</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Kategori</th>
                  <th className="px-4 py-2 text-left font-bold text-slate-800">Deskripsi</th>
                  <th className="px-4 py-2 text-right font-bold text-slate-800">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {financeData.map((transaction, index) => (
                  <tr key={transaction.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-2 text-slate-700">{index + 1}</td>
                    <td className="px-4 py-2 text-slate-600">{transaction.date}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-600">{transaction.category}</td>
                    <td className="px-4 py-2 text-slate-600">{transaction.description}</td>
                    <td className="px-4 py-2 text-right font-semibold" style={{ color: transaction.type === 'income' ? '#10b981' : '#ef4444' }}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-2">
              <p className="text-sm text-slate-700"><strong>Total Pemasukan:</strong> <span className="text-green-700 font-bold">{formatCurrency(financeData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}</span></p>
              <p className="text-sm text-slate-700"><strong>Total Pengeluaran:</strong> <span className="text-red-700 font-bold">{formatCurrency(financeData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}</span></p>
              <p className="text-sm text-slate-700 pt-2 border-t border-slate-200"><strong>Net Profit:</strong> <span className="text-blue-700 font-bold">{formatCurrency(financeData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - financeData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}</span></p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-slate-300 text-center text-xs text-slate-500">
          <p>Laporan ini dihasilkan oleh sistem NexCube Digital</p>
          <p>© {new Date().getFullYear()} NexCube Digital. All Rights Reserved.</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips Penggunaan:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Pilih tipe laporan yang ingin Anda buat</li>
          <li>Atur rentang tanggal untuk filter data (opsional)</li>
          <li>Klik "Cetak" untuk mencetak langsung ke printer</li>
          <li>Klik "Download PDF" untuk menyimpan laporan sebagai file PDF</li>
          <li>Laporan dapat digunakan untuk dokumentasi atau presentasi</li>
        </ul>
      </div>
    </div>
  )
}

export default ReportManagement
