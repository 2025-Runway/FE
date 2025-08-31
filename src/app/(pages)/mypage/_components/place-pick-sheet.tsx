'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/utils/cn';
import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { KOREA_REGIONS } from '../_constants/region.constant';
import { toast } from 'sonner';

const REGION_LIST = [
  '강원',
  '경북',
  '경남',
  '경기',
  '서울',
  '부산',
  '대전',
  '대구',
  '광주',
  '세종',
  '울산',
  '인천',
  '전남',
  '전북',
  '제주',
  '충남',
  '충북',
];

export function PlacePickSheet() {
  const [isActive, setIsActive] = useState('강원');
  const [isPickPlace, setIsPickPlace] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRegionClick = (item: string) => {
    setIsActive(item);
    // 스크롤을 맨 위로 이동
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceClick = (item: string) => {
    if (isPickPlace.includes(item)) {
      setIsPickPlace(isPickPlace.filter(place => place !== item));
    } else {
      setIsPickPlace([...isPickPlace, item]);
    }
  };

  const handlePlaceSubmit = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isPickPlace.length === 0) {
      toast.error('여행지를 선택해주세요.');
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    toast.success('여행지 설정이 완료되었습니다.');
    setIsPickPlace([]);
  };

  return (
    <Sheet>
      <SheetTrigger className='px-7 w-fit h-11 text-[16px] font-bold text-white000 leading-[22.4px] flex-center  rounded-[12px] bg-point-400'>
        여행지 설정하기
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='mobile-area max-w-[600px] h-screen flex flex-col'
      >
        <SheetHeader className='flex-shrink-0 border-b-8 border-gray-0'>
          <SheetTitle className='px-4 py-2 w-full h-13 flex justify-between items-center'>
            <SheetClose>
              <span className='px-2 size-13 flex-center'>
                <XIcon className='size-6' />
              </span>
            </SheetClose>
            <span className='text-[20px] font-bold text-gray-bk leading-7'>
              여행지 설정하기
            </span>
            <SheetClose>
              <span
                className='text-point-400 text-[14px] font-bold leading-[19.6px]'
                onClick={handlePlaceSubmit}
              >
                완료하기
              </span>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className='flex-shrink-0 pl-6 pt-11 pb-7.5 w-full h-auto flex flex-col itmes-end gap-3.5 border-b-8 border-gray-0'>
          <h1 className='text-[24px] fonr-medium text-gray-bk leading-[33.6px]'>
            여행, 어디로 떠나시나요?
          </h1>
          <div className='pb-3 flex items-center gap-2 overflow-x-auto custom-scrollbar'>
            {isPickPlace.length !== 0 ? (
              <>
                {isPickPlace.map(item => (
                  <span
                    key={item}
                    className='flex-shrink-0 px-4 py-2 w-fit h-10 bg-point-000 border-2 border-point-400 rounded-[20px] text-[14px] font-bold text-point-400 leading-[19.6px]'
                    onClick={() => handlePlaceClick(item)}
                  >
                    {item}
                  </span>
                ))}
              </>
            ) : (
              <div className='py-2 w-fit h-10 text-[14px] font-medium text-point-400 leading-[19.6px]'>
                선택된 여행지가 없습니다.
              </div>
            )}
          </div>
        </div>

        <section className='w-full h-[calc(100vh-60px-177.6px)] flex'>
          <aside className='py-5 px-3 max-w-28 h-auto flex flex-col items-center bg-gray-0 overflow-y-auto scrollbar-hide'>
            {REGION_LIST.map(item => (
              <span
                key={item}
                className={cn(
                  'flex-shrink-0 w-22 h-9 flex-center text-[16px] font-medium text-gray-bk leading-[22.4px] bg-transparent',
                  isActive === item && 'bg-white000 rounded-full font-bold',
                )}
                onClick={() => handleRegionClick(item)}
              >
                {item}
              </span>
            ))}
          </aside>
          <div
            ref={scrollRef}
            className='flex-1 py-7 pl-7 w-full h-auto overflow-y-auto custom-scrollbar flex flex-col gap-4'
          >
            <h4 className='pl-2 text-[16px] font-bold text-gray-bk leading-[22.4px]'>
              {isActive} 전체
            </h4>

            {KOREA_REGIONS[isActive as keyof typeof KOREA_REGIONS].map(item => (
              <span
                key={item.name}
                className={cn(
                  'w-fit h-auto px-3 py-1 text-[16px] font-medium text-gray-bk leading-[22.4px] border border-transparent rounded-full bg-transparent transition-all duration-300 cursor-pointer',
                  isPickPlace.includes(item.name) &&
                    '  border-point-400 bg-point-000',
                )}
                onClick={() => handlePlaceClick(item.name)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
