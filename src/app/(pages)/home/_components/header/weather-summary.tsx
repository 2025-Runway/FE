'use client';
import { useWeather } from '../../_hooks/use-weather';

export function WeatherSummary() {
  const { data: weatherResponse, isLoading } = useWeather();
  const weatherData = weatherResponse?.data;

  return (
    <div className='flex w-full gap-3'>
      <div className='flex flex-1 flex-col items-center justify-center rounded-[20px] bg-white/20 px-4 pt-4 pb-3 backdrop-blur-xs'>
        <p className='text-[14px] font-light text-white/100'>날씨</p>
        <p className='text-[20px] font-bold text-white/100'>
          {isLoading ? '...' : weatherData?.condition || '맑음'}
        </p>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center rounded-[20px] bg-white/20 px-4 pt-4 pb-3 backdrop-blur-xs'>
        <p className='text-[14px] font-light text-white/100'>기온</p>
        <p className='text-[20px] font-bold text-white/100'>
          {isLoading ? '...' : `${weatherData?.temperature || 33}°`}
        </p>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center rounded-[20px] bg-white/20 px-4 pt-4 pb-3 backdrop-blur-xs'>
        <p className='text-[14px] font-light text-white/100'>대기</p>
        <p className='text-[20px] font-bold text-white/100'>
          {isLoading ? '...' : weatherData?.airQuality || '좋음'}
        </p>
      </div>
    </div>
  );
}
