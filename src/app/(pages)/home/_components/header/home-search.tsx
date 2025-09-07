import { Search } from 'lucide-react';

export function HomeSearch() {
  return (
    <div className='relative flex w-full gap-3'>
      {/**
       * 검색 영역
       */}
      <section className='flex w-full items-center rounded-[24px] bg-white/40 px-4 py-[10px]'>
        <Search className='mr-2 size-6 text-white' />
        <input
          type='text'
          placeholder='Search'
          className='text-white000 placeholder-white000/100 h-6 text-[16px] focus:outline-none'
        />
      </section>
      {/**
       * 프로필사진 영역
       */}
      <section>
        <div className='bg-black000 h-11 w-11 rounded-full' />
      </section>
    </div>
  );
}
