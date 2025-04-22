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
    <div className='relative w-full max-w-md'>
      <input
        type='text'
        placeholder='Search for gallery...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='font-poppins !mb-0 w-full rounded-full border border-[#B0D5EB] px-4 py-3.5 text-base placeholder:text-gray-400 focus:outline-none'
      />
      <button
        type='button'
        className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#32323280] hover:text-[#B0D5EB]'
      >
        <IoIosSearch size={31} />
      </button>
    </div>
  );
}
