/**
 * Helper function untuk menghitung status paket berdasarkan tanggal mulai dan durasi
 * @param packageStartDate Tanggal mulai paket
 * @param packageDuration Durasi paket dalam bulan
 * @returns 'active' jika paket masih berlaku, 'inactive' jika sudah expired
 */
export const calculatePackageStatus = (
  packageStartDate: string | Date | null | undefined,
  packageDuration: number | null | undefined
): 'active' | 'inactive' | null => {
  // Jika tidak ada tanggal mulai atau durasi, status tidak bisa dihitung
  if (!packageStartDate || !packageDuration) {
    return null;
  }

  const startDate = new Date(packageStartDate);
  const endDate = new Date(startDate);
  
  // Tambahkan durasi bulan ke tanggal mulai
  endDate.setMonth(endDate.getMonth() + packageDuration);
  
  // Bandingkan dengan tanggal sekarang
  const now = new Date();
  
  // Jika hari ini sebelum atau sama dengan tanggal berakhir, paket aktif
  return now <= endDate ? 'active' : 'inactive';
};

/**
 * Helper function untuk mendapatkan informasi paket
 * @param packageStartDate Tanggal mulai paket
 * @param packageDuration Durasi paket dalam bulan
 * @returns Object berisi status, tanggal berakhir, dan sisa hari
 */
export const getPackageInfo = (
  packageStartDate: string | Date | null | undefined,
  packageDuration: number | null | undefined
) => {
  if (!packageStartDate || !packageDuration) {
    return {
      status: null,
      endDate: null,
      remainingDays: null,
      isExpired: null,
    };
  }

  const startDate = new Date(packageStartDate);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + packageDuration);

  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return {
    status: now <= endDate ? 'active' : 'inactive',
    endDate,
    remainingDays,
    isExpired: now > endDate,
  };
};

/**
 * Format tanggal ke format YYYY-MM-DD untuk input date
 */
export const formatDateForInput = (date: Date | string | null): string => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

/**
 * Format tanggal untuk display
 */
export const formatDateDisplay = (date: Date | string | null): string => {
  if (!date) return '-';
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return d.toLocaleDateString('id-ID', options);
};

/**
 * Duration options untuk dropdown
 */
export const DURATION_OPTIONS = [
  { value: 1, label: '1 Bulan' },
  { value: 2, label: '2 Bulan' },
  { value: 3, label: '3 Bulan' },
  { value: 4, label: '4 Bulan' },
  { value: 5, label: '5 Bulan' },
  { value: 6, label: '6 Bulan' },
  { value: 7, label: '7 Bulan' },
  { value: 8, label: '8 Bulan' },
  { value: 9, label: '9 Bulan' },
  { value: 10, label: '10 Bulan' },
  { value: 11, label: '11 Bulan' },
  { value: 12, label: '1 Tahun' },
];
