import { HomeHeader, RecentCourse, CourseSection } from './_components';

export default function HomePage() {
  return (
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
  );
}
