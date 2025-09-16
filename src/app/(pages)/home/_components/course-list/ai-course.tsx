import { useState } from 'react';
import { CourseCard } from './course-card';
import { Info } from 'lucide-react';
import { InfoModal } from './info-modal';
import { CourseSkeleton } from './course-skeleton';
import { PopularCourse } from '@/interfaces/home/home.types';

interface AICourseProps {
  courses: PopularCourse[];
  isLoading: boolean;
}

export function AICourse({ courses, isLoading }: AICourseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className='relative'>
      <div className='mb-3 flex items-center gap-1'>
        <p className='text-gray-bk text-[18px] font-bold'>AI 추천 코스</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className='hover:bg-gray-1 rounded-full transition-colors'
        >
          <Info className='text-gray-3 h-4 w-4' />
        </button>
      </div>

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

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
