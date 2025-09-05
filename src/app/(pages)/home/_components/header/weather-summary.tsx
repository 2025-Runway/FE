export default function WeatherSummary() {
  return (
    <div className='w-full flex gap-3'>
      <div className='flex-1 bg-white/20 backdrop-blur-xs rounded-[20px] px-4 pt-4 pb-3 flex flex-col items-center justify-center'>
        <p className='text-white/100 text-[14px] font-light'>날씨</p>
        <p className='text-white/100 text-[20px] font-bold'>맑음</p>
      </div>
      <div className='flex-1 bg-white/20 backdrop-blur-xs rounded-[20px] px-4 pt-4 pb-3 flex flex-col items-center justify-center'>
        <p className='text-white/100 text-[14px] font-light'>기온</p>
        <p className='text-white/100 text-[20px] font-bold'>33°</p>
      </div>
      <div className='flex-1 bg-white/20 backdrop-blur-xs rounded-[20px] px-4 pt-4 pb-3 flex flex-col items-center justify-center'>
        <p className='text-white/100 text-[14px] font-light'>대기</p>
        <p className='text-white/100 text-[20px] font-bold'>좋음</p>
      </div>
    </div>
  );
}
