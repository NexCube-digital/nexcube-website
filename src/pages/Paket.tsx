import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { PricingCard } from '../ui/PricingCard'

export const Paket: React.FC = () => {
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

  return (
    <div className="min-h-screen py-8 sm:py-16 bg-gradient-to-b from-slate-50/50 to-white">
      <Helmet>
        <title>Paket Website - NexCube Digital</title>
        <meta name="description" content="Pilihan paket website NexCube Digital mulai dari paket mahasiswa hingga platinum untuk kebutuhan bisnis Anda" />
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

        <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp'}`}>
          <h1 className="text-2xl sm:text-3xl font-heading font-semibold">Paket Website</h1>
          <p className="text-slate-500 mt-3 sm:mt-4 text-base sm:text-lg">
            Pilih paket sesuai kebutuhan — dari paket mahasiswa hingga solusi lengkap berskala enterprise.
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-8 ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-200'}`}>
          <PricingCard 
            tier="Student" 
            price="Rp 300.000" 
            features={["Paket khusus untuk mahasiswa. Ideal untuk portofolio personal atau tugas kuliah dengan kebutuhan website sederhana."]} 
            accent="bg-gradient-to-br from-blue-50 to-white" 
            badge="Khusus Mahasiswa"
          />
          <PricingCard 
            tier="Bronze" 
            price="Rp 800.000" 
            features={["Awal Kehadiran Digital. Ideal untuk individu atau bisnis yang baru memasuki ruang online dan membutuhkan website company profile dasar yang efisien."]} 
            accent="bg-slate-50" 
          />
          <PricingCard 
            tier="Silver" 
            price="Rp 1.200.000" 
            features={["Pembangunan Brand dan Kepercayaan. Dirancang untuk pebisnis yang serius membangun citra digital yang kuat dan otoritatif."]} 
            accent="bg-white"
          />
          <PricingCard 
            tier="Gold" 
            price="Rp 2.000.000" 
            features={["Kompleksitas Layanan Tinggi. Ditujukan bagi perusahaan dengan beragam produk atau layanan yang membutuhkan struktur konten yang luas."]} 
            accent="bg-gradient-to-br from-gold-light to-white" 
            popular={true}
          />
          <PricingCard 
            tier="Platinum" 
            price="Rp 5.000.000" 
            features={["Kontrol Penuh & Kepemilikan Aset. Pilihan ideal bagi klien yang ingin memiliki kendali penuh atas infrastruktur, kode sumber, dan data."]} 
            accent="bg-gradient-to-br from-slate-800 to-slate-850 text-white" 
          />
        </div>

        <div className={`mt-12 bg-white p-6 md:p-10 rounded-xl shadow-card ${!isLoaded ? 'opacity-0' : 'animate-fadeInUp delay-500'}`}>
          <h2 className="text-xl font-heading font-semibold mb-6">Pertanyaan Umum tentang Paket Website</h2>
          
          <div className="space-y-4">
            <details className="group border-b pb-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Apa perbedaan utama antar paket?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <p className="text-slate-500 mt-4">
                Perbedaan utama antar paket mencakup jumlah halaman/konten, fitur tambahan seperti akses admin, domain premium, email bisnis, serta kompleksitas desain dan integrasi yang ditawarkan. Semakin tinggi tier paket, semakin banyak fitur dan fleksibilitas yang Anda dapatkan.
              </p>
            </details>
            
            <details className="group border-b pb-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Apakah ada biaya tersembunyi?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <p className="text-slate-500 mt-4">
                Tidak ada biaya tersembunyi. Harga yang tercantum sudah termasuk domain dan hosting untuk tahun pertama. Perpanjangan tahunan akan diinformasikan menjelang masa berakhir layanan.
              </p>
            </details>
            
            <details className="group border-b pb-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Bagaimana cara memulai?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <p className="text-slate-500 mt-4">
                Pilih paket yang sesuai dengan kebutuhan Anda, lalu klik "Detail Paket" untuk melihat informasi lengkap. Setelah itu, Anda dapat menghubungi kami melalui tombol "Pesan Paket Ini" atau melalui halaman kontak untuk memulai diskusi lebih lanjut.
              </p>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Bagaimana jika kebutuhan saya khusus?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" width="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <p className="text-slate-500 mt-4">
                Kami juga menyediakan layanan custom yang dapat disesuaikan dengan kebutuhan spesifik bisnis Anda. Silakan hubungi tim kami untuk konsultasi dan penawaran khusus.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paket;
