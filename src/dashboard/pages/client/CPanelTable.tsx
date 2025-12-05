import React, { useState } from 'react'
import { Contact } from '../../../services/api'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { Toast, ToastType } from '../../../components/Toast'
import { calculatePackageStatus, getPackageInfo } from '../../../utils/packageStatus'

interface CPanelTableProps {
  clients: Contact[];
  onUpdate: (clientId: number, cpanelData: any) => Promise<void>;
  loading?: boolean;
  onEditClient?: (client: Contact) => void;
  onDeleteClient?: (clientId: number) => Promise<void>;
  onViewDetail?: (client: Contact) => void;
}

export const CPanelTable: React.FC<CPanelTableProps> = ({ 
  clients, 
  onUpdate, 
  loading = false,
  onEditClient,
  onDeleteClient,
  onViewDetail
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteClientId, setDeleteClientId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (clientId: number) => {
    setDeleteClientId(clientId)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteClientId && onDeleteClient) {
      try {
        setIsDeleting(true)
        await onDeleteClient(deleteClientId)
        setToast({ message: 'Klien berhasil dihapus', type: 'success' })
      } catch (error: any) {
        setToast({ message: error.message || 'Gagal menghapus klien', type: 'error' })
      } finally {
        setIsDeleting(false)
        setShowDeleteConfirm(false)
        setDeleteClientId(null)
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeleteClientId(null)
  }

  const filteredClients = Array.isArray(clients) ? clients : []

  if (filteredClients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-slate-600 font-medium">Belum ada klien</p>
        <p className="text-slate-500 text-sm mt-2">Tambahkan klien terlebih dahulu</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Klien
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Kontak
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Status Paket
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Hosting cPanel
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Aksi
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredClients.map((client, index) => (
              <tr key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {/* Client Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {client.name?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <p className="font-semibold text-slate-900 truncate">{client.name}</p>
                  </div>
                </td>

                {/* Email & Phone */}
                <td className="px-6 py-4">
                  <p className="text-slate-600 text-sm truncate">{client.email}</p>
                  <p className="text-slate-500 text-xs">{client.phone || '-'}</p>
                </td>

                {/* Status Paket */}
                <td className="px-6 py-4">
                  {client.packageStartDate && client.packageDuration ? (
                    <div className="text-sm space-y-1">
                      {(() => {
                        const status = calculatePackageStatus(client.packageStartDate, client.packageDuration);
                        const info = getPackageInfo(client.packageStartDate, client.packageDuration);
                        return (
                          <>
                            <p className="font-semibold">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {status === 'active' ? 'AKTIF' : 'TIDAK AKTIF'}
                              </span>
                            </p>
                            {info.endDate && (
                              <p className="text-xs text-slate-600">Berakhir: {new Date(info.endDate).toLocaleDateString('id-ID')}</p>
                            )}
                            {info.remainingDays !== null && info.remainingDays > 0 && (
                              <p className="text-xs text-slate-600">Sisa: {info.remainingDays} hari</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm">-</span>
                  )}
                </td>

                {/* cPanel Section */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {client.cpanelUrl ? (
                      <a 
                        href={client.cpanelUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 break-all"
                      >
                        {client.cpanelUrl}
                      </a>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                    {client.cpanelUsername && (
                      <p className="text-slate-600 font-mono text-xs mt-1">{client.cpanelUsername}</p>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => onEditClient && onEditClient(client)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg hover:bg-purple-200 disabled:opacity-50 transition-colors"
                      title="Edit semua data klien"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.id)}
                      disabled={loading || isDeleting}
                      className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200 disabled:opacity-50 transition-colors"
                      title="Hapus klien"
                    >
                      {isDeleting && deleteClientId === client.id ? 'Menghapus...' : 'Delete'}
                    </button>
                    <button
                      onClick={() => onViewDetail && onViewDetail(client)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors"
                      title="Lihat detail"
                    >
                      Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Hapus Klien"
        message={`Apakah Anda yakin ingin menghapus klien ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default CPanelTable
