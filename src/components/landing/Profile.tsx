import React from 'react';

import Typography from '@/components/typography/Typography';

const Profile = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 gap-y-6 py-10 md:py-24 lg:flex-row'>
      <div className='flex w-full items-center lg:w-1/2'>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/8sA62jHZ984'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          className='border-none'
          style={{ border: 'none' }}
        ></iframe>
      </div>
      <div className='w-full space-y-6 text-black-main lg:w-1/2'>
        <Typography
          variant='k1'
          className='w-full font-primary text-[2rem] !leading-tight md:text-[2.75rem] xl:text-5xl'
        >
          TCLIPS - Internship Experience in Malaysia
        </Typography>
        <Typography className='font-secondary md:text-macro'>
          TCLIPS hadir kembali nih! Episode kali bakalan nyeritain kegiatan para
          anak TC yang sedang magang di Negeri Malaysia loh. Penasaran sama apa
          saja yang dilakuin sama teman-teman kita di sana? Tonton dan nikmati
          perjalanan dari arek-arek TC yaa!
        </Typography>
        {/* <Typography variant='h4'>
          #TCLIPS #MedfoSansargaAbhijaya #HMTCSansargaAbhijaya #ITSSurabaya
        </Typography> */}
      </div>
    </section>
  );
};

export default Profile;
