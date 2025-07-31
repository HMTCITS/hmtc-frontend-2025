'use client';
import { Search } from 'lucide-react';
import React from 'react';

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
        aria-label='Seacrh gallery'
        type='button'
        className='cursor-pointer text-[#32323280] hover:text-french-blue-100'
      >
        <Search size={31} />
      </button>
      <input
        type='text'
        placeholder='Search for gallery...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='font-poppins !mb-0 w-full text-base placeholder:text-gray-400 focus:outline-none'
      />
    </div>
  );
}
