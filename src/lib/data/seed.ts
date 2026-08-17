import type { Destination, Vehicle, TourPackage, FAQ, Review, SiteSettings } from '@/types/database';

// ============================================================
// SITE SETTINGS
// ============================================================
export const siteSettings: SiteSettings = {
  site_name: 'Lombok Nusa Alam Tour & Travel',
  tagline: 'Tour And Travel',
  phone: '+6281907855550',
  whatsapp: '6281907855550',
  email: 'hello@lomboknusaalam.com',
  address: 'Jl. Raya Senggigi No. 123, West Lombok, NTB 83355, Indonesia',
  instagram: 'https://instagram.com/lomboknusaalam',
  facebook: '',
  google_maps: '',
  logo: '/logo.png',
};

// ============================================================
// DESTINATIONS (master — setiap destinasi SATU KALI)
// ============================================================
export const destinations: Destination[] = [
  {
    id: 'dest-001', slug: 'desa-sade', name: 'Desa Adat Sade', description: 'Desa tradisional suku Sasak yang masih menjaga adat istiadat dan rumah-rumah khas dengan lantai dari kotoran kerbau.', category: 'culture', location: 'Lombok Tengah', latitude: -8.8943, longitude: 116.3276, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/desa adat sade.jpg', gallery: [], seo_title: 'Desa Adat Sade Lombok', seo_description: 'Kunjungi Desa Adat Sade, desa tradisional suku Sasak di Lombok', is_active: true, display_order: 1,
  },
  {
    id: 'dest-002', slug: 'sirkuit-mandalika', name: 'Sirkuit Mandalika', description: 'Sirkuit balap internasional bertaraf dunia yang menjadi tuan rumah MotoGP dan WSBK.', category: 'culture', location: 'Kuta Mandalika', latitude: -8.8946, longitude: 116.3247, opening_hours: '08:00 - 17:00', entrance_fee: 'Gratis', cover_image: '/destinations/sirkuit mandalika.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 2,
  },
  {
    id: 'dest-003', slug: 'pantai-kuta-lombok', name: 'Pantai Kuta Lombok', description: 'Pantai dengan pasir putih dan air biru jernih, berbeda dari Kuta Bali. Salah satu pantai terindah di Lombok.', category: 'beach', location: 'Kuta Mandalika', latitude: -8.8975, longitude: 116.2918, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/Pantai Kuta.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 3,
  },
  {
    id: 'dest-004', slug: 'bukit-merese', name: 'Bukit Merese', description: 'Bukit dengan pemandangan 360 derajat ke laut dan pantai. Spot terbaik untuk menikmati sunset di Lombok Selatan.', category: 'mountain', location: 'Lombok Tengah', latitude: -8.9058, longitude: 116.2857, opening_hours: '24 Jam', entrance_fee: 'Rp 5.000', cover_image: '/destinations/bukit merese.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 4,
  },
  {
    id: 'dest-005', slug: 'tanjung-aan', name: 'Pantai Tanjung Aan', description: 'Pantai dengan dua jenis pasir — halus dan butiran merica. Teluk yang tenang cocok untuk berenang.', category: 'beach', location: 'Lombok Tengah', latitude: -8.9021, longitude: 116.3105, opening_hours: '24 Jam', entrance_fee: 'Rp 5.000', cover_image: '/destinations/pantai tanjung aan.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 5,
  },
  {
    id: 'dest-006', slug: 'selong-belanak', name: 'Pantai Selong Belanak', description: 'Pantai berbentuk bulan sabit dengan pasir putih lembut dan ombak tenang, cocok untuk surfing pemula.', category: 'beach', location: 'Lombok Tengah', latitude: -8.8723, longitude: 116.1874, opening_hours: '24 Jam', entrance_fee: 'Rp 5.000', cover_image: '/destinations/Selong belanak.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 6,
  },
  {
    id: 'dest-007', slug: 'pantai-mawun', name: 'Pantai Mawun', description: 'Pantai tersembunyi di antara dua bukit hijau dengan air jernih berwarna toska.', category: 'beach', location: 'Lombok Tengah', latitude: -8.8697, longitude: 116.2107, opening_hours: '24 Jam', entrance_fee: 'Rp 5.000', cover_image: '/destinations/pantai mawun.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 7,
  },
  {
    id: 'dest-008', slug: 'islamic-center-ntb', name: 'Islamic Center NTB', description: 'Masjid megah yang menjadi ikon kota Mataram dengan arsitektur modern dan kubah emas yang indah.', category: 'culture', location: 'Mataram', latitude: -8.5920, longitude: 116.1150, opening_hours: '08:00 - 21:00', entrance_fee: 'Gratis', cover_image: '/destinations/Islamic Center.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 8,
  },
  {
    id: 'dest-009', slug: 'monkey-forest', name: 'Monkey Forest', description: 'Hutan lindung dengan ratusan monyet liar yang jinak dan pepohonan rindang.', category: 'culture', location: 'Baun Pusuk', latitude: -8.5489, longitude: 116.1503, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Monkey Forest.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 9,
  },
  {
    id: 'dest-010', slug: 'bukit-malimbu', name: 'Bukit Malimbu', description: 'Bukit dengan pemandangan laut dan tiga Gili dari ketinggian. Spot foto favorit wisatawan.', category: 'mountain', location: 'Lombok Utara', latitude: -8.4842, longitude: 116.0752, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/Bukit malimbu.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 10,
  },
  {
    id: 'dest-011', slug: 'pantai-senggigi', name: 'Pantai Senggigi', description: 'Pantai wisata paling terkenal di Lombok dengan sunset indah dan deretan hotel & restoran.', category: 'beach', location: 'Senggigi', latitude: -8.4889, longitude: 116.0442, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/Pantai Senggigi.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 11,
  },
  {
    id: 'dest-012', slug: 'taman-narmada', name: 'Taman Narmada', description: 'Istana air peninggalan kerajaan Karangasem dengan kolam dan taman yang indah.', category: 'culture', location: 'Narmada, Lombok Barat', latitude: -8.5816, longitude: 116.2121, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Taman Narmada.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 12,
  },
  {
    id: 'dest-013', slug: 'masjid-bayan-kuno', name: 'Masjid Bayan Kuno', description: 'Masjid tertua di Lombok yang dibangun abad ke-16, terbuat dari bambu dan alang-alang.', category: 'culture', location: 'Bayan, Lombok Utara', latitude: -8.3550, longitude: 116.3820, opening_hours: '08:00 - 17:00', entrance_fee: 'Donasi', cover_image: '/destinations/Masjid Bayan Kuno.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 13,
  },
  {
    id: 'dest-014', slug: 'bukit-selong', name: 'Bukit Selong', description: 'Bukit dengan pemandangan sawah terasering yang ikonik di Sembalun. Salah satu viewpoint terbaik di Lombok.', category: 'mountain', location: 'Sembalun, Lombok Timur', latitude: -8.4645, longitude: 116.4900, opening_hours: '06:00 - 18:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Bukit Selong Sembalun.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 14,
  },
  {
    id: 'dest-015', slug: 'taman-surga', name: 'Taman Surga', description: 'Taman bunga dan kebun stroberi di kawasan Sembalun dengan udara sejuk pegunungan.', category: 'mountain', location: 'Sembalun', latitude: -8.4700, longitude: 116.4950, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 15.000', cover_image: '/destinations/Taman Surga Sembalun.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 15,
  },
  {
    id: 'dest-016', slug: 'pusuk-sembalun', name: 'Pusuk Sembalun', description: 'Jalan berkelok di pegunungan dengan pemandangan lembah hijau dan kabut. Sering dijumpai monyet liar.', category: 'mountain', location: 'Sembalun', latitude: -8.4500, longitude: 116.4200, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/Pusuk Sembalun.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 16,
  },
  {
    id: 'dest-017', slug: 'gili-nanggu', name: 'Gili Nanggu', description: 'Pulau kecil yang tenang di barat daya Lombok dengan snorkeling spot yang luar biasa.', category: 'island', location: 'Sekotong, Lombok Barat', latitude: -8.7460, longitude: 115.9750, opening_hours: '24 Jam', entrance_fee: 'Rp 25.000', cover_image: '/destinations/Gili Nanggu.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 17,
  },
  {
    id: 'dest-018', slug: 'gili-kedis', name: 'Gili Kedis', description: 'Pulau terkecil di gugusan gili Sekotong, bisa dikelilingi dalam 15 menit jalan kaki.', category: 'island', location: 'Sekotong, Lombok Barat', latitude: -8.7500, longitude: 115.9700, opening_hours: '24 Jam', entrance_fee: 'Termasuk paket boat', cover_image: '/destinations/Gili Kedis.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 18,
  },
  {
    id: 'dest-019', slug: 'gili-sudak', name: 'Gili Sudak', description: 'Pulau dengan pasir putih dan air jernih, cocok untuk snorkeling dan relaksasi.', category: 'island', location: 'Sekotong, Lombok Barat', latitude: -8.7520, longitude: 115.9680, opening_hours: '24 Jam', entrance_fee: 'Termasuk paket boat', cover_image: '/destinations/Gili Sudak.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 19,
  },
  {
    id: 'dest-020', slug: 'benang-stokel', name: 'Air Terjun Benang Stokel', description: 'Air terjun bertingkat yang megah di tengah hutan tropis Lombok Tengah.', category: 'waterfall', location: 'Aik Berik, Lombok Tengah', latitude: -8.6240, longitude: 116.3450, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Air Terjun Benang Stokel.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 20,
  },
  {
    id: 'dest-021', slug: 'benang-kelambu', name: 'Air Terjun Benang Kelambu', description: 'Air terjun unik berbentuk tirai dengan beberapa aliran air yang jatuh dari tebing berlumut.', category: 'waterfall', location: 'Aik Berik, Lombok Tengah', latitude: -8.6250, longitude: 116.3460, opening_hours: '08:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Air Terjun Benang Kelambu.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 21,
  },
  {
    id: 'dest-022', slug: 'gili-kondo', name: 'Gili Kondo', description: 'Pulau kecil di timur Lombok dengan terumbu karang yang masih alami dan air sangat jernih.', category: 'island', location: 'Lombok Timur', latitude: -8.4700, longitude: 116.6800, opening_hours: '24 Jam', entrance_fee: 'Rp 15.000', cover_image: '/destinations/Gili Kondo.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 22,
  },
  {
    id: 'dest-023', slug: 'gili-pasir', name: 'Gili Pasir', description: 'Gosong pasir yang muncul saat air surut di tengah laut. Fenomena alam yang unik.', category: 'island', location: 'Lombok Timur', latitude: -8.4720, longitude: 116.6850, opening_hours: 'Tergantung surut', entrance_fee: 'Termasuk paket boat', cover_image: '/destinations/Gili Pasir.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 23,
  },
  {
    id: 'dest-024', slug: 'gili-kapal', name: 'Gili Kapal', description: 'Pulau sangat kecil tak berpenghuni berbentuk kapal dilihat dari udara.', category: 'island', location: 'Lombok Timur', latitude: -8.4730, longitude: 116.6860, opening_hours: '24 Jam', entrance_fee: 'Termasuk paket boat', cover_image: '/destinations/gili kapal.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 24,
  },
  {
    id: 'dest-025', slug: 'sendang-gile', name: 'Air Terjun Sendang Gile', description: 'Air terjun setinggi 31 meter di kaki Gunung Rinjani dengan aliran air yang deras dan megah.', category: 'waterfall', location: 'Senaru, Lombok Utara', latitude: -8.3920, longitude: 116.4080, opening_hours: '07:00 - 17:00', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Air Terjun Sendang Gile.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 25,
  },
  {
    id: 'dest-026', slug: 'tiu-kelep', name: 'Air Terjun Tiu Kelep', description: 'Air terjun spektakuler bertingkat yang dikelilingi hutan hujan tropis dan kolam alami.', category: 'waterfall', location: 'Senaru, Lombok Utara', latitude: -8.3930, longitude: 116.4100, opening_hours: '07:00 - 17:00', entrance_fee: 'Termasuk tiket Sendang Gile', cover_image: '/destinations/Air Terjun Tiu Kelep.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 26,
  },
  {
    id: 'dest-027', slug: 'pantai-pink', name: 'Pantai Pink', description: 'Pantai dengan pasir berwarna merah muda, satu dari tujuh pantai pink di dunia.', category: 'beach', location: 'Lombok Timur', latitude: -8.8320, longitude: 116.6900, opening_hours: '24 Jam', entrance_fee: 'Rp 10.000', cover_image: '/destinations/Pantai Pink.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 27,
  },
  {
    id: 'dest-028', slug: 'pantai-kura-kura', name: 'Pantai Kura-Kura', description: 'Pantai liar dengan tebing dan pemandangan laut yang dramatis di pesisir timur Lombok.', category: 'beach', location: 'Lombok Timur', latitude: -8.8350, longitude: 116.6920, opening_hours: '24 Jam', entrance_fee: 'Rp 5.000', cover_image: '/destinations/Pantai Kura kura.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 28,
  },
  {
    id: 'dest-029', slug: 'strawberry-garden', name: 'Kebun Stroberi Sembalun', description: 'Kebun stroberi di dataran tinggi Sembalun. Bisa petik stroberi segar langsung dari kebun (musiman).', category: 'mountain', location: 'Sembalun', latitude: -8.4680, longitude: 116.4920, opening_hours: '08:00 - 16:00', entrance_fee: 'Rp 15.000', cover_image: '/destinations/Kebun Strauberry Sembalun.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 29,
  },
  {
    id: 'dest-030', slug: 'tete-batu', name: 'Tete Batu', description: 'Desa wisata di lereng Rinjani dengan pemandangan sawah terasering, air terjun, dan suasana pedesaan yang asri.', category: 'mountain', location: 'Lombok Timur', latitude: -8.5300, longitude: 116.4200, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/tete batu.jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 30,
  },
  {
    id: 'dest-031', slug: 'ekas', name: 'Pantai Ekas', description: 'Teluk tersembunyi di selatan Lombok Timur dengan ombak surfing kelas dunia dan pemandangan tebing dramatis.', category: 'beach', location: 'Lombok Timur', latitude: -8.8600, longitude: 116.5200, opening_hours: '24 Jam', entrance_fee: 'Gratis', cover_image: '/destinations/Pantai Ekas .jpg', gallery: [], seo_title: null, seo_description: null, is_active: true, display_order: 31,
  },
];

