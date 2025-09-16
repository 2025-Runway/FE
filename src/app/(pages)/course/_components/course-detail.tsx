import { Course } from '@/interfaces/course/course.types';

interface CourseDetailProps {
  course: Course;
}

// 분을 시간과 분으로 변환하는 함수
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours.toString().padStart(2)}h ${remainingMinutes.toString().padStart(2, '0')}m`;
}

export function CourseDetail({ course }: CourseDetailProps) {
  const courseDetail = [
    {
      label: '난이도',
      value: course.crsLevel === 1 ? '하' : course.crsLevel === 2 ? '중' : '상',
    },
    {
      label: '예상 시간',
      value: formatDuration(course.crsTotlRqrmHour),
    },
    {
      label: '코스 길이',
      value: `${course.crsDstnc}km`,
    },
  ];
  return (
    <div className='border-gray-0 flex h-auto w-full border-b-8 pb-9'>
      <div className='flex h-auto w-full flex-col gap-5 px-5 pt-4'>
        <div className='flex flex-col items-start'>
          <span className='text-caption2 text-gray-4 flex items-center gap-2'>
            <span>{course.sigun}</span>
            <span>|</span>
            <span>{course.crsCycle}</span>
          </span>
          <span className='text-gray-bk text-title1'>{course.crsKorNm}</span>
        </div>

        <div className='flex h-auto w-full items-center gap-2'>
          {courseDetail.map(item => (
            <span
              key={item.label}
              className='flex-col-center bg-white000 h-auto w-full flex-1 rounded-[20px] p-4 backdrop-blur-[4px]'
            >
              <span className='text-body4 text-gray-bk'>{item.label}</span>
              <span className='text-title1 text-gray-bk font-bold'>
                {item.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
