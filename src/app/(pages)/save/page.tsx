import { getFavoriteCourses } from '@/lib/api/save';
import { SavePageContent } from './_components/save-page-content';

export default async function SavePage() {
  const favoriteCourses = await getFavoriteCourses();
  return (
    <div className='flex h-screen flex-col'>
      <header className='border-gray-0 bg-gray-bg mobile-area fixed top-0 right-0 left-0 z-50 flex h-[62px] flex-col items-center justify-center border-b-4 pt-1.5 pb-1'>
        <p className='text-title1'>찜</p>
      </header>
      <div className='mt-14'>
        <SavePageContent favoriteCourses={favoriteCourses.data!} />
      </div>
      <div className='h-25' />
    </div>
  );
}
