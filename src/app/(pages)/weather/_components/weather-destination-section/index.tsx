'use client';

import { Loader2 } from 'lucide-react';
import {
  useDestinationWeather,
  useDestinationWeatherWeekly,
} from '../../_hooks/use-weather-data';
import { WeatherNow } from '../weather-now';
import { WeatherWeeklyForecast } from '../weather-weekly-forecast';

interface WeatherDestinationSectionProps {
  lat: number;
  lon: number;
  location: string;
}

export function WeatherDestinationSection({
  lat,
  lon,
  location,
}: WeatherDestinationSectionProps) {
  // 현재 위치 날씨 정보
  const {
    data: weatherData,
    isLoading,
    error,
  } = useDestinationWeather(lat, lon, location);

  // 현재 위치 주간 날씨 정보
  const {
    data: weatherWeeklyData,
    isLoading: weatherWeeklyLoading,
    error: weatherWeeklyError,
  } = useDestinationWeatherWeekly(lat, lon, location);

  if (isLoading) {
    return (
      <div className='flex-col-center h-full w-full gap-4'>
        <Loader2 className='text-point-400 size-12 animate-spin rounded-full' />
        <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
          날씨 정보를 가져오는 중입니다.
        </p>
      </div>
    );
  } else {
    if (error || weatherWeeklyError) {
      return (
        <div className='flex-col-center h-full w-full gap-4'>
          <p className='text-body3 text-gray-4 text-center'>
            여행지 설정이 필요합니다.
            <br /> 마이페이지에서 여행지 설정을 완료해주세요.
          </p>
        </div>
      );
    }
  }
  return (
    <>
      {weatherData ? (
        <WeatherNow weatherData={weatherData} />
      ) : (
        <div className='flex-col-center h-full w-full gap-4'>
          <p className='text-body3 text-gray-4 text-center'>
            여행지 날씨 정보를 가져오는데 실패했습니다.
          </p>
        </div>
      )}
      {weatherWeeklyLoading ? (
        <div className='flex-col-center h-full w-full gap-4'>
          <Loader2 className='text-point-400 size-12 animate-spin rounded-full' />
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            주간 날씨 정보를 가져오는 중입니다.
          </p>
        </div>
      ) : weatherWeeklyData ? (
        <WeatherWeeklyForecast data={weatherWeeklyData} />
      ) : (
        <div className='flex-col-center h-full w-full gap-4'>
          <p className='text-body3 text-gray-4 text-center'>
            여행지 주간 날씨 정보를 가져오는데 실패했습니다.
          </p>
        </div>
      )}
    </>
  );
}
