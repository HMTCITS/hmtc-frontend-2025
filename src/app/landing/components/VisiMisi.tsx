import React from 'react';

import Typography from '@/components/Typography';

interface TextComponentProps {
  text1: string;
  text2: string | string[];
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='mx-auto flex w-full max-w-[800px] flex-col items-start gap-4 p-4 md:gap-5 md:p-6'>
      <Typography
        as='h1'
        variant='i1'
        className='font-adelphe mb-4 text-5xl leading-[28px] font-bold text-white md:text-5xl md:leading-[53px]'
      >
        {text1}
      </Typography>
      {typeof text2 === 'string' ? (
        <Typography
          as='p'
          variant='s2'
          className='font-satoshi h-auto w-full text-justify leading-[25px] font-normal text-gray-400 md:h-[100px] md:w-[334px] md:text-lg md:leading-[36px]'
        >
          {text2}
        </Typography>
      ) : (
        <ol className='space-y-3 md:space-y-5'>
          {text2.map((text, index) => (
            <Typography
              as='li'
              variant='s2'
              key={index}
              className='font-satoshi w-full text-justify leading-[25px] font-normal text-gray-400 md:w-full md:text-lg md:leading-[36px]'
            >
              {text}
            </Typography>
          ))}
        </ol>
      )}
    </div>
  );
};

export default VisiMisi;
