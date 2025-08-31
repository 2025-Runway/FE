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
const COURSE_NAME = '남파랑길 1코스';

export function CourseSurrondInfo() {
  return (
    <Sheet>
      <SheetTrigger className='w-full h-12 flex-center bg-point-400 rounded-[12px] text-[18px] font-bold text-white000 leading-[25.2px]'>
        주변 정보 보기
      </SheetTrigger>
      <SheetContent
        side='right'
        className='mobile-area w-screen h-screen flex flex-col bg-gray-bg'
      >
        <SheetHeader className='flex-shrink-0 border-b-8 border-gray-0'>
          <SheetTitle className='px-4 py-3 w-full h-14 flex justify-between items-center'>
            <SheetClose>
              <span className='px-5 py-2.5 flex-center'>
                <LeftArrowIcon />
              </span>
            </SheetClose>
            <span className='text-[20px] font-bold text-gray-bk leading-7'>
              {COURSE_NAME}
            </span>
            <span className='size-13' />
          </SheetTitle>
        </SheetHeader>

        <CourseSurrondTab />

        <section className='px-5 w-full h-[calc(100vh-64px-67.6px)] flex flex-col gap-5 overflow-y-auto custom-scrollbar'>
          {/* 필요한 것 이미지 url, 상호명, 식당카테고리, 운영중, 주소 */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className='pb-4.5 w-full h-auto flex items-center justify-start gap-4 border-b border-gray-1'
            >
              <div className='relative min-w-[140px] max-w-[160px] min-h-[100px] w-full h-auto aspect-[140/100] rounded-[12px] overflow-hidden'>
                <Image
                  src={'/img/home/image.png'}
                  alt='course-surrond-info'
                  fill
                  sizes='100%'
                  priority
                  className='object-cover'
                />
              </div>
              <div className='flex-1 py-2 flex flex-col gap-4'>
                <span className='flex flex-col gap-1'>
                  <h2 className='text-[20px] font-bold text-gray-bk leading-7'>
                    시홍쓰
                  </h2>
                  <span className='text-[14px] font-light text-gray-bk leading-[16.8px] flex items-center gap-2'>
                    <span>중식당</span>
                    <span>|</span>
                    <span>운영중</span>
                  </span>
                </span>
                <p className='text-[16px] font-light text-gray-bk leading-[19.2px]'>
                  서울 광진구 능동로17길 5 1층
                </p>
              </div>
            </div>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}
