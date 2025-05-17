export type GalleryItem = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
  width: number;
  height: number;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    date: 'Sabtu, 15 Maret 2025',
    title: 'Welcome Party HMTC Suar Peradaban 2025',
    image: '/gallery/Welpar2025.png',
    link: 'https://drive.google.com/drive/folders/1AmY8SkOeqTYtT6uA2iDm1i62vhpFmXfz?usp=drive_link',
    width: 585,
    height: 390,
  },
  {
    id: 2,
    date: 'Minggu, 23 Maret 2025',
    title: 'Berbakti 2025',
    image: '/gallery/Berbakti2025.png',
    link: 'https://drive.google.com/drive/folders/1s9Hrz5W03olCzESZNrXc4Vzo2z-u4UnR?usp=drive_link',
    width: 540,
    height: 360,
  },
  {
    id: 3,
    date: 'Sabtu, 12 April 2025',
    title: 'Wisuda Trailer 2025',
    image: '/gallery/SW131Trailer.png',
    link: 'https://drive.google.com/drive/folders/1R5o9BkofLNMsTPOSQ6kXNsxROPGrovMc?usp=drive_link',
    width: 536,
    height: 357,
  },
  {
    id: 4,
    date: 'Minggu, 13 Maret 2025',
    title: 'Wisuda-131 2025',
    image: '/gallery/SW131.png',
    link: 'https://drive.google.com/drive/folders/1wtYFpykEkyBb9uuPIMeO0nv3rrh7uo1a?usp=drive_link',
    width: 540,
    height: 360,
  },
  {
    id: 5,
    date: 'Minggu, 16 Mei 2025',
    title: 'Reveal Kabinet 2025',
    image: '/gallery/revealKabinet.png',
    link: 'https://drive.google.com/drive/folders/1rQZvBYfEGWTZ2pC1v8XL8UTXHPRfDGv4?usp=drive_link',
    width: 640,
    height: 960,
  },
];
