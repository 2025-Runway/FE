import { CourseCard } from './_components/course-card';
import { EmptySave } from './_components/empty-save';

const SEOUL_COURSES = [
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

export default function SavePage() {
  const hasAnyCourses = SEOUL_COURSES.length > 0;

  return (
    <div className='flex h-screen flex-col'>
      <header className='mt-[6px] mb-1 flex h-[52px] items-center justify-center'>
        <p className='text-title1'>찜</p>
      </header>
      <nav className='bg-gray-0 h-2 w-full' />

      {/**
       * 찜 코스 여부에 따라 UI 변경
       */}
      {!hasAnyCourses ? (
        <EmptySave />
      ) : (
        <div className='flex-1 overflow-y-auto pt-9 pl-5'>
          {SEOUL_COURSES.length > 0 && (
            <div className='mb-8'>
              <h2 className='text-title2 mb-3'>서울</h2>
              <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
                {SEOUL_COURSES.map(course => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    location={course.location}
                    imageUrl={course.imageUrl}
                    className='h-50 w-44 flex-shrink-0'
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
