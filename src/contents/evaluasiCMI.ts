/**
 * Contents for Evaluasi CMI Form
 * Form type: Multiple Choice, Star Rating, Text Input
 * Last Update: 06-12-2025
 */

// Form Type: Select Options (Single)
export const DIVISIONS = [
  { id: 'edd', name: 'Enterpreneurship Development Department (EDD)' },
  { id: 'sti', name: 'Student Talent and Interest (STI)' },
  { id: 'ia', name: 'Internal Affairs (IA)' },
  { id: 'ea', name: 'External Affairs (EA)' },
  { id: 'srd', name: 'Student Resources Development (SRD)' },
  { id: 'ssd', name: 'Student Social Development (SSD)' },
  { id: 'swrt', name: 'Student Welfare and Research Technology (SWRT)' },
  { id: 'bod', name: 'Board of Director (BOD)' },
] as const;

export const INTRO = {
  title: 'Petunjuk: Mohon berikan penilaian yang objektif berdasarkan pengalaman interaksi dan kerja sama departemen kamu dengan Departemen CMI selama masa kepengurusan ini 🤨🔎',
  questions: [
    // FormType: Text input
    'Nama',

    // FormType: Select Options (Single), dynamic from DIVISIONS
    'Departemen/Biro',
  ]
}

export const EVALUASI_GENERAL = [

  // FormType: Star Rating 1-5
  {
    id: 'bagian1',
    title: 'Bagian I: Kualitas Kerja Sama dan Koordinasi',
    questions:
      [
        'Kejelasan Komunikasi: Seberapa jelas dan efektif komunikasi dari Departemen CMI (lisan dan tulisan)?',
        'Responsivitas: Bagaimana kecepatan dan ketepatan Departemen CMI dalam merespons permintaan/pertanyaan dari departemen Anda?',
        'Koordinasi Kegiatan: Bagaimana kelancaran koordinasi dan sinkronisasi antara Departemen CMI dengan departemen Anda dalam pelaksanaan program kegiatan?',
        'Profesionalisme: Bagaimana sikap, etika, dan profesionalisme anggota CMI dalam berinteraksi?',
        'Keterbukaan terhadap Kritik/Saran: Bagaimana tingkat keterbukaan Departemen CMI dalam menerima masukan dari departemen Anda/lain?',
      ]
  },
  {
    id: 'bagian2',
    title: 'Bagian II: Kontribusi Departemen CMI (Sesuai Fungsi Utama)',
    questions: [
      'Kualitas Dukungan: Seberapa baik kualitas dukungan oleh Departemen CMI terhadap program/kegiatan departemen Anda?',
      'Keterlibatan Aktif: Seberapa aktif dan proaktif Departemen CMI dalam membantu pelaksanaan program/kegiatan departemen Anda?',
      'Inovasi dan Kreativitas: Bagaimana kontribusi Departemen CMI dalam memberikan ide-ide inovatif untuk mendukung departemen Anda?',
      'Pemahaman Tugas: Bagaimana pemahaman Departemen CMI terhadap peran dan fungsinya, serta dampak pekerjaannya terhadap departemen lain?',
      'Kepatuhan Deadline: Seberapa konsisten Departemen CMI dalam memenuhi tenggat waktu yang telah disepakati?',
    ]
  }
]

