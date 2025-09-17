import { getCourseAISummary } from '@/lib/api/courses';
import MainPointLogo from '@/public/svg/logo/main-point-logo.svg';

export async function CourseRunwayPoint({ course_id }: { course_id: string }) {
  const courseAISummary = await getCourseAISummary(course_id).then(
    res => res.data,
  );

  return (
    <div className='text-body5 text-gray-bk flex h-auto w-full flex-col whitespace-pre-line'>
      {courseAISummary?.analysis?.map(line => (
        <p key={line}>- {line}</p>
      ))}
    </div>
  );
}
