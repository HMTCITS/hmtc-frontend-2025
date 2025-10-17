// Static content and configuration for the Magang recruitment flow

// Divisions shown in the selection grid (updated)
export const DIVISIONS = [
  { id: 'ed', name: 'Enterpreneurship Development (ED)', iconId: 'Rocket' },
  { id: 'sti', name: 'Student Talent and Interest (STI)', iconId: 'Star' },
  { id: 'ia', name: 'Internal Affairs (IA)', iconId: 'Users' },
  { id: 'ea', name: 'External Affairs (EA)', iconId: 'Globe' },
  { id: 'cmi', name: 'Creative Media Information (CMI)', iconId: 'Film' },
  {
    id: 'srd',
    name: 'Student Resources Development (SRD)',
    iconId: 'GraduationCap',
  },
  { id: 'ssd', name: 'Student Social Development (SSD)', iconId: 'Heart' },
  {
    id: 'swrd',
    name: 'Student Welfare and Research Technology (SWRD)',
    iconId: 'Cpu',
  },
  { id: 'bpi', name: 'Badan Pengurus Inti (BPI)', iconId: 'Crown' },
] as const;

// General questions on the main form
export const GENERAL_QUESTIONS = [
  'Ceritakan pengalaman atau inisiatif Anda yang paling membanggakan dan mengapa itu berarti bagi Anda.',
  'Apa tantangan terbesar yang pernah Anda hadapi dalam tim? Bagaimana Anda mengatasinya?',
  'Mengapa Anda tertarik bergabung dengan HMTC 2025 dan apa kontribusi unik Anda?',
] as const;

// Division specific step texts
export const DIVISION_QUESTIONS_TITLE = 'Pertanyaan Khusus Divisi';
export const DIVISION_QUESTION_PLACEHOLDER =
  'Bagikan pemikiran mendalam Anda tentang pertanyaan ini...';

// Per-division specific question sets. Each division id maps to an array of questions
export const DIVISION_QUESTIONS = {
  ed: [
    'Paparkan ide usaha atau inisiatif kewirausahaan yang pernah Anda jalankan atau rancang. Apa nilai uniknya?',
    'Bagaimana langkah Anda memvalidasi pasar dan pelanggan? Jelaskan metode dan temuannya.',
    'Sebutkan model bisnis yang Anda pilih dan alasannya. Bagaimana alur pendapatan dibangun?',
    'Jelaskan traction/kemajuan yang sudah ada (contoh: user awal, pre-order, MoU, dsb.).',
    'Rancang garis besar go-to-market plan dalam 3 bulan ke depan.',
  ],
  sti: [
    'Bakat/minat apa yang ingin Anda kembangkan di STI? Jelaskan latar belakang Anda.',
    'Ceritakan pengalaman mengorganisir kegiatan komunitas/kompetisi terkait minat bakat.',
    'Bagaimana Anda merancang program pembinaan (timeline, target, evaluasi) untuk talenta?',
    'Strategi Anda untuk meningkatkan partisipasi dan keberlanjutan komunitas?',
    'Bagaimana Anda mengukur dampak program terhadap talenta dan komunitas?',
  ],
  ia: [
    'Apa yang menurut Anda esensial untuk menjaga budaya dan kohesi internal organisasi?',
    'Bagaimana Anda menyusun SOP internal yang efektif? Beri contoh kasus.',
    'Sebutkan pengalaman menyelesaikan konflik internal dan pembelajaran kuncinya.',
    'Bagaimana memastikan dokumentasi/arsip internal rapi dan mudah diakses?',
    'Rancang inisiatif internal untuk meningkatkan kolaborasi lintas divisi.',
  ],
  ea: [
    'Ceritakan pengalaman Anda menjalin kemitraan eksternal (kampus/industri/komunitas).',
    'Bagaimana Anda menyusun proposal/penawaran nilai agar menarik bagi mitra?',
    'Strategi negosiasi yang pernah Anda lakukan dan hasilnya?',
    'Rancang rencana aktivasi kolaborasi yang saling menguntungkan.',
    'Bagaimana Anda menjaga hubungan jangka panjang dan melakukan follow-up?',
  ],
  cmi: [
    'Tunjukkan karya kreatif terbaik Anda dan jelaskan konsep kreatif di baliknya.',
    'Rancang kalender konten 1 bulan (platform, format, tujuan).',
    'Bagaimana Anda membangun brand voice/visual yang konsisten?',
    'Ceritakan proses storytelling yang Anda terapkan untuk konten berdampak.',
    'Sebutkan tools/software utama dan alur kerja tim produksi Anda.',
  ],
  srd: [
    'Rancang kurikulum pelatihan/mentoring untuk meningkatkan kapasitas mahasiswa.',
    'Bagaimana Anda memilih mentor/fasilitator yang tepat dan mengukur efektivitasnya?',
    'Buat rencana evaluasi pembelajaran (instrumen, frekuensi, metrik).',
    'Sebutkan strategi menjaga engagement peserta hingga program selesai.',
    'Jelaskan materi inti yang wajib dikuasai beserta output-nya.',
  ],
  ssd: [
    'Ceritakan program sosial yang pernah Anda inisiasi/ikuti dan dampaknya.',
    'Bagaimana Anda memetakan kebutuhan sosial dan menyesuaikan program?',
    'Rancang kolaborasi untuk memperluas jangkauan dan dampak program.',
    'Jelaskan rencana logistik, pendanaan, dan transparansi pelaporan.',
    'Bagaimana strategi komunikasi publik untuk meningkatkan partisipasi?',
  ],
  swrd: [
    'Identifikasi kebutuhan kesejahteraan mahasiswa yang bisa disolusikan dengan teknologi.',
    'Rancang ide riset/eksperimen teknologi untuk menjawab kebutuhan tersebut.',
    'Jelaskan desain survei/riset pengguna dan metrik keberhasilannya.',
    'Gambarkan rencana implementasi (MVP, integrasi, operasi).',
    'Bagaimana rencana pemeliharaan dan evaluasi berkelanjutan solusi tersebut?',
  ],
  bpi: [
    'Jabarkan visi strategis Anda untuk HMTC satu tahun ke depan.',
    'Ceritakan pengalaman kepemimpinan dan pengambilan keputusan di situasi sulit.',
    'Bagaimana Anda menyusun prioritas organisasi, alokasi sumber daya, dan governance?',
    'Rancang kerangka manajemen risiko dan mekanisme kontrolnya.',
    'Tetapkan KPI tingkat organisasi dan cara memonitornya secara berkala.',
  ],
} as const;