// ============================================================
// VEHICLES
// ============================================================
export const vehicles: Vehicle[] = [
  {
    id: 'veh-001', name: 'Toyota All New Avanza', slug: 'all-new-avanza',
    photo: '/vehicles/avanza-new.jpg',
    seat_capacity: 4, luggage_capacity: 2, daily_price: 500000,
    description: 'MPV modern dengan desain baru, kabin luas dan nyaman untuk grup kecil dan keluarga.',
    features: ['AC', 'Sopir Profesional', 'BBM', 'Air Mineral'], is_active: true, display_order: 1,
  },
  {
    id: 'veh-002', name: 'Honda BR-V', slug: 'brv',
    photo: '/vehicles/brv.jpg',
    seat_capacity: 4, luggage_capacity: 2, daily_price: 450000,
    description: 'SUV compact stylish dengan kabin nyaman, cocok untuk tur dan transfer.',
    features: ['AC', 'Sopir Profesional', 'BBM', 'Air Mineral'], is_active: true, display_order: 2,
  },
  {
    id: 'veh-003', name: 'Toyota HiAce', slug: 'hiace',
    photo: 'https://images.pexels.com/photos/37498790/pexels-photo-37498790.jpeg?auto=compress&cs=tinysrgb&w=800',
    seat_capacity: 15, luggage_capacity: 8, daily_price: 1200000,
    description: 'Minibus luas untuk rombongan besar, wisata perusahaan, dan transfer acara.',
    features: ['AC', 'Sopir Profesional', 'BBM', 'Air Mineral', 'Kursi Reclining'], is_active: true, display_order: 3,
  },
];

