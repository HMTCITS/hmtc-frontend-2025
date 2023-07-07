import React from 'react';

interface TextComponentProps {
  text1: string;
  text2: string;
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='flex w-[710px] flex-row bg-white bg-opacity-10  font-secondary text-white shadow-md'>
      <div className='min-h-full w-[15px] bg-[#67B6FF]'></div>
      <div className='space-y-8 p-10'>
        <h1 className='text-2xl font-bold'>{text1}</h1>
        <p className='text-lg'>{text2}</p>
      </div>
    </div>
  );
};

export default VisiMisi;
