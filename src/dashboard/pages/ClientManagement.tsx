import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  status: 'aktif' | 'tidak-aktif'
  createdAt: string
}

export const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'PT Maju Bersama',
      email: 'info@majubersama.com',
      phone: '+62 812 3456 7890',
      company: 'PT Maju Bersama',
      address: 'Jl. Ahmad Yani No. 123, Bandung',
      status: 'aktif',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Karomah Food',
      email: 'karomah@email.com',
      phone: '+62 813 4567 8901',
      company: 'Karomah Food',
      address: 'Jl. Gatot Subroto No. 456, Bandung',
      status: 'aktif',
      createdAt: '2024-01-20'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'aktif'
  })

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setClients(prev => prev.map(client =>
        client.id === editingId
          ? { ...client, ...formData }
          : client
      ))
      setEditingId(null)
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setClients(prev => [newClient, ...prev])
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      status: 'aktif'
    })
    setShowForm(false)
  }

  const handleEdit = (client: Client) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
      status: client.status
    })
    setEditingId(client.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      setClients(prev => prev.filter(client => client.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      status: 'aktif'
    })
  }

  return (
    <div>
      <Helmet>
        <title>Manajemen Klien - NexCube Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Klien</h1>
          <p className="text-slate-600 mt-2">Kelola data klien dan informasi kontak</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            + Tambah Klien
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            {editingId ? 'Edit Klien' : 'Tambah Klien Baru'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Kontak <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama perusahaan"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Alamat lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="aktif">Aktif</option>
                  <option value="tidak-aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {editingId ? 'Update Klien' : 'Tambah Klien'}
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

      {/* Search & Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Cari klien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Telepon</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Perusahaan</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{client.email}</td>
                    <td className="px-6 py-4 text-slate-600">{client.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{client.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        client.status === 'aktif'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {client.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(client)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
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
                    Tidak ada data klien
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Total Klien</p>
          <p className="text-3xl font-bold text-slate-900">{clients.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Klien Aktif</p>
          <p className="text-3xl font-bold text-green-600">{clients.filter(c => c.status === 'aktif').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <p className="text-slate-600 text-sm mb-2">Klien Tidak Aktif</p>
          <p className="text-3xl font-bold text-red-600">{clients.filter(c => c.status === 'tidak-aktif').length}</p>
        </div>
      </div>
    </div>
  )
}

export default ClientManagement
