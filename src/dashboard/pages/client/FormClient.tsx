import React from 'react'
import { Contact } from '../../../services/api'
import { formatDateForInput, DURATION_OPTIONS, calculatePackageStatus, getPackageInfo } from '../../../utils/packageStatus'

interface FormClientProps {
  formData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
  editingId: string | null;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

export const FormClient: React.FC<FormClientProps> = ({
  formData,
  editingId,
  loading,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">
        {editingId ? 'Edit Klien' : 'Tambah Klien Baru'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Client Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nama Kontak <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nama perusahaan"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pesan/Kebutuhan <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onInputChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jelaskan kebutuhan atau pesan"
            />
          </div>
        </div>

        {/* Package Status Section */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Status Paket Klien</h3>
          <p className="text-sm text-slate-600 mb-4">Atur tanggal mulai dan durasi paket untuk kalkulasi status otomatis</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tanggal Mulai Paket
              </label>
              <input
                type="date"
                name="packageStartDate"
                value={formatDateForInput(formData.packageStartDate ?? null)}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">Pilih tanggal paket dimulai</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Durasi Paket
              </label>
              <select
                name="packageDuration"
                value={formData.packageDuration || ''}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih durasi...</option>
                {DURATION_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">Durasi paket dalam bulan</p>
            </div>
          </div>

          {/* Package Status Info Display */}
          {formData.packageStartDate && formData.packageDuration && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              {(() => {
                const status = calculatePackageStatus(formData.packageStartDate, formData.packageDuration);
                const info = getPackageInfo(formData.packageStartDate, formData.packageDuration);
                return (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Status Paket: 
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                        status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {status === 'active' ? 'AKTIF' : 'TIDAK AKTIF'}
                      </span>
                    </p>
                    {info.endDate && (
                      <>
                        <p className="text-sm text-slate-600">
                          Berakhir: <span className="font-semibold">{new Date(info.endDate).toLocaleDateString('id-ID')}</span>
                        </p>
                        {info.remainingDays !== null && info.remainingDays > 0 && (
                          <p className="text-sm text-slate-600">
                            Sisa: <span className="font-semibold">{info.remainingDays} hari</span>
                          </p>
                        )}
                        {info.remainingDays !== null && info.remainingDays <= 0 && (
                          <p className="text-sm text-red-600">
                            Paket telah berakhir
                          </p>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* cPanel Hosting Section */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Informasi Hosting cPanel</h3>
          <p className="text-sm text-slate-600 mb-4">Opsional - Tambahkan informasi hosting cPanel klien</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                URL cPanel
              </label>
              <input
                type="url"
                name="cpanelUrl"
                value={formData.cpanelUrl || ''}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com:2083"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username cPanel
              </label>
              <input
                type="text"
                name="cpanelUsername"
                value={formData.cpanelUsername || ''}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password cPanel
              </label>
              <input
                type="password"
                name="cpanelPassword"
                value={formData.cpanelPassword || ''}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-slate-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {editingId ? 'Update Klien' : 'Tambah Klien'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-300 transition-all disabled:opacity-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormClient
