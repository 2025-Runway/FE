import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { HomeHeader, RecentCourse, CourseSection } from './_components';
import {
  getUserDataCached,
  getPopularCourses,
  getRecommendedCourses,
  getCourseHistory,
} from '@/lib/api/home';

export default async function HomePage() {
  const queryClient = new QueryClient();

  // 데이터 미리 가져오기 - 병렬 prefetch
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['userData'],
      queryFn: getUserDataCached,
    }),
    queryClient.prefetchQuery({
      queryKey: ['popularCourses'],
      queryFn: getPopularCourses,
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendedCourses'],
      queryFn: getRecommendedCourses,
    }),
    queryClient.prefetchQuery({
      queryKey: ['courseHistory'],
      queryFn: getCourseHistory,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='flex w-full flex-col'>
        <HomeHeader />
        <div className='py-8'>
          <RecentCourse />
        </div>
        <hr className='bg-gray-0 h-2 w-full' />
        <div className='py-4'>
          <CourseSection />
        </div>
        <div className='h-[64px]' />
      </main>
    </HydrationBoundary>
  );
}
