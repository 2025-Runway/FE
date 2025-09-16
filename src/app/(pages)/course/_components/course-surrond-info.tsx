'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import LeftArrowIcon from '@/public/svg/home/left-arrow.svg';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { CourseSurrondTab } from './course-surrond-tab';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTourInfo } from '../_hooks/use-tour-info';
import { ArrowRightIcon } from 'lucide-react';
import { useTourTab } from '../_hooks/use-tour-tab';
import { LoadingSpinner } from '@/components/loading-spinner';
const COURSE_NAME = '남파랑길 1코스';

export function CourseSurrondInfo() {
  const pathname = usePathname();
  const course_id = pathname.split('/course/')[1];
  const { activeTab } = useTourTab();
  const {
    data: tourInfoData,
    loading,
    error,
  } = useTourInfo(course_id ?? '', activeTab, 1);

  const handleNaverMapMove = (mapX: number, mapY: number) => {
    // 네이버지도 직접 좌표 이동 URL
    const naverMapUrl = `https://map.naver.com/v5/search/${mapY},${mapX}`;

    if (window.confirm('네이버 지도로 이동하시겠습니까?')) {
      // 새 탭에서 열기
      window.open(naverMapUrl, '_blank', 'noopener,noreferrer');
    }
  };
  console.log(tourInfoData);
  return (
    <Sheet>
      <SheetTrigger className='flex-center bg-point-400 text-white000 h-12 w-full rounded-[12px] text-[18px] leading-[25.2px] font-bold'>
        주변 정보 보기
      </SheetTrigger>
      <SheetContent
        side='right'
        className='mobile-area bg-gray-bg flex h-screen w-screen flex-col'
      >
        <SheetHeader className='border-gray-0 flex-shrink-0 border-b-8'>
          <SheetTitle className='flex h-14 w-full items-center justify-between px-4 py-3'>
            <SheetClose>
              <span className='flex-center px-5 py-2.5'>
                <LeftArrowIcon />
              </span>
            </SheetClose>
            <span className='text-gray-bk text-[20px] leading-7 font-bold'>
              {COURSE_NAME}
            </span>
            <span className='size-13' />
          </SheetTitle>
        </SheetHeader>

        <CourseSurrondTab />

        <section className='custom-scrollbar flex h-[calc(100vh-64px-67.6px)] w-full flex-col gap-5 overflow-y-auto px-5'>
          {/* 필요한 것 이미지 url, 상호명, 식당카테고리, 운영중, 주소 */}
          {loading && (
            <div className='flex-center h-full w-full'>
              <LoadingSpinner />
            </div>
          )}
          {tourInfoData?.content.map((item, index) => (
            <div
              key={index}
              className='border-gray-1 flex h-auto w-full items-center justify-start gap-4 border-b pb-4.5'
            >
              <div className='bg-gray-1 relative aspect-[140/100] h-auto min-h-[100px] w-full max-w-[160px] min-w-[140px] flex-1 overflow-hidden rounded-[12px]'>
                <Image
                  src={item.imageUrl}
                  alt='course-surrond-info'
                  fill
                  sizes='100%'
                  priority
                  className='object-cover'
                />
              </div>
              <div className='relative flex h-full flex-1 flex-col justify-start gap-4'>
                <span className='flex flex-col gap-1'>
                  <h2 className='text-gray-bk line-clamp-1 text-[20px] leading-7 font-bold'>
                    {item.title}
                  </h2>
                  <span className='text-gray-bk flex items-center gap-2 text-[14px] leading-[16.8px] font-light'>
                    <span>{item.contentType}</span>
                    <span>|</span>
                    <span>{item.category}</span>
                  </span>
                </span>
                <p className='text-gray-bk text-[16px] leading-[19.2px] font-light'>
                  {item.address}
                </p>
                <button
                  className='text-body3 text-point-400 absolute right-0 bottom-0 h-auto w-fit'
                  onClick={() => handleNaverMapMove(item.mapX, item.mapY)}
                >
                  <ArrowRightIcon className='size-5' />
                </button>
              </div>
            </div>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}
