'use client';

import { Loader2 } from 'lucide-react';
import { useWeather, useWeatherWeekly } from '../../_hooks/use-weather-data';
import { WeatherNow } from '../weather-now';
import { WeatherWeeklyForecast } from '../weather-weekly-forecast';

interface WeatherCurrentSectionProps {
  lat: number;
  lon: number;
  location: string;
}

export function WeatherCurrentSection({
  lat,
  lon,
  location,
}: WeatherCurrentSectionProps) {
  console.log('lat', lat);
  console.log('lon', lon);
  console.log('location', location);
  // 현재 위치 날씨 정보
  const {
    data: weatherData,
    isLoading,
    error,
  } = useWeather(lat, lon, location);
  console.log('weatherData', weatherData);

  // 현재 위치 주간 날씨 정보
  const {
    data: weatherWeeklyData,
    isLoading: weatherWeeklyLoading,
    error: weatherWeeklyError,
  } = useWeatherWeekly(lat, lon, location);

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
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            날씨 정보를 가져오는데 실패했습니다.
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
            현재 위치 날씨 정보를 가져오는데 실패했습니다.
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
            현재 위치 주간 날씨 정보를 가져오는데 실패했습니다.
          </p>
        </div>
      )}
    </>
  );
}
