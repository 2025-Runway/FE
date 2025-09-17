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
import {
  KOREA_REGIONS,
  Place,
  ProvinceKey,
} from '../_constants/region.constant';
import { toast } from 'sonner';
import { setDestination } from '@/lib/api/mypage';

const findPlaceByName = (placeName: string): Place | null => {
  for (const province of Object.values(KOREA_REGIONS)) {
    const foundPlace = province.find(place => place.name === placeName);
    if (foundPlace) {
      return foundPlace;
    }
  }
  return null;
};
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
] as ProvinceKey[];

export function PlacePickSheet({
  sheetState,
  refetch,
  defaultIsPickPlace,
}: {
  sheetState: 'edit' | 'create';
  refetch: () => void;
  defaultIsPickPlace: string | null;
}) {
  const [isActive, setIsActive] = useState<ProvinceKey>('강원');
  const [isPickPlace, setIsPickPlace] = useState<Place | null>(() => {
    if (!defaultIsPickPlace) return null;

    const foundPlace = findPlaceByName(defaultIsPickPlace);
    return foundPlace ?? { name: defaultIsPickPlace, type: '시' };
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRegionClick = (item: ProvinceKey) => {
    setIsActive(item);
    // 스크롤을 맨 위로 이동
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceClick = (item: Place) => {
    if (isPickPlace === item) {
      setIsPickPlace(null);
    } else {
      setIsPickPlace(item);
    }
  };

  const handlePlaceSubmit = async (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isPickPlace === null) {
      toast.error('여행지를 선택해주세요.');
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    try {
      await setDestination(isPickPlace?.name);
      refetch();
      toast.success('여행지 설정이 완료되었습니다.');
      setIsPickPlace(null);
      setIsActive('강원');
    } catch (error) {
      toast.error('여행지 설정에 실패했습니다.');
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };
  return (
    <Sheet>
      <SheetTrigger
        className={`${
          sheetState === 'create'
            ? 'text-white000 flex-center bg-point-400 h-11 w-fit rounded-[12px] px-7 text-[16px] leading-[22.4px] font-bold'
            : 'border-white000 flex-center text-title4 text-white000 bg-[rgba(255, 255, 255, 0.20)] absolute top-12 right-5 h-11 w-fit rounded-[12px] border bg-transparent px-7 backdrop-blur-[4px]'
        }`}
      >
        {sheetState === 'create' ? '여행지 설정하기' : '수정하기'}
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='mobile-area flex h-screen max-w-[600px] flex-col'
      >
        <SheetHeader className='border-gray-0 flex-shrink-0 border-b-8'>
          <SheetTitle className='flex h-13 w-full items-center justify-between px-4 py-2'>
            <SheetClose
              onClick={() => {
                setIsPickPlace(
                  defaultIsPickPlace
                    ? findPlaceByName(defaultIsPickPlace)
                    : null,
                );
              }}
            >
              <span className='flex-center size-13 px-2'>
                <XIcon className='size-6' />
              </span>
            </SheetClose>
            <span className='text-gray-bk text-[20px] leading-7 font-bold'>
              여행지 설정하기
            </span>
            <SheetClose>
              <span
                className='text-point-400 text-[14px] leading-[19.6px] font-bold'
                onClick={handlePlaceSubmit}
              >
                완료하기
              </span>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className='itmes-end border-gray-0 flex h-auto w-full flex-shrink-0 flex-col gap-3.5 border-b-8 pt-11 pb-7.5 pl-6'>
          <h1 className='font-extralight-medium text-gray-bk text-[24px] leading-[33.6px]'>
            여행, 어디로 떠나시나요?
          </h1>
          <div className='custom-scrollbar flex items-center gap-2 overflow-x-auto pb-3'>
            {isPickPlace !== null ? (
              <span
                className='bg-point-000 border-point-400 text-point-400 h-10 w-fit flex-shrink-0 rounded-[20px] border-2 px-4 py-2 text-[14px] leading-[19.6px] font-bold'
                onClick={() => handlePlaceClick(isPickPlace)}
              >
                {isPickPlace.name}
              </span>
            ) : (
              <div className='text-point-400 h-10 w-fit py-2 text-[14px] leading-[19.6px] font-medium'>
                선택된 여행지가 없습니다.
              </div>
            )}
          </div>
        </div>

        <section className='flex h-[calc(100vh-60px-177.6px)] w-full'>
          <aside className='bg-gray-0 scrollbar-hide flex h-auto max-w-28 flex-col items-center overflow-y-auto px-3 py-5'>
            {REGION_LIST.map(item => (
              <span
                key={item}
                className={cn(
                  'flex-center text-gray-bk h-9 w-22 flex-shrink-0 bg-transparent text-[16px] leading-[22.4px] font-medium',
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
            className='custom-scrollbar flex h-auto w-full flex-1 flex-col gap-4 overflow-y-auto py-7 pl-7'
          >
            <h4 className='text-gray-bk pl-2 text-[16px] leading-[22.4px] font-bold'>
              {isActive} 전체
            </h4>

            {KOREA_REGIONS[isActive].map(item => (
              <span
                key={item.name}
                className={cn(
                  'text-gray-bk h-auto w-fit cursor-pointer rounded-full border border-transparent bg-transparent px-3 py-1 text-[16px] leading-[22.4px] font-medium transition-all duration-300',
                  isPickPlace === item &&
                    'text-point-400 border-point-400 bg-point-000',
                )}
                onClick={() => handlePlaceClick(item)}
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
