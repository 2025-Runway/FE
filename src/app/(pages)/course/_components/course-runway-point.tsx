import MainPointLogo from '@/public/svg/logo/main-point-logo.svg';

interface CourseRunwayPointProps {
  crsSummary: string;
  crsTourInfo: string;
  travelerInfo: string;
}

export function CourseRunwayPoint({
  crsSummary,
  crsTourInfo,
  travelerInfo,
}: CourseRunwayPointProps) {
  return (
    <div className='pt-5 px-5 flex-center'>
      <div className='px-6 py-5 w-full h-auto flex flex-col items-start gap-3 border border-point-300 rounded-[20px] shadow-[0_0_8px_0_rgba(103,236,180,0.20)]'>
        {/* Main & Text Logo */}
        <span className='w-full h-auto flex flex-col gap-3'>
          <MainPointLogo />
          <h4 className='text-body3 text-gray-3'>
            코스 데이터를 바탕으로 AI가 달리기 팁을 요약했어요.
          </h4>
        </span>

        {/* AI 요약 */}
        <div className='w-full h-auto flex flex-col text-body5 text-gray-bk whitespace-pre-line'>
          <p>{crsSummary}</p>
          <p>{crsTourInfo}</p>
          <p>{travelerInfo}</p>
        </div>
      </div>
    </div>
  );
}
