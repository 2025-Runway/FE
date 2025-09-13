'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/utils/cn';
import { ContestInfo } from './_components/contest-info';
import { ContestDetails } from './_components/contest-details';
import { RecommendedCourses } from './_components/recommended-courses';

const CONTEST_DETAIL = {
  id: '1',
  date: '09. 07.',
  day: '토요일',
  title: 'RUN SEOUL RUN',
  location: '서울, 시청 광장',
  distances: ['5km', '10km'],
  period: '2025. 09. 01 - 2025. 09. 07',
  organizer: '이데일리M',
  fees: [
    { distance: '5km', price: 79000, label: '(하프)' },
    { distance: '10km', price: 59000, label: '(10km)' },
  ],
};

const RECOMMENDED_COURSES = [
  {
    id: '1',
    title: '망양강 자전거길',
    location: '경남 말양시',
    imageUrl: '/img/home/home.png',
  },
  {
    id: '2',
    title: '망양강 자전거길',
    location: '경남 말양시',
    imageUrl: '/img/home/home.png',
  },
  {
    id: '3',
    title: '망양강 자전거길',
    location: '경남 말양시',
    imageUrl: '/img/home/home.png',
  },
];

interface ContestDetailPageProps {
  params: {
    id: string;
  };
}

export default function ContestDetailPage({ params }: ContestDetailPageProps) {
  const router = useRouter();

  return (
    <div className='flex h-screen flex-col bg-gray-50'>
      <PageHeader
        title='러닝 대회'
        isLeftIcon
        onClickLeftIcon={() => router.back()}
      />

      <nav className='bg-gray-0 h-2 w-full' />

      <div className='flex-1 overflow-y-auto'>
        <ContestInfo
          date={CONTEST_DETAIL.date}
          day={CONTEST_DETAIL.day}
          title={CONTEST_DETAIL.title}
          location={CONTEST_DETAIL.location}
          distances={CONTEST_DETAIL.distances}
        />

        <ContestDetails
          period={CONTEST_DETAIL.period}
          organizer={CONTEST_DETAIL.organizer}
          fees={CONTEST_DETAIL.fees}
        />

        <div className='h-9' />

        <RecommendedCourses courses={RECOMMENDED_COURSES} />

        <div className='h-12' />
        <div
          className={cn('px-5 pt-5', {
            'border-gray-1 border-t': RECOMMENDED_COURSES.length > 0,
          })}
        >
          <button className='text-title2 bg-point-400 w-full rounded-[12px] py-3 text-white'>
            홈페이지로 이동하기
          </button>
        </div>
      </div>

      <div className='h-25' />
    </div>
  );
}
