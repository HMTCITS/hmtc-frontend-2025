'use client';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';

interface SearchBarGalleryProps {
  value: string;
  onChange: (val: string) => void;
}
export default function SearchBarGallery({
  value,
  onChange,
}: SearchBarGalleryProps) {
  return (
    <div className='relative flex w-full max-w-[415px] gap-3 rounded-full border border-b-french-blue-100 px-4 py-3.5 shadow-md'>
      <button
        type='button'
        className='cursor-pointer text-[#32323280] hover:text-french-blue-100'
      >
        <IoIosSearch size={31} />
      </button>
      <input
        type='text'
        placeholder='Search for gallery...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='!mb-0 w-full font-poppins text-base placeholder:text-gray-400 focus:outline-none'
      />
    </div>
  );
}
