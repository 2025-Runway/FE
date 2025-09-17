import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  crsIdx?: string;
}

interface RecommendedCoursesProps {
  courses: Course[];
}

function ContestCourseCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleClick = () => {
    if (course.crsIdx) {
      router.push(`/course/${course.crsIdx}`);
    }
  };

  return (
    <div
      className='relative h-[196px] w-[168px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] transition-transform hover:scale-105'
      onClick={handleClick}
    >
      <Image
        src={course.imageUrl}
        alt={`${course.title} 코스 이미지`}
        fill
        className='object-cover'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

      <div className='absolute bottom-4 left-4 text-white'>
        <p className='text-white000 text-[18px] leading-[140%] font-bold'>
          {course.title}
        </p>
        <p className='text-white000 text-[14px] font-light'>
          {course.location}
        </p>
      </div>
    </div>
  );
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
            <ContestCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
