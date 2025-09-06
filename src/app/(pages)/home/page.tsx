import { HomeHeader, RecentCourse } from './_components';

export default function HomePage() {
  return (
    <main className='flex h-full w-full flex-col'>
      <HomeHeader />
      <div className='py-6'>
        <RecentCourse />
      </div>
    </main>
  );
}
