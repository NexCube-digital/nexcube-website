import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export const UndanganDigital: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  const featuredExamples = [
    {
      title: 'Undangan Pernikahan Modern',
      image: '/images/services/undangan-pernikahan.jpg',
      desc: 'Undangan digital dengan animasi dan fitur RSVP online'
    },
    {
      title: 'Undangan Ulang Tahun',
      image: '/images/services/undangan-ultah.jpg',
      desc: 'Desain playful dengan countdown timer dan lokasi maps'
    },
    {
      title: 'Undangan Gathering Perusahaan',
      image: '/images/services/undangan-corporate.jpg',
      desc: 'Tampilan profesional dengan fitur konfirmasi kehadiran'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white py-8 sm:py-16">
      <Helmet>
        <title>Undangan Digital - NexCube Digital</title>
        <meta name="description" content="Layanan pembuatan undangan digital interaktif untuk pernikahan, ulang tahun, dan acara perusahaan dengan fitur RSVP dan lokasi maps" />
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
        
        <div className={`grid md:grid-cols-2 gap-8 items-center mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}>
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold mb-4">Undangan Digital</h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Undangan digital interaktif dengan tampilan menarik untuk berbagai acara. Dari pernikahan hingga acara perusahaan, kami membuat undangan yang bisa dibagikan dengan mudah.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex mt-1.5 items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Fitur RSVP online untuk memudahkan konfirmasi kehadiran</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex mt-1.5 items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Peta lokasi acara terintegrasi dengan Google Maps</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex mt-1.5 items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Countdown timer hingga tanggal acara</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex mt-1.5 items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Galeri foto yang bisa disesuaikan</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/paket" className="btn-primary">
                Lihat Paket Harga
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/services/undangan-showcase.jpg" 
              alt="Undangan Digital Showcase" 
              className="rounded-xl shadow-premium w-full h-auto object-cover"
            />
            <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-card">
              <div className="text-accent font-bold text-xl">+100</div>
              <div className="text-xs text-slate-500">Template Desain</div>
            </div>
          </div>
        </div>
        
        <div className={`mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-200'}`}>
          <h2 className="text-2xl font-heading font-semibold mb-10 text-center">Contoh Undangan Digital</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredExamples.map((example, index) => (
              <div 
                key={example.title}
                className={`rounded-xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-300 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}
                style={{ animationDelay: `${400 + (index * 150)}ms` }}
              >
                <img 
                  src={example.image} 
                  alt={example.title} 
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-heading font-medium text-lg mb-2">{example.title}</h3>
                  <p className="text-slate-500 text-sm">{example.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`p-8 sm:p-10 bg-white rounded-xl shadow-card mb-16 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-400'}`}>
          <h2 className="text-2xl font-heading font-semibold mb-6">Proses Pengerjaan</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { title: 'Konsultasi', icon: '💬' },
              { title: 'Desain', icon: '🎨' },
              { title: 'Revisi', icon: '📝' },
              { title: 'Integrasi Fitur', icon: '⚙️' },
              { title: 'Deployment', icon: '🚀' }
            ].map((step, index) => (
              <div 
                key={step.title} 
                className={`text-center p-4 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}
                style={{ animationDelay: `${500 + (index * 100)}ms` }}
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-medium">{step.title}</h3>
                <div className="relative mt-6">
                  {index < 4 && (
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`bg-gradient-premium rounded-xl p-8 md:p-12 text-white ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-600'}`}>
          <div className="md:flex justify-between items-center">
            <div className="md:max-w-lg">
              <h2 className="text-2xl font-heading font-semibold mb-4">Siap untuk membuat undangan?</h2>
              <p className="text-slate-200">
                Konsultasikan kebutuhan undangan digital Anda dengan tim kami. Kami siap membuat undangan yang sesuai dengan acara spesial Anda.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <Link to="/contact" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium inline-block transition-all">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UndanganDigital