// Introduction page content
export const INTRO_CONTENT = {
  badge: 'HMTC 2025 - Transformasi Dimulai',
  title: 'Bergabunglah dengan Kami',
  gradientTitle: 'Bentuk Masa Depan HMTC 2025',
  subtitle: 'Jadilah Bagian dari Revolusi Transformasi',
  paragraph:
    'Halo Peserta Nawasena! Kami mencari individu berbakat seperti Anda untuk membawa HMTC ke level berikutnya. Ini adalah kesempatan emas untuk berkontribusi, belajar, dan tumbuh bersama komunitas yang luar biasa.',
} as const;

export const INTRO_REQUIREMENTS = [
  {
    title: 'Mahasiswa TI Angkatan 2024',
    desc: 'Dari Institut Teknologi Sepuluh Nopember',
    iconId: 'Users',
    grad: 'from-primary/20 to-primary/10',
  },
  {
    title: 'CV Format ATS',
    desc: 'Siapkan CV dengan format yang sesuai',
    iconId: 'FileText',
    grad: 'from-accent/20 to-accent/10',
  },
  {
    title: 'Brainmap Digital',
    desc: 'Tema: Permasalahan HMTC',
    iconId: 'Sparkles',
    grad: 'from-primary/20 to-accent/15',
  },
  {
    title: 'Portofolio (Opsional)',
    desc: 'Untuk pendaftar Creative Media Information',
    iconId: 'Briefcase',
    grad: 'from-accent/20 to-primary/15',
  },
];

// Time limit card with optional extension UI
export const INTRO_TIME_LIMIT = {
  title: 'Waktu Terbatas! ',
  range: '22 Oktober - 26 Oktober 2025',
  note: 'Pendaftaran dibuka hanya 5 hari. Jangan sampai terlewatkan!',
  // Set extend to undefined/null if no extension. Example below keeps it optional.
  extend: undefined as
    | {
        label?: string; // e.g., 'Diperpanjang'
        range: string; // e.g., 'Sampai 28 Oktober 2025'
        note?: string;
      }
    | undefined,
} as const;

// Contact persons
export const INTRO_CONTACTS = [
  { name: 'CP 1', phone: '+62 815-1552-8712' },
  { name: 'CP 2', phone: '+62 822-8981-0615' },
] as const;
