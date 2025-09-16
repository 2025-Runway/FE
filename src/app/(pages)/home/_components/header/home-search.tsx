'use client';
import { SearchSheet } from '../search/search-sheet';
import { useUser } from '../../_hooks/use-user';
import Image from 'next/image';

export function HomeSearch() {
  const { data: userResponse } = useUser();
  const profileImageUrl = userResponse?.data?.profileImageUrl;

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
        <div className='h-11 w-11 rounded-full overflow-hidden bg-gray-200'>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt='프로필 이미지'
              width={44}
              height={44}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='bg-black000 h-full w-full' />
          )}
        </div>
      </section>
    </div>
  );
}
