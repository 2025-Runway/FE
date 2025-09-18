'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/utils/cn';
import { ContestInfo } from './_components/contest-info';
import { ContestDetails } from './_components/contest-details';
import { RecommendedCourses } from './_components/recommended-courses';
import { getMarathonDetail } from '@/lib/api/contest';
import { MarathonDetail } from '@/interfaces/contest/contest.types';

interface ContestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ContestDetailPage({ params }: ContestDetailPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [contestData, setContestData] = useState<MarathonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContestDetail = async () => {
      try {
        const response = await getMarathonDetail(resolvedParams.id);
        setContestData(response.data);
      } catch (error) {
        console.error('Failed to fetch contest detail:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchContestDetail();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className='flex h-screen flex-col bg-gray-50'>
        <PageHeader
          title='러닝 대회'
          isLeftIcon
          onClickLeftIcon={() => router.back()}
        />
        <div className='flex flex-1 items-center justify-center'>
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!contestData) {
    return (
      <div className='flex h-screen flex-col bg-gray-50'>
        <PageHeader
          title='러닝 대회'
          isLeftIcon
          onClickLeftIcon={() => router.back()}
        />
        <div className='flex flex-1 items-center justify-center'>
          <div>대회 정보를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

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
          date={`${contestData.month}. ${contestData.day}.`}
          day={contestData.dayOfWeek}
          title={contestData.title}
          location={contestData.addr}
          distances={contestData.prices.map(price => price.type)}
        />

        <ContestDetails
          organizer={contestData.host}
          fees={contestData.prices.map(price => ({
            distance: price.type,
            price: price.price,
            label: `(${price.type})`,
          }))}
        />

        <div className='h-9' />

        <RecommendedCourses
          courses={contestData.courseInfos.map(course => ({
            id: course.crsIdx,
            title: course.crsKorNm,
            location: course.sigun,
            imageUrl: course.crsImgUrl,
            crsIdx: course.crsIdx,
          }))}
        />

        <div className='h-12' />
        <div
          className={cn('px-5 pt-5', {
            'border-gray-1 border-t': contestData.courseInfos.length > 0,
          })}
        >
          <button
            className='text-title2 bg-point-400 w-full rounded-[12px] py-3 text-white'
            onClick={() => window.open(contestData.homepageUrl, '_blank')}
          >
            홈페이지로 이동하기
          </button>
        </div>
      </div>

      <div className='h-25' />
    </div>
  );
}
