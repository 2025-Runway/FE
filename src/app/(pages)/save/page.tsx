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
      <header className='mt-[6px] mb-1 flex h-[52px] items-center justify-center'>
        <p className='text-title1'>찜</p>
      </header>
      <nav className='bg-gray-0 h-2 w-full' />
      <SavePageContent />
      <div className='h-25' />
    </div>
  );
}
