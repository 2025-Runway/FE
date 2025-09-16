import { SearchSheet } from '../search/search-sheet';

export function HomeSearch() {
  return (
    <div className='relative flex w-full gap-3'>
      {/**
       * 검색 영역
       */}
      <SearchSheet />
      {/**
       * 프로필사진 영역
       */}
      <section>
        <div className='bg-black000 h-11 w-11 rounded-full' />
      </section>
    </div>
  );
}
