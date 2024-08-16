import React from 'react';

import Typography from '@/components/typography/Typography';

interface TextComponentProps {
  text1: string;
  text2: string | string[];
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-start p-4 md:p-6 gap-4 md:gap-5 w-full max-w-[800px] mx-auto'>
      <Typography 
      variant='i1' 
      className='text-5xl md:text-5xl font-adelph-fructidor font-bold leading-[28px] md:leading-[53px] text-white mb-4'
      >
        {text1}
      </Typography>
      {typeof text2 === 'string' ? (
        <Typography
          variant='s2'
          className='text-base md:text-lg font-normal text-gray-400 leading-[20px] md:leading-[28px] w-full md:w-[334px] h-auto md:h-[100px]'
        >
          {text2}
        </Typography>
      ) : (
        <div>
          <ol className='space-y-3 md:space-y-5'>
            {text2.map((text, index) => (
              <li
                key={index}
                className='text-base md:text-lg font-normal text-gray-400 leading-[20px] md:leading-[28px] w-full md:w-[868px]'
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