export const EVALUASI_BIRO = [

  // FormType: Multiple Choice (Select multiple/single)
  {
    id: 'intro',
    title: 'Evaluasi Biro',
    questions: 'Pilih Departemen/Biro yang ingin Anda evaluasi: Anda dapat memilih lebih dari satu. Langkah ini opsional. Silakan tekan tombol Next jika ingin melewati sesi ini.',
    choices: [
      'Creative Design (CD)',
      'Social Media Strategist (SMS)',
      'Media Production (MedPro)',
      'IT Development (ITDev)'
    ]
  },

  // FormType: Star Rating 1-5
  {
    id: 'cd',
    title: 'Evaluasi Biro Creative Design (CD)',
    questions: [
      'Konsistensi Visual: Apakah hasil desain (poster, template, dll) konsisten dengan brand guideline atau identitas visual yang dipilih?',
      'Kesesuaian dengan Brief: Seberapa akurat desain yang dihasilkan Creative Design dalam memenuhi brief dan kebutuhan departemen Anda?',
      'Estetika dan Kualitas Visual: Kualitas estetika, kejelasan, dan daya tarik visual dari materi yang diproduksi.',
      'Kecepatan Revisi: Seberapa cepat biro CD dalam melakukan revisi/perbaikan design?'
    ]
  },
  {
    id: 'sms',
    title: 'Evaluasi Biro Social Media Strategist (SMS)',
    questions: [
      'Strategi Konten: Seberapa relevan strategi media sosial CMI (tema, campaign, dll) dengan tujuan departemen Anda?',
      'Keterlibatan Audiens: Efektivitas konten media sosial CMI dalam menciptakan interaksi (engagement) dengan audiens.',
      'Kualitas Narasi (Caption): Kualitas bahasa, pesan yang disampaikan, dan kejelasan narasi (caption) di media sosial.',
      'Analisis Data: Seberapa bermanfaat dan terperinci laporan/analisis kinerja media sosial yang diberikan kepada departemen Anda?'
    ]
  },
  {
    id: 'medpro',
    title: 'Evaluasi Biro Media Production (MedPro)',
    questions: [
      'Kualitas Teknis Produksi: Kualitas teknis dari output media (video, foto, dll.), termasuk kualitas audio, visual, dan editing.',
      'Kesesuaian Konsep: Seberapa baik hasil produksi media menangkap dan menyampaikan konsep yang diinginkan (sesuai storytelling)?',
      'Variasi dan Inovasi: Tingkat variasi format dan inovasi yang ditawarkan dalam produksi media (misal: jenis video, angle foto, dll).',
      'Manajemen Dokumentasi: Kelengkapan dan kemudahan akses terhadap arsip/dokumentasi media dari kegiatan yang melibatkan departemen Anda.  '
    ]
  },
  {
    id: 'itdev',
    title: 'Evaluasi Biro IT Development (ITDev)',
    questions: [
      'Stabilitas Sistem/Platform: Keandalan dan stabilitas sistem digital/platform yang dikelola IT/Dev (misal: website, formulir digital, database).',
      'Dukungan Teknis: Kecepatan dan efektivitas tim IT/Dev dalam memberikan dukungan dan menyelesaikan masalah teknis yang terjadi.',
      'Keamanan Data: Jaminan keamanan dan kerahasiaan data yang dikelola atau diakses melalui platform IT/Dev CMI.',
      'Kemudahan Penggunaan (User Experience): Seberapa mudah dan intuitif platform/alat digital yang dibuat atau dikelola oleh IT/Dev CMI digunakan oleh departemen Anda.'
    ]
  }
]

// FormType: Text input
export const UMPAN_BALIK = {
  title: 'Bagian III: Umpan Balik dan Saran',
  questions: [
    'Kekuatan Utama CMI: Apa 2-3 hal terbaik (kekuatan) yang paling menonjol dari kinerja Departemen CMI selama kepengurusan ini?',
    'Area Perbaikan CMI: Apa 2-3 hal (area) yang paling perlu ditingkatkan dan diperbaiki oleh Departemen CMI di masa mendatang?',
    'Komentar Tambahan: Apakah ada komentar atau saran spesifik lain yang ingin Anda sampaikan?'
  ]
}

// Not a questions
export const ENDING_NOTE = {
  title: 'Evaluasi Berhasil Disimpan!',
  questions: 'Terima kasih banyak sudah hadir! Kami menghargai sekali waktu yang telah kamu luangkan hari ini 🥰😺 -CindyCantik'
}