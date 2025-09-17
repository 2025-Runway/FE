'use client';

import { useEffect, useState } from 'react';
import { PlacePickSheet } from './place-pick-sheet';
import { getMypageInfo } from '@/lib/api/mypage';
import { MypageInfo } from '@/interfaces/mypage.types';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Place } from '../_constants/region.constant';

export function TravelPlaceContent() {
  const {
    data: mypageInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['mypageInfo'],
    queryFn: async () => {
      const mypageInfo = await getMypageInfo();
      return mypageInfo.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (mypageInfo?.destination !== '') {
    return (
      <div className='relative h-full w-full'>
        <Image
          src={mypageInfo?.regionImageUrl ?? ''}
          alt='mypage-region'
          fill
          className='object-fill'
        />
        <span className='absolute top-6 left-5 flex flex-col items-start'>
          <span className='text-title2 text-white000'>나의 여행지</span>
          <span className='text-heading1 text-white000'>
            {mypageInfo?.destination}
          </span>
        </span>
        <PlacePickSheet
          sheetState='edit'
          refetch={refetch}
          defaultIsPickPlace={mypageInfo?.destination ?? null}
        />
      </div>
    );
  }
  return (
    <div className='flex-col-center h-auto w-full flex-1 gap-6'>
      <div className='flex-col-center h-auto w-full gap-1'>
        <h1 className='text-gray-bk text-[20px] leading-7 font-bold'>
          런트립을 떠나시나요?
        </h1>
        <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
          가고 싶은 여행지를 설정하고, <br /> 런웨이 코스를 살펴보세요.
        </p>
      </div>
      <PlacePickSheet
        sheetState='create'
        refetch={refetch}
        defaultIsPickPlace={null}
      />
    </div>
  );
}
