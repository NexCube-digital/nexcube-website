import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export const MenuKatalog: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGoBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const benefits = [
    {
      title: 'Tampilan Menarik',
      icon: '🎨',
      description: 'Desain yang eye-catching untuk menarik minat pelanggan'
    },
    {
      title: 'Mudah Diperbarui',
      icon: '🔄',
      description: 'Update menu atau produk dengan cepat tanpa perlu cetak ulang'
    },
    {
      title: 'Integrasi QR Code',
      icon: '📱',
      description: 'Akses menu/katalog dengan scan QR code untuk pengalaman seamless'
    },
    {
      title: 'Efisiensi Biaya',
      icon: '💰',
      description: 'Hemat biaya cetak jangka panjang dan ramah lingkungan'
    }
  ];

  const menuExamples = [
    {
      title: 'Menu Restaurant',
      image: '/images/services/menu-restaurant.jpg',
      desc: 'Menu digital untuk restoran dan cafe'
    },
    {
      title: 'Menu Coffee Shop',
      image: '/images/services/menu-coffee.jpg',
      desc: 'Tampilan khusus untuk coffee shop'
    }
  ];

  const catalogExamples = [
    {
      title: 'Katalog Fashion',
      image: '/images/services/catalog-fashion.jpg',
      desc: 'Katalog produk fashion dengan fitur filter'
    },
    {
      title: 'Katalog Furniture',
      image: '/images/services/catalog-furniture.jpg',
      desc: 'Showcase produk furniture dengan detail spesifikasi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white py-8 sm:py-16">
      <Helmet>
        <title>Menu & Katalog Digital - NexCube Digital</title>
        <meta name="description" content="Jasa pembuatan menu digital untuk restoran dan katalog produk online untuk bisnis retail dengan desain menarik dan QR code" />
      </Helmet>
      
      <div className="container">
        <button 
          onClick={handleGoBack}
          className={`inline-flex items-center text-accent mb-6 sm:mb-8 hover:underline transition-all group text-sm sm:text-base ${!isLoaded ? 'opacity-0' : 'animate-fadeInLeft'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali
        </button>
        
        <div className={`mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">Menu & Katalog Digital</h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Tingkatkan pengalaman pelanggan Anda dengan menu digital untuk restoran dan katalog produk online untuk bisnis retail.
            </p>
          </div>
          
          <div className="bg-white p-1 rounded-lg shadow-sm inline-flex mx-auto">
            <button 
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-3 rounded-md transition-all ${activeTab === 'menu' ? 'bg-accent text-white shadow-md' : 'text-slate-500 hover:text-accent'}`}
            >
              Menu Digital
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-6 py-3 rounded-md transition-all ${activeTab === 'catalog' ? 'bg-accent text-white shadow-md' : 'text-slate-500 hover:text-accent'}`}
            >
              Katalog Produk
            </button>
          </div>
        </div>
        
        {activeTab === 'menu' && (
          <div className={`mb-16 grid md:grid-cols-2 gap-8 items-center ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-200'}`}>
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Menu Digital</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Menu digital adalah solusi modern untuk restoran, cafe, dan bisnis F&B lainnya. Dengan menu digital, pelanggan Anda dapat dengan mudah melihat menu, gambar makanan, dan informasi detail seperti bahan dan alergen melalui smartphone mereka.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Menu dapat diakses melalui QR code yang ditempatkan di meja, sehingga mengurangi kontak fisik dan meningkatkan efisiensi operasional restoran Anda.
              </p>
              <div className="flex items-center gap-2 text-accent font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                </svg>
                <span>Perangkat Anda, Menu Kami</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/services/menu-digital-phone.jpg" 
                alt="Menu Digital pada Smartphone" 
                className="rounded-xl shadow-premium w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-accent text-white p-3 rounded-lg shadow-md">
                <div className="font-bold">QR Code</div>
                <div className="text-xs text-white/80">Scan & Lihat</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'catalog' && (
          <div className={`mb-16 grid md:grid-cols-2 gap-8 items-center ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-200'}`}>
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Katalog Produk</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Katalog produk digital memberikan showcase yang menarik untuk produk-produk Anda. Dengan fitur filter, search, dan kategori, pelanggan dapat dengan mudah menemukan produk yang mereka cari.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Katalog digital juga memungkinkan Anda menampilkan detail produk yang komprehensif, mulai dari spesifikasi hingga variasi yang tersedia, semua dalam format yang menarik dan interaktif.
              </p>
              <div className="flex items-center gap-2 text-accent font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span>Produk Anda, Dalam Genggaman</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/services/catalog-digital-tablet.jpg" 
                alt="Katalog Produk Digital pada Tablet" 
                className="rounded-xl shadow-premium w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-card">
                <div className="font-bold text-accent">100%</div>
                <div className="text-xs text-slate-500">Responsive</div>
              </div>
            </div>
          </div>
        )}
        
        <div className={`p-8 sm:p-10 bg-white rounded-xl shadow-card mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-400'}`}>
          <h2 className="text-2xl font-heading font-semibold mb-8 text-center">Keuntungan Menu & Katalog Digital</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title} 
                className={`text-center ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}
                style={{ animationDelay: `${500 + (index * 100)}ms` }}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-heading font-medium text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-500'}`}>
          <h2 className="text-2xl font-heading font-semibold mb-8 text-center">Contoh Karya</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {(activeTab === 'menu' ? menuExamples : catalogExamples).map((example, index) => (
              <div 
                key={example.title}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-300"
              >
                <img 
                  src={example.image} 
                  alt={example.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading font-medium text-lg mb-2">{example.title}</h3>
                  <p className="text-slate-500">{example.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`bg-gradient-premium rounded-xl p-8 md:p-12 text-white ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-600'}`}>
          <div className="md:flex justify-between items-center">
            <div className="md:max-w-lg">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {activeTab === 'menu' ? 'Siap untuk digitalisasi menu?' : 'Butuh katalog produk digital?'}
              </h2>
              <p className="text-slate-200">
                Konsultasikan kebutuhan {activeTab === 'menu' ? 'menu digital' : 'katalog produk'} Anda dengan tim kami. Kami akan membantu Anda menciptakan pengalaman digital yang optimal untuk pelanggan.
              </p>
            </div>
            <div className="flex gap-4 mt-8 md:mt-0">
              <Link to="/paket" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-all">
                Lihat Paket Harga
              </Link>
              <Link to="/contact" className="border border-white/50 hover:border-white text-white px-6 py-3 rounded-md font-medium transition-all">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuKatalog
