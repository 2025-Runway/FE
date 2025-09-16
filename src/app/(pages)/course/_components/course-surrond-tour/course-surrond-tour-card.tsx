import { TourInfoItem } from '@/interfaces/course/tour-info.types';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

function CourseSurrondTourCard({ item }: { item: TourInfoItem }) {
  const handleNaverMapMove = (mapX: number, mapY: number) => {
    // 네이버지도 직접 좌표 이동 URL
    const naverMapUrl = `https://map.naver.com/v5/search/${mapY},${mapX}`;

    if (window.confirm('네이버 지도로 이동하시겠습니까?')) {
      // 새 탭에서 열기
      window.open(naverMapUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <>
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
    </>
  );
}
export const CourseSurrondTourCardComponent = memo(CourseSurrondTourCard);
