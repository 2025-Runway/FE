import { CourseCard } from './course-card';
import { CourseSkeleton } from './course-skeleton';
import type { PopularCourse } from '@/interfaces/home/home.types';

interface PopularCourseProps {
  courses: PopularCourse[];
  isLoading: boolean;
}

export function PopularCourse({ courses, isLoading }: PopularCourseProps) {
  return (
    <section>
      <p className='text-gray-bk mb-3 text-[18px] font-bold'>인기 코스</p>

      {isLoading ? (
        <CourseSkeleton />
      ) : (
        <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
          {courses.map(course => (
            <CourseCard
              key={course.crsIdx}
              title={course.crsKorNm}
              location={course.sigun}
              imageUrl={course.crsImgUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}
