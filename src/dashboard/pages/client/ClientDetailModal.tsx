import React from 'react'
import { Contact } from '../../../services/api'

interface ClientDetailModalProps {
  isOpen: boolean;
  client: Contact | null;
  onClose: () => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, client, onClose }) => {
  if (!isOpen || !client) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'read': return 'bg-yellow-100 text-yellow-700';
      case 'responded': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'responded': return 'Responded';
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      default: return status;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
              <p className="text-blue-100 text-sm mt-1">{client.email}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Status</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(client.status)}`}>
                {getStatusLabel(client.status)}
              </span>
            </div>

            {/* Client Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Informasi Klien</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Perusahaan</p>
                  <p className="font-semibold text-slate-900">{client.company || '-'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Nomor Telepon</p>
                  <p className="font-semibold text-slate-900">{client.phone || '-'}</p>
                </div>
              </div>
            </div>

            {/* Description/Message */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Deskripsi</h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-700 whitespace-pre-wrap">{client.message}</p>
              </div>
            </div>

            {/* cPanel Info */}
            {(client.cpanelUrl || client.cpanelUsername || client.cpanelPassword) && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Informasi Hosting cPanel</h3>
                <div className="space-y-3">
                  {client.cpanelUrl && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">URL cPanel</p>
                      <a 
                        href={client.cpanelUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-mono text-sm break-all"
                      >
                        {client.cpanelUrl}
                      </a>
                    </div>
                  )}
                  {client.cpanelUsername && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">Username</p>
                      <p className="font-mono text-slate-900">{client.cpanelUsername}</p>
                    </div>
                  )}
                  {client.cpanelPassword && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">Password</p>
                      <p className="font-mono text-slate-900">{'●'.repeat(Math.min(client.cpanelPassword.length, 12))}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-6 border-t border-slate-200 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="bg-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-400 transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetailModal;
