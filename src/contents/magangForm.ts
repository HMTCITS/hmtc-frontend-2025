// Static content and configuration for the Magang recruitment flow

// Divisions shown in the selection grid (updated)
export const DIVISIONS = [
  { id: 'edd', name: 'Enterpreneurship Development Department (EDD)', iconId: 'Rocket' },
  { id: 'sti', name: 'Student Talent and Interest (STI)', iconId: 'Star' },
  { id: 'ia', name: 'Internal Affairs (IA)', iconId: 'Users' },
  { id: 'ea', name: 'External Affairs (EA)', iconId: 'Globe' },
  { id: 'cmi', name: 'Creative Media Information (CMI)', iconId: 'Film' },
  { id: 'srd', name: 'Student Resources Development (SRD)', iconId: 'GraduationCap' },
  { id: 'ssd', name: 'Student Social Development (SSD)', iconId: 'Heart' },
  { id: 'swrt', name: 'Student Welfare and Research Technology (SWRT)', iconId: 'Cpu' },
  { id: 'bod', name: 'Board of Director (BOD)', iconId: 'Crown' },
] as const;

// General questions on the main form
export const GENERAL_QUESTIONS = [
  'Dalam MUBES V disebutkan bahwa salah satu tugas Himpunan Mahasiswa Departemen adalah mendukung BEM Fakultas dan BEM Institut. Bagaimana pendapatmu mengenai kondisi KM ITS saat ini yang cenderung departemen-sentris, sehingga sering berujung pada saling menyalahkan? Apa solusi yang bisa kamu tawarkan untuk KM ITS? Menurutmu, siapa yang paling bertanggung jawab atas situasi ini?',
  'Bagaimana caramu mengatur kegiatanmu apabila dalam satu waktu, kamu dihadapkan dengan 4 hal di waktu yang bersamaan yaitu urusan HMTC, akademik, Schematics, dan Me Time?',
  'Dalam beberapa tahun terakhir, relevansi himpunan di kalangan mahasiswa semakin menurun, dengan semakin banyaknya alternatif pengembangan diri di luar himpunan. Hal ini menyebabkan menurunnya jumlah regenerasi himpunan dan partisipasi pada kegiatan pada himpunan yang menyebabkan terhambatnya proses pengembangan dan regenarasi himpunan. Menurutmu, Siapa yang paling bertanggung jawab atas kondisi ini? Serta langkah apa yang perlu dilakukan untuk mengembalikan relevansi himpunan agar tetap menjadi wadah yang dibutuhkan dan diminati mahasiswa?',
  'RUMJ (Rapat Umum Mahasiswa Jurusan) merupakan forum terbuka bagi warga Teknik Informatika untuk memutuskan  perkara yang berkaitan dengan HMTC dan segala sesuatu mengenai lingkungan mahasiswa Teknik Informatika yang berhubungan dengan HMTC. Sayangnya, dari tahun ke tahun, partisipasi warga Teknik Informatika pada RUMJ sangat sedikit. Semisal, RUMJ yang sangat penting akan diadakan (Pembentukan BSO atau pembubaran HMTC), namun jumlah warga yang ikut tidak memenuhi kuorum sehingga membatalkan RUMJ tersebut. Menurut Anda, Siapa yang bertanggung jawab atas permasalahan ini dan langkah apa yang sebaiknya diambil untuk kedepannya?'
] as const;

// Division specific step texts
export const DIVISION_QUESTIONS_TITLE = 'Pertanyaan Khusus Divisi';
export const DIVISION_QUESTION_PLACEHOLDER =
  'Bagikan pemikiran mendalam Anda tentang pertanyaan ini...';

