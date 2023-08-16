import React from 'react';

import Typography from '@/components/typography/Typography';

interface TextComponentProps {
  text1: string;
  text2: string;
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='flex w-full border-l-4 border-blue-light-2 bg-white bg-opacity-10 font-secondary text-white shadow-md hover:bg-opacity-20'>
      <div className='space-y-4 p-6 md:space-y-8 md:p-10'>
        <Typography variant='i1' className='text-xl'>
          {text1}
        </Typography>
        <Typography variant='s1' className='text-sm font-normal text-gray-400'>
          {text2}
        </Typography>
      </div>
    </div>
  );
};

export default VisiMisi;
