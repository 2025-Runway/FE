import { CourseCard } from './course-card';
import { FavoriteCoursesByRegion, FavoriteCourse } from '@/interfaces/save/save.types';

interface RegionSectionProps {
  region: string;
  courses: FavoriteCourse[];
}

function RegionSection({ region, courses }: RegionSectionProps) {
  return (
    <div className='mb-8'>
      <h2 className='text-title2 mb-3'>{region}</h2>
      <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
        {courses.map(course => (
          <CourseCard
            key={course.crsIdx}
            title={course.crsKorNm}
            location={course.sigun}
            imageUrl={course.crsImgUrl}
            crsIdx={course.crsIdx}
            className='h-50 w-44 flex-shrink-0'
          />
        ))}
      </div>
    </div>
  );
}

interface RegionCoursesListProps {
  regions: FavoriteCoursesByRegion[];
}

export function RegionCoursesList({ regions }: RegionCoursesListProps) {
  return (
    <div className='flex-1 overflow-y-auto pt-9 pl-5'>
      {regions.map(regionData => (
        <RegionSection
          key={regionData.region}
          region={regionData.region}
          courses={regionData.courses}
        />
      ))}
    </div>
  );
}