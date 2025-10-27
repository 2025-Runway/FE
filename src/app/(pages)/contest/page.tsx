'use client';

import { useQuery } from '@tanstack/react-query';
import { ContestCard } from './_components/contest-card';
import { useRouter } from 'next/navigation';
import { getMarathons } from '@/lib/api/contest';
import { useInfiniteScroll } from '../course/_hooks/use-infinite-scroll';
import { useCallback, useEffect, useState } from 'react';
import { Marathon } from '@/interfaces/contest/contest.types';

export default function ContestPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [allMarathons, setAllMarathons] = useState<Marathon[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { data: marathonData, isLoading: loading } = useQuery({
    queryKey: ['marathons', currentPage],
    queryFn: () => getMarathons(currentPage),
  });

  // 새로운 대회 데이터가 로드될 때마다 상태 업데이트
  useEffect(() => {
    if (marathonData?.data) {
      const newMarathons = marathonData.data.content.map(item => item.data);

      if (currentPage === 1) {
        setAllMarathons(newMarathons);
      } else {
        setAllMarathons(prev => [...prev, ...newMarathons]);
      }

      setHasNextPage(!marathonData.data.last);
      setIsLoading(false);
    }
  }, [marathonData, currentPage]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasNextPage) {
      setIsLoading(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, hasNextPage]);

  const { lastElementRef } = useInfiniteScroll({
    hasNextPage,
    isLoading: loading || isLoading,
    onLoadMore: handleLoadMore,
    threshold: 0.1,
    rootMargin: '100px',
  });

  const handleContestClick = (id: string) => {
    router.push(`/contest/${id}`);
  };

  return (
    <div className='flex h-screen flex-col'>
      <header className='border-gray-0 bg-gray-bg mobile-area fixed top-0 right-0 left-0 z-50 flex h-[62px] flex-col items-center justify-center border-b-4 pt-1.5 pb-1'>
        <p className='text-title1'>러닝 대회</p>
      </header>
      <div className='mt-14'>
        {/* 대회 목록 */}
        <div className='flex-1 overflow-y-auto px-5 pt-9'>
          {allMarathons.map((marathon, index) => {
            const shouldAttachObserver = index % 10 === 5;

            return (
              <div
                key={`${marathon.marathonId}-${index}`}
                ref={shouldAttachObserver ? lastElementRef : null}
              >
                <ContestCard
                  id={marathon.marathonId.toString()}
                  date={`${marathon.month}. ${marathon.day}.`}
                  day={marathon.dayOfWeek}
                  title={marathon.title}
                  location={marathon.addr}
                  distances={marathon.types}
                  onClick={handleContestClick}
                />
              </div>
            );
          })}
        </div>
        <div className='h-16' />
      </div>
    </div>
  );
}