// Per-division specific question sets. Each division id maps to an array of questions
export const DIVISION_QUESTIONS = {
  edd: [
    'Apa yang kamu ketahui tentang departemen enterpreneurship development dan Jobdesc-nya?',
    'Apa motivasi kamu untuk mendaftar magang di departemen enterpreneurship development?',
    'Salah satu program kerja di EDD adalah TCatalyst. Program Ini sangat bagus tujuannya, namun melihat pelaksanaan TCatalyst di tahun sebelumnya, antusiasme mahasiswa TC masih rendah. Padahal, sebenarnya ada beberapa mahasiswa TC yang berwirausaha, tetapi belum terfasilitasi dengan baik. Menurutmu, apa solusi yang bisa dilakukan untuk meningkatkan antusiasme dan merangkul lebih banyak mahasiswa TC yang memiliki minat atau usaha di bidang kewirausahaan',
    'Bagaimana solusi menghadapi situasi di mana stakeholder utama membatalkan secara sepihak pada hari yang telah ditentukan, padahal informasi sudah disebarkan luas ke mahasiswa TC?',
    'Bayangkan kamu sedang berjualan di suatu acara, tetapi saat berjualan, partnermu terlihat kurang antusias dalam menawarkan produk ke pelanggan. Di sisi lain, ada kompetitor di dekatmu yang lebih aktif dan menarik perhatian lebih banyak pelanggan. Bagaimana kamu akan menghadapi situasi ini agar penjualan tetap berjalan baik, sekaligus menjaga kerja sama tim dengan partnermu?',
  ],
  sti: [
    'Apa yang kamu ketahui tentang departemen Student talent and Interest?',
    'Apa motivasi kamu untuk mendaftar magang di departemen Student talent and Interest?',
    'Bagaimana Cara kamu menentukan Jadwal Untuk suatu Fungame Agar Fungame Tersbut berjalan dengan Baik dan Ramai,Namun Seperti yang Kita Ketahui sendiri Bahwa banyak Mahasiswa Informatika Yang sibuk dan Terkadang Bentrok Dengan Jadwal yang ada.Langkah Langkah apa Yang kamu Lakukan agar fungame Tersebut bisa tidak bentrok dengan jadwal mahasiswa Informatika itu sendiri?',
    'Dalam beberapa tahun terakhir, kegiatan klub dan komunitas di bawah STI cenderung bersifat rutin dan berulang, seperti lomba, atau fun game. Kamu diminta untuk merancang satu inisiatif baru yang benar-benar inovatif agar kegiatan di bawah STI memiliki dampak jangka panjang bagi mahasiswa Teknik Informatika, baik secara akademik, profesional, maupun sosial.',
    'Bayangkan terdapat penurunan minat mahasiswa terhadap kegiatan fungame. Apa pendekatan yang akan kamu lakukan untuk meningkatkan antusiasme dan partisipasi mereka?',
  ],
  ia: [
    'Apa yang kamu ketahui tentang departemen Internal Affairs dan Jobdesknya?',
    'Apa motivasi kamu untuk mendaftar magang di departemen Internal Affairs?',
    'Dalam program kerja seperti Syukuran Wisuda, beberapa divisi di Internal Affairs sering mengalami miskomunikasi. Misalnya, ada perubahan rundown mendadak yang tidak tersampaikan ke semua divisi, sehingga terjadi chaos di lapangan. Bagaimana cara kamu memastikan koordinasi antar-divisi tetap sinkron, terutama saat menjalankan program kerja besar?',
    'Kegiatan internal seperti TC Gathering sering sepi karena sebagian warga merasa acara internal “cuma begitu-begitu aja”.  Bagaimana cara kamu membuat warga C tertarik untuk ikut dan terlibat aktif dalam acara-acara Internal Affairs?',
    'Setelah program kerja selesai, evaluasi sering dilakukan sekadar formalitas. Masukan dari panitia atau peserta jarang ditindaklanjuti untuk perbaikan ke depan. Bagaimana cara kamu merancang sistem evaluasi agar hasil dan masukan dari acara sebelumnya benar-benar diterapkan pada kegiatan berikutnya?',
  ],
  ea: [
    'Apa yang kamu ketahui tentang departemen External Affairs dan Jobdesc-nya?',
    'Apa motivasi kamu untuk mendaftar magang di departemen External Affairs?',
    'Sebagai staff External Affairs, kita akan banyak berurusan dengan company dan stakeholder penting lainnya untuk proker seperti company visit. Apakah kamu punya ide atau inovasi cara approach company untuk proker company visit?',
    'Saat ini, peran alumni masih belum dimanfaatkan secara maksimal. Banyak alumni yang sulit dihubungi, apalagi kalau diminta untuk mengisi database. Pertanyaan: Gimana caramu mendekati alumni supaya mereka lebih mudah dihubungi dan mau berkontribusi? Ada strategi khusus biar alumni merasa nyaman dan tertarik buat terlibat aktif?',
    'External Affairs, mau ngadain studi banding dan company visit ke ITB dan Traveloka. Biayanya lumayan besar, jadi perlu kuota peserta minimal biar biaya per orang lebih terjangkau. Tapi, biasanya mahasiswa gamau ikut kalau biayanya terlalu mahal. Pertanyaan: Gimana cara kamu bikin mahasiswa tertarik ikut acara ini supaya kuota terpenuhi tanpa bikin kualitas acara turun?',
  ],
  cmi: [
    'Seberapa efektif Departemen CMI dalam menyampaikan informasi kegiatan HMTC kepada warga TC?',
    'Bagaimana kualitas konten dan media yang dihasilkan oleh Departemen CMI dalam membangun citra positif HMTC ITS?',
    'Jika diberikan pilihan antara visual/tampilan yang bagus dan pesan/isi/cerita yang jelas dalam sebuah design ataupun video, kamu bakal memilih dan memprioritaskan yang mana?',
    'Seandainya ada request mendadak yang urgent dan harus selesai dalam waktu dekat (cth: feeds yang besok sudah harus dipost), bisakah kamu menyanggupi request tersebut? Jika iya, apa cara/strategimu untuk memastikan desain tersebut selesai tepat waktu?',
    'Apa langkah yang kamu ambil jika file asset untuk keperluan creative Anda mengalami corrupt, hilang, dan tidak bisa digunakan kembali?',
  ],
  srd: [
    'Bagaimana cara kamu menjelaskan apa itu SRD dan tujuannya kepada orang awam supaya dapat dipahami dengan mudah?',
    'Sebagai SRD apa yang bakal kamu lakuin untuk menggali potensi potensi yang ada di TC ini?',
    'Jika ada mahasiswa baru TC melakukan kesalahan fatal, tindak lanjut apa yang akan kamu lakukan?',
    'Mana yang lebih bagus menurutmu, fungsi hasil atau fungsi waktu?',
    'Jika pada pertengahan semester kamu menyadari bahwa tidak ada/minim perkembangan yang positif pada mahasiswa TC, apa inovasi yang bisa kamu berikan untuk mengatas hal tersebut?',
  ],
  ssd: [
    'Apa yang kamu ketahui tentang departemen SSD dan Jobdesc-nya?',
    'Apa motivasi dan komitmen (berikan skala 1-10) kamu untuk mendaftar magang di departemen student social development?',
    'Pada tahun lalu, terdapat sebuah program kerja bakti sosial yang bertujuan untuk membagikan sembako kepada yang membutuhkan. Setelah program tersebut dilaksanakan, SSD mendapatkan kritikan dari masyarakat setempat terkait ketidaksesuaian target penerimanya. Jika menghadapi kasus serupa di masa mendatang, bagaimana langkah-langkah kamu menghadapinya? ',
    'Saat mengadakan kegiatan sosial untuk anak-anak berkebutuhan khusus, beberapa staff merasa kesulitan berkomunikasi dan menangani anak-anak dengan kondisi yang berbeda-beda. Apa yang bisa kamu lakukan ketika menghadapi situasi ini dan bagaimana cara memastikan anak-anak tetap merasa nyaman selama acara berlangsung?',
    'SSD sedang mengadakan acara berbuka bersama anak panti asuhan. Namun, di hari H, ada kendala keterlambatan datangnya makanan untuk buka puasa. Apa yang akan kamu lakukan untuk mengatasi situasi ini secara cepat dan bagaimana cara memastikan anak-anak tetap nyaman dan tidak merasa kecewa?',
  ],
  swrt: [
    'Apa yang kamu ketahui tentang departemen Student Welfare and Research Technology? (maksimal 100 kata)',
    'Apa motivasi kamu untuk mendaftar magang di departemen Student Welfare and Research Technology? (maksimal 50 kata)',
    'Bagaimana jika dalam pelaksanaan program kerja FRS yang kamu jalankan untuk seluruh mahasiswa Informatika, terdapat pelanggaran SOP yang dilakukan oleh teman dekatmu sendiri, sementara pelanggaran tersebut memiliki sanksi yang berat? Langkah apa yang akan kamu ambil?',
    'Bagaimana tanggapanmu dan langkah yang akan kamu ambil apabila saat pelaksanaan penjarasan massal kepada seluruh mahasiswa Teknik Informatika, hanya sedikit yang berpartisipasi, padahal kegiatan tersebut sangat penting untuk mendukung perubahan di lingkungan Teknik Informatika?',
    'Bagaimana jika dalam sebuah program yang sedang kamu jalankan, salah satu anggota tim mulai kehilangan semangat dan tidak menyelesaikan tugasnya. Setelah diberikan teguran karena melewati tenggat waktu, ia menyampaikan bahwa ia merasa tidak dapat menjalankan amanah dengan baik. Tindakan apa yang akan kamu ambil?',
  ],
  bod: [
    'Apa yang kamu ketahui tentang BoD dan Jobdesknya?',
    'Apabila kamu menjadi seorang sekjen dan diantara kedua departemenmu saling berselisih mengenai SOP yang telah disepakati di awal, namun ketika pelaksanaan saling berselisih. Apa yang akan kamu lakukan?',
    'Bagaimana kamu memastikan seluruh dokumen kegiatan terarsip dengan rapi dan apa strategi kamu agar sistem administrasi tersebut dapat diteruskan secara berkelanjutan oleh periode berikutnya?',
    'Administrasi merupakan aspek krusial dalam menjaga ketertiban dan keberlanjutan kegiatan organisasi. Bagaimana strategi kamu dalam mengelola berbagai kebutuhan administrasi yang berasal dari beragam pihak di lingkungan himpunan?',
    'Saat ini pencatatan keuangan HMTC sudah dilakukan menggunakan tool, yakni spreadsheet. Namun, terdapat kesulitan terhadap mengolah hasil rekap untuk mengambil keputusan (misalnya evaluasi pengeluaran, prediksi kebutuhan dana, atau pelaporan). Menurutmu, bagaimana cara mengoptimalkan penggunaan spreadsheet agar data keuangan lebih mudah dianalisis dan dipahami kedepannya?',
  ],
} as const;

// Introduction page content
export const INTRO_CONTENT = {
  badge: 'HMTC 2025 - Suarkan Semangatmu',
  title: 'Bergabunglah dengan Kami',
  gradientTitle: 'Bentuk Masa Depan HMTC 2025',
  subtitle: 'Jadilah Bagian dari Nyala Suar Peradaban',
  paragraph:
    'Halo Peserta Nawasena! Kami mencari individu berbakat seperti Anda untuk membawa HMTC ke level berikutnya. Ini adalah kesempatan emas untuk berkontribusi, belajar, dan tumbuh bersama komunitas yang luar biasa.',
} as const;

export const INTRO_REQUIREMENTS = [
  {
    title: 'Mahasiswa TC, RKA, dan RPL Angkatan 2024',
    desc: 'Departemen Teknik Informatika ITS',
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
    title: 'Mindmap Digital',
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
  range: '24 Oktober - 30 Oktober 2025 11.59 AM',
  note: 'Pendaftaran dibuka hanya 7 hari. Jangan sampai terlewatkan!',
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
  { name: 'Lathifah Sahda', phone: '+62 822-8981-0615' },
  { name: 'Brendan Timothy Mannuel', phone: '+62 815-1552-8712' },
] as const;
