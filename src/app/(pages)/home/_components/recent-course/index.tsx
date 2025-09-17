'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCourseHistory } from '../../_hooks/use-course-history';
import { RecentCourseSkeleton } from './recent-course-skeleton';

export function RecentCourse() {
  const router = useRouter();
  const { data: courseHistoryResponse, isLoading } = useCourseHistory();
  const courseHistory = courseHistoryResponse?.data;

  const handleClick = () => {
    if (courseHistory?.crsIdx) {
      router.push(`/course/${courseHistory.crsIdx}`);
    }
  };

  if (isLoading) {
    return <RecentCourseSkeleton />;
  }

  if (!courseHistory) {
    return (
      <section className='flex flex-col gap-3 px-5'>
        <h2 className='text-gray-bk text-[18px] font-bold'>최근 본 코스</h2>
        <div className='flex items-center justify-center h-[140px] w-full rounded-[20px] bg-gray-1'>
          <p className='text-gray-4 text-[16px]'>최근 본 코스가 없습니다</p>
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col gap-3 px-5'>
      <h2 className='text-gray-bk text-[18px] font-bold'>최근 본 코스</h2>

      <div
        className='relative h-[140px] w-full overflow-hidden rounded-[20px] cursor-pointer transition-transform hover:scale-[1.02]'
        onClick={handleClick}
      >
        <Image
          src={courseHistory.crsImgUrl || '/img/home/home.png'}
          alt='최근 본 코스 배경 이미지'
          fill
          className='object-cover'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/60' />

        <section className='z-50 flex h-full w-full flex-col justify-end px-4 py-4'>
          <p className='text-white000 z-50 text-[18px] leading-[140%] font-bold'>
            {courseHistory.crsKorNm}
          </p>
          <p className='text-white000 text-body4 z-50'>
            {courseHistory.sigun}
          </p>
        </section>
      </div>
    </section>
  );
}
