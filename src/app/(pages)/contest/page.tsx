'use client';

import { useQuery } from '@tanstack/react-query';
import { ContestCard } from './_components/contest-card';
import { PageHeader } from '@/components/page-header';
import { useRouter } from 'next/navigation';
import { getMarathons } from '@/lib/api/contest';
import { ContestSkeleton } from './_components/contest-skeleton';

export default function ContestPage() {
  const router = useRouter();

  const { data: marathonData, isLoading } = useQuery({
    queryKey: ['marathons', 1],
    queryFn: () => getMarathons(1),
  });

  const handleContestClick = (id: string) => {
    router.push(`/contest/${id}`);
  };

  return (
    <div className='flex h-screen flex-col'>
      <PageHeader title='러닝 대회' />

      <nav className='bg-gray-0 h-2 w-full' />

      {/* 대회 목록 */}
      {isLoading ? (
        <ContestSkeleton />
      ) : (
        <div className='flex flex-col gap-7 overflow-y-auto px-4 py-5'>
          {marathonData?.data?.content?.map(item => {
            const marathon = item.data;
            return (
              <ContestCard
                key={marathon.marathonId}
                id={marathon.marathonId.toString()}
                date={`${marathon.month}. ${marathon.day}.`}
                day={marathon.dayOfWeek}
                title={marathon.title}
                location={marathon.addr}
                distances={marathon.types}
                onClick={handleContestClick}
              />
            );
          })}
        </div>
      )}

      <div className='h-50' />
    </div>
  );
}
