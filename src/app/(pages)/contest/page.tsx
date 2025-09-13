'use client';
import { ContestCard } from './_components/contest-card';
import { PageHeader } from '@/components/page-header';
import { useRouter } from 'next/navigation';

const CONTEST_DATA = [
  {
    id: '1',
    date: '09. 07.',
    day: '토요일',
    title: 'RUN SEOUL RUN',
    location: '서울, 시청 광장',
    distances: ['5km', '10km'],
    isUpcoming: true,
  },
  {
    id: '2',
    date: '09. 08.',
    day: '일요일',
    title: 'RUN SEOUL RUN',
    location: '서울, 시청 광장',
    distances: ['5km', '10km'],
  },
  {
    id: '3',
    date: '09. 07.',
    day: '월요일',
    title: 'RUN SEOUL RUN',
    location: '서울, 시청 광장',
    distances: ['5km', '10km'],
  },
  {
    id: '4',
    date: '09. 07.',
    day: '토요일',
    title: 'RUN SEOUL RUN',
    location: '서울, 시청 광장',
    distances: ['5km', '10km'],
  },
];

export default function ContestPage() {
  const router = useRouter();

  const handleContestClick = (id: string) => {
    router.push(`/contest/${id}`);
  };

  return (
    <div className='flex h-screen flex-col'>
      <PageHeader title='러닝 대회' />

      <nav className='bg-gray-0 h-2 w-full' />

      {/* 대회 목록 */}
      <div className='flex flex-col gap-7 overflow-y-auto px-4 py-5'>
        {CONTEST_DATA.map(contest => (
          <ContestCard
            key={contest.id}
            id={contest.id}
            date={contest.date}
            day={contest.day}
            title={contest.title}
            location={contest.location}
            distances={contest.distances}
            onClick={handleContestClick}
          />
        ))}
      </div>

      <div className='h-25' />
    </div>
  );
}
