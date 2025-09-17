import { SearchSheet } from '../search/search-sheet';
import { ProfileImage } from './profile-image';

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
        <ProfileImage />
      </section>
    </div>
  );
}
