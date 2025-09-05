import { Search } from 'lucide-react';

export default function HomeSearch() {
  return (
    <div className='relative w-full flex gap-3'>
      {/**
       * 검색 영역
       */}
      <section className='w-full flex items-center bg-white/40 rounded-[24px] px-4 py-[10px]'>
        <Search className='size-6 text-white mr-2' />
        <input
          type='text'
          placeholder='Search'
          className='h-6  text-white000 placeholder-white000/100 text-[16px] focus:outline-none'
        />
      </section>
      {/**
       * 프로필사진 영역
       */}
      <section>
        <div className='rounded-full h-11 w-11 bg-black000' />
      </section>
    </div>
  );
}
