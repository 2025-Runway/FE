import { MOCK_COURSE_DATA } from '@/utils/mockdata/course.mock';
import { CourseImage } from '../_components/course-image';
import { CourseDetail } from '../_components/course-detail';
import { CourseMap } from '../_components/course-map';
import { CourseDescription } from '../_components/course-description';
import { CourseRunwayPoint } from '../_components/course-runway-point';
import { api } from '@/lib/api';
import { getCourseAISummary, getCourseDetail } from '@/lib/api/courses';
import { Suspense } from 'react';
import { Divide } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import MainPointLogo from '@/public/svg/logo/main-point-logo.svg';
import Link from 'next/link';

interface CoursePageProps {
  params: Promise<{ course_id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course_id } = await params;

  const courseDetail = await getCourseDetail(course_id).then(res => res.data);

  if (!courseDetail) {
    return (
      <div className='flex-col-center text-gray-4 text-title2 h-full w-full gap-1'>
        <p>코스 정보를 찾을 수 없습니다.</p>
        <p>다른 코스를 이용해주세요.</p>
        <Link
          href='/home'
          className='text-point-400 border-point-400 hover:bg-point-000 mt-2 h-auto w-fit cursor-pointer rounded-[12px] border px-8 py-2'
        >
          홈으로 이동
        </Link>
      </div>
    );
  }

  return (
    // scroll layout
    <div className='custom-scrollbar bg-gray-bg h-full w-full overflow-y-auto scroll-smooth pb-10'>
      <div className='flex h-auto w-full flex-col'>
        <CourseImage imageUrl={courseDetail.crsImg ?? ''} />
        <CourseDetail course={courseDetail} />
        <CourseMap gpxUrl={courseDetail.gpxFilePath} />
        <CourseDescription description={courseDetail.crsContents} />
        <div className='flex-center px-5 pt-5'>
          <div className='border-point-300 flex h-auto w-full flex-col items-start gap-3 rounded-[20px] border px-6 py-5 shadow-[0_0_8px_0_rgba(103,236,180,0.20)]'>
            {/* Main & Text Logo */}
            <span className='flex h-auto w-full flex-col gap-3'>
              <MainPointLogo />
              <h4 className='text-body3 text-gray-3'>
                코스 데이터를 바탕으로 AI가 달리기 팁을 요약했어요.
              </h4>
            </span>
            <Suspense
              fallback={
                <div className='flex-col-center h-full min-h-[160px] w-full min-w-[160px] gap-2'>
                  <LoadingSpinner />
                  <p>코스 분석 요약을 불러오고 있어요.</p>
                </div>
              }
            >
              <CourseRunwayPoint course_id={course_id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