// ============================================================
// TOUR PACKAGES
// ============================================================
export const tourPackages: TourPackage[] = [
  {
    id: 'tour-001', slug: 'sasak-tour', name: 'Sasak Tour', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '8-10 jam', meeting_time: '08:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/desa adat sade.jpg',
    gallery: [], description: 'Jelajahi jantung budaya Lombok — kunjungi Desa Adat Sade yang bersejarah, lihat Sirkuit Mandalika berkelas dunia, bersantai di Pantai Kuta yang memukau, nikmati panorama dari Bukit Merese, dan berenang di Pantai Tanjung Aan.',
    description_en: 'Explore the cultural heart of Lombok — visit the ancient Sade Traditional Village, see the world-class Mandalika Circuit, relax at the stunning Kuta Beach, enjoy panoramic views from Merese Hill, and swim at beautiful Tanjung Aan Beach.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '09:00', activity: 'Desa Adat Sade' },
      { time: '10:30', activity: 'Sirkuit Mandalika' },
      { time: '12:00', activity: 'Pantai Kuta & Makan Siang' },
      { time: '14:00', activity: 'Bukit Merese' },
      { time: '15:30', activity: 'Pantai Tanjung Aan' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: 'Paket untuk 1 mobil (max 4 orang). Lebih dari 4 orang dikenakan biaya tambahan.',
    cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: true, is_popular: true, display_order: 1,
    seo_title: 'Sasak Tour Lombok — Desa Sade, Mandalika, Kuta Beach', seo_description: 'Tour budaya Sasak di Lombok. Kunjungi Desa Sade, Sirkuit Mandalika, Pantai Kuta, Bukit Merese, dan Tanjung Aan. Rp800.000/grup.', seo_keywords: ['sasak tour', 'desa sade', 'tour lombok'],
    destinations: destinations.filter(d => ['dest-001','dest-002','dest-003','dest-004','dest-005'].includes(d.id)),
  },
  {
    id: 'tour-002', slug: 'tour-pantai', name: 'Tour Pantai', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '8-10 jam', meeting_time: '08:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/Pantai Kuta.jpg',
    gallery: [], description: 'Rasakan pantai-pantai terbaik Lombok Selatan dalam satu hari — lengkungan pirus Selong Belanak, surga tersembunyi Pantai Mawun, Pantai Kuta yang ikonik, Tanjung Aan yang jernih, dan sunset emas dari Bukit Merese.',
    description_en: 'Experience the best beaches of South Lombok in one unforgettable day — the turquoise crescent of Selong Belanak, hidden paradise of Mawun Beach, iconic Kuta Beach, crystal-clear Tanjung Aan, and golden sunset views from Merese Hill.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '09:30', activity: 'Pantai Selong Belanak' },
      { time: '11:00', activity: 'Pantai Mawun' },
      { time: '12:30', activity: 'Pantai Kuta & Makan Siang' },
      { time: '14:00', activity: 'Pantai Tanjung Aan' },
      { time: '15:30', activity: 'Bukit Merese (Sunset)' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: null, cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: true, is_popular: true, display_order: 2,
    seo_title: 'Tour Pantai Lombok Selatan', seo_description: 'Tour pantai terbaik di Lombok Selatan.', seo_keywords: ['tour pantai', 'selong belanak', 'mawun'],
    destinations: destinations.filter(d => ['dest-006','dest-007','dest-003','dest-005','dest-004'].includes(d.id)),
  },
  {
    id: 'tour-003', slug: 'tour-kota-mataram', name: 'Tour Kota Mataram', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '8-10 jam', meeting_time: '08:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/Islamic Center.jpg',
    gallery: [], description: 'Temukan ibu kota NTB — kunjungi Islamic Center NTB yang megah, jelajahi Monkey Forest, nikmati pemandangan pesisir dari Bukit Malimbu, berjalan di Pantai Senggigi, dan susuri istana air bersejarah Taman Narmada.',
    description_en: 'Discover the capital city of NTB — visit the magnificent Islamic Center NTB, explore Monkey Forest, take in coastal views from Malimbu Hill, stroll along Senggigi Beach, and wander through the historic Taman Narmada water palace.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '09:00', activity: 'Islamic Center NTB' },
      { time: '10:30', activity: 'Monkey Forest (Pusuk)' },
      { time: '12:00', activity: 'Bukit Malimbu' },
      { time: '13:00', activity: 'Pantai Senggigi & Makan Siang' },
      { time: '15:00', activity: 'Taman Narmada' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: null, cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: false, display_order: 3,
    seo_title: 'Tour Kota Mataram Lombok', seo_description: 'Tour kota Mataram, ibu kota NTB.', seo_keywords: ['mataram', 'islamic center', 'senggigi'],
    destinations: destinations.filter(d => ['dest-008','dest-009','dest-010','dest-011','dest-012'].includes(d.id)),
  },
  {
    id: 'tour-004', slug: 'tour-sembalun', name: 'Tour Sembalun', category: 'daily_tour',
    price: 850000, price_usd: 53, duration: '10-12 jam', meeting_time: '07:00', finish_time: '18:00', max_passenger: 4,
    cover_image: '/destinations/Pusuk Sembalun.jpg',
    gallery: [], description: 'Jelajahi dataran tinggi Lombok Utara — telusuri Monkey Forest, kunjungi Masjid Bayan Kuno, nikmati pemandangan dari Bukit Selong, jalan-jalan di Taman Surga, petik stroberi segar, dan nikmati jalur indah Pusuk Sembalun.',
    description_en: 'Venture into the highlands of North Lombok — explore Monkey Forest, visit the ancient Bayan Mosque, soak in breathtaking views from Bukit Selong, wander through Taman Surga, pick fresh strawberries, and enjoy the scenic Pusuk Sembalun pass.',
    itinerary: [
      { time: '07:00', activity: 'Jemput di Hotel' },
      { time: '08:30', activity: 'Monkey Forest' },
      { time: '10:00', activity: 'Masjid Bayan Kuno' },
      { time: '11:30', activity: 'Bukit Selong' },
      { time: '13:00', activity: 'Makan Siang' },
      { time: '14:00', activity: 'Taman Surga & Kebun Stroberi' },
      { time: '15:30', activity: 'Pusuk Sembalun' },
      { time: '18:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: 'Perjalanan lebih panjang, disarankan berangkat pagi.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: true, display_order: 4,
    seo_title: 'Tour Sembalun Lombok', seo_description: 'Tour dataran tinggi Sembalun, Lombok.', seo_keywords: ['sembalun', 'bukit selong', 'rinjani'],
    destinations: destinations.filter(d => ['dest-009','dest-013','dest-014','dest-015','dest-029','dest-016'].includes(d.id)),
  },
  {
    id: 'tour-005', slug: 'tour-sekotong-barat', name: 'Tour Sekotong Barat', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '8-10 jam', meeting_time: '08:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/Gili Nanggu.jpg',
    gallery: [], description: 'Jelajahi pulau-pulau barat daya Lombok yang masih perawan — snorkeling di air jernih Gili Nanggu, bersantai di surga kecil Gili Kedis, dan telusuri keindahan alami Gili Sudak.',
    description_en: 'Island-hop across the pristine southwest islands of Lombok — snorkel in crystal-clear waters at Gili Nanggu, relax on the tiny paradise of Gili Kedis, and explore the untouched beauty of Gili Sudak.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '10:00', activity: 'Pelabuhan Sekotong — naik boat' },
      { time: '10:30', activity: 'Gili Nanggu (Snorkeling)' },
      { time: '12:30', activity: 'Gili Kedis' },
      { time: '14:00', activity: 'Gili Sudak & Makan Siang' },
      { time: '15:30', activity: 'Kembali ke pelabuhan' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Sewa Boat', 'Alat Snorkeling', 'Makan Siang'],
    additional_info: 'Biaya boat & snorkeling terpisah (sekitar Rp 150.000-250.000/orang).', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: false, display_order: 5,
    seo_title: 'Tour Sekotong Barat Lombok', seo_description: 'Tour island hopping Gili Nanggu, Kedis, Sudak.', seo_keywords: ['sekotong', 'gili nanggu', 'snorkeling'],
    destinations: destinations.filter(d => ['dest-017','dest-018','dest-019'].includes(d.id)),
  },
  {
    id: 'tour-006', slug: 'tour-air-terjun-1', name: 'Tour Air Terjun I', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '6-8 jam', meeting_time: '08:00', finish_time: '15:00', max_passenger: 4,
    cover_image: '/destinations/Air Terjun Benang Stokel.jpg',
    gallery: [], description: 'Telusuri hutan tropis yang rimbun untuk menemukan dua air terjun terindah Lombok — Benang Stokel yang megah bertingkat dan Benang Kelambu yang eksotis bak tirai.',
    description_en: 'Journey through lush tropical forests to discover two of Lombok\'s most breathtaking waterfalls — the majestic multi-tiered Benang Stokel and the ethereal curtain-like Benang Kelambu.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '09:30', activity: 'Air Terjun Benang Stokel' },
      { time: '11:30', activity: 'Air Terjun Benang Kelambu' },
      { time: '13:00', activity: 'Makan Siang' },
      { time: '15:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: 'Trek ringan menuju air terjun (15-20 menit). Bawa sepatu nyaman.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: false, display_order: 6,
    seo_title: 'Tour Air Terjun Benang Stokel & Kelambu', seo_description: 'Tour air terjun di Lombok Tengah.', seo_keywords: ['air terjun', 'benang stokel', 'benang kelambu'],
    destinations: destinations.filter(d => ['dest-020','dest-021'].includes(d.id)),
  },
  {
    id: 'tour-007', slug: 'tour-wisata-lotim', name: 'Tour Wisata Lotim', category: 'daily_tour',
    price: 900000, price_usd: 56, duration: '8-10 jam', meeting_time: '07:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/Gili Kondo.jpg',
    gallery: [], description: 'Temukan surga tersembunyi Lombok Timur — kunjungi Gili Kondo yang menakjubkan dengan terumbu karang, berjalan di atas gosong pasir ajaib Gili Pasir, dan jelajahi Gili Kapal yang tak berpenghuni.',
    description_en: 'Discover the hidden paradise of East Lombok — visit the stunning Gili Kondo with its pristine coral reefs, walk on the magical sandbar of Gili Pasir, and explore the tiny uninhabited Gili Kapal.',
    itinerary: [
      { time: '07:00', activity: 'Jemput di Hotel' },
      { time: '09:30', activity: 'Pelabuhan — naik boat' },
      { time: '10:00', activity: 'Gili Kondo (Snorkeling)' },
      { time: '12:00', activity: 'Gili Pasir' },
      { time: '13:30', activity: 'Gili Kapal & Makan Siang' },
      { time: '15:00', activity: 'Kembali ke pelabuhan' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Sewa Boat', 'Alat Snorkeling', 'Makan Siang'],
    additional_info: 'Biaya boat terpisah.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: false, display_order: 7,
    seo_title: 'Tour Wisata Lombok Timur', seo_description: 'Tour pulau di Lombok Timur.', seo_keywords: ['gili kondo', 'gili pasir', 'lombok timur'],
    destinations: destinations.filter(d => ['dest-022','dest-023','dest-024'].includes(d.id)),
  },
  {
    id: 'tour-008', slug: 'tour-air-terjun-2', name: 'Tour Air Terjun II', category: 'daily_tour',
    price: 800000, price_usd: 50, duration: '8-10 jam', meeting_time: '07:00', finish_time: '16:00', max_passenger: 4,
    cover_image: '/destinations/Air Terjun Sendang Gile.jpg',
    gallery: [], description: 'Trekking ke air terjun kembar legendaris di kaki Gunung Rinjani — Air Terjun Sendang Gile setinggi 31 meter dan Tiu Kelep yang spektakuler bertingkat, dikelilingi hutan hujan tropis.',
    description_en: 'Trek to the legendary twin waterfalls at the foot of Mount Rinjani — the thundering 31-meter Sendang Gile waterfall and the spectacular multi-tiered Tiu Kelep, surrounded by lush tropical rainforest.',
    itinerary: [
      { time: '07:00', activity: 'Jemput di Hotel' },
      { time: '09:30', activity: 'Air Terjun Sendang Gile' },
      { time: '11:00', activity: 'Trekking ke Tiu Kelep' },
      { time: '13:00', activity: 'Makan Siang di Senaru' },
      { time: '14:30', activity: 'Perjalanan pulang' },
      { time: '16:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Guide Lokal', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: 'Trek medium ke Tiu Kelep (~45 menit). Wajib pakai sepatu trekking.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: true, is_popular: false, display_order: 8,
    seo_title: 'Tour Air Terjun Sendang Gile & Tiu Kelep', seo_description: 'Tour air terjun di kaki Rinjani.', seo_keywords: ['sendang gile', 'tiu kelep', 'air terjun rinjani'],
    destinations: destinations.filter(d => ['dest-025','dest-026'].includes(d.id)),
  },
  {
    id: 'tour-009', slug: 'tour-pantai-lotim', name: 'Tour Pantai Lombok Timur', category: 'daily_tour',
    price: 900000, price_usd: 56, duration: '10-12 jam', meeting_time: '07:00', finish_time: '18:00', max_passenger: 4,
    cover_image: '/destinations/Pantai Pink.jpg',
    gallery: [], description: 'Jelajahi pesisir timur Lombok yang eksotis — kunjungi Pantai Pink yang terkenal dengan pasir berwarna merah muda, temukan keindahan liar Pantai Kura-Kura, dan nikmati teluk tersembunyi Ekas.',
    description_en: 'Explore the exotic eastern coast of Lombok — visit the famous Pink Beach with its unique pink-colored sand, discover the wild beauty of Turtle Beach, and enjoy the hidden bay of Ekas.',
    itinerary: [
      { time: '07:00', activity: 'Jemput di Hotel' },
      { time: '10:00', activity: 'Pantai Pink' },
      { time: '12:00', activity: 'Pantai Kura-Kura & Makan Siang' },
      { time: '14:00', activity: 'Pantai Ekas' },
      { time: '15:30', activity: 'Perjalanan pulang' },
      { time: '18:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Sewa Boat (jika perlu)', 'Makan Siang'],
    additional_info: 'Perjalanan cukup jauh (~3 jam dari Senggigi). Berangkat pagi.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: false, is_popular: true, display_order: 9,
    seo_title: 'Tour Pantai Pink Lombok Timur', seo_description: 'Tour Pantai Pink, Kura-Kura, dan Ekas di Lombok Timur.', seo_keywords: ['pantai pink', 'pink beach', 'ekas', 'lombok timur'],
    destinations: destinations.filter(d => ['dest-027','dest-028','dest-031'].includes(d.id)),
  },
  {
    id: 'tour-010', slug: 'tour-tete-batu', name: 'Paket Explore Tete Batu', category: 'daily_tour',
    price: 2000000, price_usd: 125, duration: '8-10 jam', meeting_time: '08:00', finish_time: '17:00', max_passenger: 4,
    cover_image: '/destinations/tete batu.jpg',
    gallery: [], description: 'Nikmati keindahan desa wisata Tete Batu di lereng Gunung Rinjani — sawah terasering hijau, udara sejuk pegunungan, air terjun tersembunyi, dan kehidupan pedesaan Sasak yang autentik.',
    description_en: 'Enjoy the beauty of Tete Batu village on the slopes of Mount Rinjani — lush green rice terraces, cool mountain air, hidden waterfalls, and authentic Sasak rural life.',
    itinerary: [
      { time: '08:00', activity: 'Jemput di Hotel' },
      { time: '10:00', activity: 'Tete Batu — Jalan-jalan sawah' },
      { time: '11:30', activity: 'Air Terjun Jeruk Manis' },
      { time: '13:00', activity: 'Makan Siang di Warung Lokal' },
      { time: '14:30', activity: 'Taman Wisata Tete Batu' },
      { time: '16:00', activity: 'Perjalanan pulang' },
      { time: '17:00', activity: 'Kembali ke Hotel' },
    ],
    includes: ['Sopir Profesional', 'BBM', 'Air Mineral', 'Parkir'],
    excludes: ['Tiket Masuk', 'Makan Siang', 'Pengeluaran Pribadi'],
    additional_info: 'Udara sejuk di Tete Batu, bawa jaket tipis.', cancellation_policy: 'Gratis pembatalan hingga 24 jam sebelum tour.',
    status: 'active', is_featured: true, is_popular: false, display_order: 10,
    seo_title: 'Paket Explore Tete Batu Lombok', seo_description: 'Tour desa wisata Tete Batu di lereng Rinjani.', seo_keywords: ['tete batu', 'desa wisata', 'rinjani'],
    destinations: destinations.filter(d => ['dest-030'].includes(d.id)),
  },
];

// ============================================================
// FAQ
// ============================================================
export const faqs: FAQ[] = [
  { id: 'faq-001', question: 'Apakah harga tour sudah termasuk tiket masuk?', answer: 'Belum. Harga paket sudah termasuk sopir profesional, BBM, air mineral, dan parkir. Tiket masuk destinasi, makan siang, dan pengeluaran pribadi ditanggung sendiri.', category: 'booking', display_order: 1, is_active: true },
  { id: 'faq-002', question: 'Berapa maksimal penumpang per mobil?', answer: 'Toyota Avanza dan Avanza Veloz maksimal 4 penumpang. Toyota HiAce maksimal 15 penumpang. Untuk grup besar, kami bisa siapkan lebih dari 1 kendaraan.', category: 'vehicle', display_order: 2, is_active: true },
  { id: 'faq-003', question: 'Apakah bisa custom rute perjalanan?', answer: 'Tentu! Kami menyediakan layanan Custom Tour. Anda pilih destinasi sendiri dan kami yang atur rute, waktu, dan kendaraan yang sesuai.', category: 'booking', display_order: 3, is_active: true },
  { id: 'faq-004', question: 'Bagaimana cara pembayaran?', answer: 'Kami menerima pembayaran via transfer bank, QRIS, dan tunai. Untuk booking, cukup bayar deposit 30%, sisanya dibayar sebelum atau saat hari tour.', category: 'payment', display_order: 4, is_active: true },
  { id: 'faq-005', question: 'Apakah bisa jemput di bandara?', answer: 'Ya, kami melayani jemput di Bandara Internasional Lombok (BIL), hotel, pelabuhan, atau lokasi lain sesuai permintaan.', category: 'booking', display_order: 5, is_active: true },
  { id: 'faq-006', question: 'Apakah sopir bisa berbahasa Inggris?', answer: 'Beberapa sopir kami bisa berbahasa Inggris dasar. Untuk kebutuhan guide berbahasa asing, bisa diatur terpisah.', category: 'general', display_order: 6, is_active: true },
  { id: 'faq-007', question: 'Bagaimana kebijakan pembatalan?', answer: 'Pembatalan gratis hingga 24 jam sebelum jadwal tour. Pembatalan kurang dari 24 jam dikenakan biaya 50% dari total harga.', category: 'booking', display_order: 7, is_active: true },
  { id: 'faq-008', question: 'Apakah tersedia child seat?', answer: 'Ya, child seat tersedia gratis atas permintaan saat booking. Harap informasikan usia anak saat pemesanan.', category: 'vehicle', display_order: 8, is_active: true },
];

// ============================================================
// SAMPLE REVIEWS
// ============================================================
export const reviews: Review[] = [
  { id: 'rev-001', booking_id: null, customer_id: null, tour_id: 'tour-001', rating: 5, comment: 'Tour Sasak sangat menyenangkan! Sopirnya ramah dan berpengalaman. Desa Sade sangat menarik dan Pantai Tanjung Aan indah sekali.', photos: [], is_approved: true, created_at: '2026-07-15T10:00:00Z', customer: { id: 'c1', name: 'Sarah Mitchell', email: null, phone: '+61', country: 'Australia', language: 'en' } },
  { id: 'rev-002', booking_id: null, customer_id: null, tour_id: 'tour-002', rating: 5, comment: 'Best beach tour ever! Selong Belanak is paradise. The driver knew all the best photo spots. Highly recommended!', photos: [], is_approved: true, created_at: '2026-07-20T10:00:00Z', customer: { id: 'c2', name: 'Thomas Weber', email: null, phone: '+49', country: 'Germany', language: 'en' } },
  { id: 'rev-003', booking_id: null, customer_id: null, tour_id: 'tour-008', rating: 5, comment: 'Air terjun Tiu Kelep luar biasa! Treknya seru tapi worth it. Sopirnya juga sabar nunggu kami trekking cukup lama.', photos: [], is_approved: true, created_at: '2026-07-25T10:00:00Z', customer: { id: 'c3', name: 'Rizal Pratama', email: null, phone: '+62', country: 'Indonesia', language: 'id' } },
  { id: 'rev-004', booking_id: null, customer_id: null, tour_id: 'tour-009', rating: 5, comment: 'Pink Beach is absolutely stunning. Long drive but totally worth it. Lombok Nusa Alam made it very comfortable.', photos: [], is_approved: true, created_at: '2026-07-28T10:00:00Z', customer: { id: 'c4', name: 'Yuki Tanaka', email: null, phone: '+81', country: 'Japan', language: 'en' } },
  { id: 'rev-005', booking_id: null, customer_id: null, tour_id: 'tour-004', rating: 5, comment: 'Pemandangan dari Bukit Selong luar biasa indah! Sawah terasering dengan latar Gunung Rinjani. Wajib dikunjungi!', photos: [], is_approved: true, created_at: '2026-08-01T10:00:00Z', customer: { id: 'c5', name: 'Mei Lin', email: null, phone: '+65', country: 'Singapore', language: 'en' } },
];
