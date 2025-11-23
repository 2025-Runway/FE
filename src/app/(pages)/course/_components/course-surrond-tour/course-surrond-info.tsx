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
import { useCallback, useEffect, useState } from 'react';
import { CourseSurrondTab } from './course-surrond-tab';
import { usePathname } from 'next/navigation';
import { useTourInfo } from '../../_hooks/use-tour-info';
import { useTourTab } from '../../_hooks/use-tour-tab';
import { TourInfoItem } from '@/interfaces/course/tour-info.types';
import { useInfiniteScroll } from '../../_hooks/use-infinite-scroll';
import { CourseSurrondTourCardComponent } from './course-surrond-tour-card';

export function CourseSurrondInfo() {
  const pathname = usePathname();
  const course_id = pathname.split('/course/')[1];
  const [currentPage, setCurrentPage] = useState(1);
  const [allTourInfo, setAllTourInfo] = useState<TourInfoItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [crsKorNm, setCrsKorNm] = useState('');

  const [cachedData, setCachedData] = useState<Record<string, TourInfoItem[]>>(
    {},
  );
  const { activeTab, setActiveTab } = useTourTab();
  const { data: tourInfoData, loading } = useTourInfo(
    course_id ?? '',
    activeTab,
    currentPage,
  );

  //
  // 새로운 관광 데이터가 로드될 때마다 상태 업데이트 및 캐싱 처리
  useEffect(() => {
    const crsKorNm = localStorage.getItem('crsKorNm');
    setCrsKorNm(crsKorNm ?? '');
    if (tourInfoData) {
      const cacheKey = `${course_id}-${activeTab}`;

      if (currentPage === 1) {
        setAllTourInfo(tourInfoData.content);
        setCachedData(prev => ({
          ...prev,
          [cacheKey]: tourInfoData.content,
        }));
      } else {
        setAllTourInfo(prev => [...prev, ...tourInfoData.content]);
        setCachedData(prev => ({
          ...prev,
          [cacheKey]: [...(prev[cacheKey] || []), ...tourInfoData.content],
        }));
      }

      setHasNextPage(!tourInfoData.last);
      setIsLoading(false);
    }
  }, [tourInfoData, currentPage, course_id, activeTab, crsKorNm]);

  // 무한 스크롤을 위한 다음 페이지 로드 핸들러
  const handleLoadMore = useCallback(() => {
    if (!loading && hasNextPage) {
      setIsLoading(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, hasNextPage]);

  // 무한 스크롤 구현을 위한 Intersection Observer 설정
  const { lastElementRef } = useInfiniteScroll({
    hasNextPage,
    isLoading: loading || isLoading,
    onLoadMore: handleLoadMore,
    threshold: 0.1,
    rootMargin: '100px',
  });

  // 탭 변경 시 캐시된 데이터 처리 및 상태 초기화
  useEffect(() => {
    const cacheKey = `${course_id}-${activeTab}`;
    const cached = cachedData[cacheKey];

    if (cached) {
      setAllTourInfo(cached);
      // 캐시된 데이터가 있으면 API 요청하지 않음
    } else {
      setCurrentPage(1);
      setAllTourInfo([]);
      setHasNextPage(true);
    }
  }, [activeTab, course_id, cachedData]);

  return (
    <Sheet>
      <SheetTrigger
        className='flex-center bg-point-400 text-white000 h-12 w-full rounded-[12px] text-[18px] leading-[25.2px] font-bold'
        onClick={() => setActiveTab('전체')}
      >
        주변 정보 보기
      </SheetTrigger>
      <SheetContent
        side='right'
        className='bg-gray-bg flex h-screen w-full flex-col'
      >
        <SheetHeader className='border-gray-0 flex-shrink-0 border-b-8'>
          <SheetTitle className='flex h-14 w-full items-center justify-between px-4 py-3'>
            <SheetClose>
              <span className='flex-center px-5 py-2.5'>
                <LeftArrowIcon />
              </span>
            </SheetClose>
            <span className='text-gray-bk text-[20px] leading-7 font-bold'>
              {crsKorNm}
            </span>
            <span className='size-13' />
          </SheetTitle>
        </SheetHeader>

        <CourseSurrondTab />

        <section
          id='tour-info-scroll-container'
          className='custom-scrollbar flex h-[calc(100vh-64px-67.6px)] w-full flex-col gap-5 overflow-y-auto px-5'
        >
          {allTourInfo.map((item, index) => {
            const shouldAttachObserver = index % 10 === 5; // 6번째 (0-based index 5)
            return (
              <div
                key={`${item.contentId}-${index}`}
                ref={shouldAttachObserver ? lastElementRef : null}
                className='border-gray-1 flex h-auto w-full items-center justify-start gap-4 border-b pb-4.5'
              >
                <CourseSurrondTourCardComponent item={item} />
              </div>
            );
          })}
        </section>
      </SheetContent>
    </Sheet>
  );
}
