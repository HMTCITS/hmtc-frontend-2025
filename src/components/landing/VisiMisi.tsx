import React from 'react';

import Typography from '@/components/typography/Typography';

interface TextComponentProps {
  text1: string;
  text2: string | string[];
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <div className='flex w-full border-l-4 border-blue-light-2 bg-white bg-opacity-10 font-secondary text-white shadow-md hover:bg-opacity-20'>
      <div className='space-y-4 p-6 md:space-y-6 md:p-9'>
        <Typography variant='i1' className='text-xl'>
          {text1}
        </Typography>
        {typeof text2 === 'string' ? (
          <Typography
            variant='s2'
            className='text-sm font-normal text-gray-400 md:text-base'
          >
            {text2}
          </Typography>
        ) : (
          <div>
            <ol className='list-outside list-decimal space-y-2 px-4'>
              {text2.map((text, index) => (
                <li
                  key={index}
                  className='text-sm font-normal text-gray-400 md:text-base'
                >
                  {text}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisiMisi;
