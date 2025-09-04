import { MOCK_COURSE_DATA } from '@/utils/mockdata/course.mock';
import { CourseImage } from '../_components/course-image';
import { CourseDetail } from '../_components/course-detail';
import { CourseMap } from '../_components/course-map';
import { CourseDescription } from '../_components/course-description';
import { CourseRunwayPoint } from '../_components/course-runway-point';

interface CoursePageProps {
  params: {
    course_id: Promise<string>;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course_id } = await params;

  const mockCourse = MOCK_COURSE_DATA;

  return (
    // scroll layout
    <div className='pb-10 w-full h-full overflow-y-auto custom-scrollbar scroll-smooth bg-gray-bg'>
      <div className='w-full h-auto flex flex-col '>
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
