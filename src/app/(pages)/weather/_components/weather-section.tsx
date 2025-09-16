'use client';

import { MOCK_WEEKLY_WEATHER_DATA } from '@/utils/mockdata/weather-weekly.mock';
import { useGeoLocation } from '../_hooks/use-geo-location';
import { useWeatherTabQuery } from '../_hooks/weather-tab-query.hook';
import { WeatherNow } from './weather-now';
import { WeatherWeeklyForecast } from './weather-weekly-forecast';
import {
  FineDust,
  UvIndex,
  Weather,
  WeatherNowData,
} from '@/interfaces/weather.types';
import { Loader2, MapPinOff } from 'lucide-react';
import { useWeather } from '../_hooks/use-weather-data';
import { useWeatherWeekly } from '../_hooks/use-weather-data';

export function WeatherSection() {
  const { data, isError } = useGeoLocation();
  const { latitude, longitude } = data ?? { latitude: 0, longitude: 0 };
  const { location } = useWeatherTabQuery();

  // 현재 위치 날씨 정보
  const { data: weatherData, loading, error } = useWeather(latitude, longitude);

  // 현재 위치 주간 날씨 정보
  const {
    data: weatherWeeklyData,
    loading: weatherWeeklyLoading,
    error: weatherWeeklyError,
  } = useWeatherWeekly(latitude, longitude);

  if (location === 'current_location') {
    if (
      (latitude === 0 && longitude === 0) ||
      loading ||
      weatherWeeklyLoading
    ) {
      return (
        <div className='flex-col-center h-full w-full gap-4'>
          <Loader2 className='text-point-400 size-12 animate-spin rounded-full' />
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            {loading || weatherWeeklyLoading
              ? '날씨 정보를 가져오는 중입니다.'
              : '위치 정보를 가져오는 중입니다.'}
          </p>
        </div>
      );
    }
    if (isError) {
      return (
        <div className='flex-col-center h-full w-full gap-4'>
          <MapPinOff className='text-point-400 size-12 rounded-full' />
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            위치 정보를 가져오는데 실패했습니다.
          </p>
        </div>
      );
    }
    if (error || weatherWeeklyError) {
      return (
        <div className='flex-col-center h-full w-full gap-4'>
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            날씨 정보를 가져오는데 실패했습니다.
          </p>
        </div>
      );
    }
    if (latitude !== 0 && longitude !== 0 && weatherData && weatherWeeklyData) {
      return (
        <>
          <WeatherNow weatherData={weatherData} />
          <WeatherWeeklyForecast data={weatherWeeklyData} />
        </>
      );
    }
  } else if (location === 'travel_location') {
    return (
      <div className='flex-col-center h-full w-full gap-4'>
        <p className='text-body3 text-gray-4 text-center'>
          여행지 설정이 필요합니다.
          <br /> 마이페이지에서 여행지 설정을 완료해주세요.
        </p>
      </div>
    );
  }
  return null;
}
