import React from 'react';

import Typography from '@/components/typography/Typography';

interface TextComponentProps {
  text1: string;
  text2: string | string[];
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='mx-auto flex w-full max-w-[800px] flex-col items-start gap-4 p-4 md:gap-5 md:p-6'>
      <Typography
        variant='i1'
        className='mb-4 font-adelph-fructidor text-5xl font-bold leading-[28px] text-white md:text-5xl md:leading-[53px]'
      >
        {text1}
      </Typography>
      {typeof text2 === 'string' ? (
        <Typography
          variant='s2'
          className='h-auto w-full text-base font-normal leading-[25px] text-gray-400 md:h-[100px] md:w-[334px] md:text-lg md:leading-[36px]'
        >
          {text2}
        </Typography>
      ) : (
        <div>
          <ol className='space-y-3 md:space-y-5'>
            {text2.map((text, index) => (
              <li
                key={index}
                className='w-full text-base font-normal leading-[25px] text-gray-400 md:w-full md:text-lg md:leading-[36px]'
              >
                {text}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default VisiMisi;
