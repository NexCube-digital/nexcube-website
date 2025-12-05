import React, { useState, useEffect } from 'react'
import apiClient, { User } from '../../services/api'

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getProfile()
        if (response.success && response.data) {
          // response.data is already the user (getProfile extracts it)
          const userData = response.data as User
          console.log('Fetched user profile:', userData)
          setUser(userData)
          setFormData({
            name: userData.name || '',
            email: userData.email || ''
          })
        } else {
          setError('Gagal memuat data profile')
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err)
        setError(err.message || 'Terjadi kesalahan saat memuat profile')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      // TODO: Implement update profile API
      console.log('Saving profile:', formData)
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan profile')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile Saya</h1>
        <p className="text-slate-600 mt-2">Kelola informasi akun Anda</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12 flex items-end justify-between">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg border-4 border-white">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold">{user?.name}</h2>
              <p className="text-blue-100">{user?.email}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* User Info Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Informasi Dasar</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900 font-medium">{user?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-900 font-medium">{user?.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Account Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Informasi Akun</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ID User</label>
                    <p className="text-slate-900 font-medium">{user?.id}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                        {user?.role || 'user'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${user?.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-slate-900 font-medium">
                        {user?.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Waktu Akun</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bergabung</label>
                <p className="text-slate-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Terakhir Diupdate</label>
                <p className="text-slate-900">
                  {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || ''
                  })
                }}
                className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
