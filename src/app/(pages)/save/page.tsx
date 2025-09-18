'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptySave } from './_components/empty-save';
import { LoadingSkeleton } from './_components/loading-skeleton';
import { RegionCoursesList } from './_components/region-courses-list';
import { getFavoriteCourses } from '@/lib/api/save';

function SavePageContent() {
  const { data: favoriteCourses, isLoading } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: getFavoriteCourses,
  });

  const hasAnyCourses =
    favoriteCourses?.data && favoriteCourses.data.length > 0;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!hasAnyCourses) {
    return <EmptySave />;
  }

  return <RegionCoursesList regions={favoriteCourses.data!} />;
}

export default function SavePage() {
  return (
    <div className='flex h-screen flex-col'>
      <header className='border-gray-0 bg-gray-bg fixed top-0 right-0 left-0 mt-[6px] mb-1 flex h-[52px] flex-col items-center justify-center border-b-8'>
        <p className='text-title1'>찜</p>
      </header>
      <div className='mt-14'>
        <SavePageContent />
      </div>
      <div className='h-25' />
    </div>
  );
}
