import CourseCard from './course-card';
import CourseSkeleton from './course-skeleton';

interface Course {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
}

interface PopularCourseProps {
  courses: Course[];
  isLoading: boolean;
}

export default function PopularCourse({
  courses,
  isLoading,
}: PopularCourseProps) {
  return (
    <section>
      <p className='text-gray-bk mb-3 text-[18px] font-bold'>인기 코스</p>

      {isLoading ? (
        <CourseSkeleton />
      ) : (
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
      )}
    </section>
  );
}
