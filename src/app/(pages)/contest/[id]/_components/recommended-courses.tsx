import CourseCard from '@/components/course-card';

interface Course {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
}

interface RecommendedCoursesProps {
  courses: Course[];
}

/**
 * TODO : 코스 리스트 목록을 공통 컴포넌트로 분리
 */
export function RecommendedCourses({ courses }: RecommendedCoursesProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <>
      <nav className='bg-gray-0 h-2 w-full' />
      <div className='h-7' />

      <div className='px-4'>
        <h2 className='text-title2 mb-4'>같이 달리기 좋은 코스</h2>
        <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
          {courses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              location={course.location}
              imageUrl={course.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
