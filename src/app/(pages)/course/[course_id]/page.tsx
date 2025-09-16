import { MOCK_COURSE_DATA } from '@/utils/mockdata/course.mock';
import { CourseImage } from '../_components/course-image';
import { CourseDetail } from '../_components/course-detail';
import { CourseMap } from '../_components/course-map';
import { CourseDescription } from '../_components/course-description';
import { CourseRunwayPoint } from '../_components/course-runway-point';

interface CoursePageProps {
  params: Promise<{ course_id: string }>; // Promise로 변경!
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course_id } = await params;

  const mockCourse = MOCK_COURSE_DATA;

  return (
    // scroll layout
    <div className='custom-scrollbar bg-gray-bg h-full w-full overflow-y-auto scroll-smooth pb-10'>
      <div className='flex h-auto w-full flex-col'>
        <CourseImage imageUrl={mockCourse.crsImg ?? ''} />
        <CourseDetail course={mockCourse} />
        <CourseMap />
        <CourseDescription description={mockCourse.crsContents} />
        <CourseRunwayPoint
          crsSummary={mockCourse.crsSummary}
          crsTourInfo={mockCourse.crsTourInfo}
          travelerInfo={mockCourse.travelerInfo}
        />
      </div>
    </div>
  );
}
