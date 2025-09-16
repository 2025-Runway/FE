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
import { LoadingSpinner } from '@/components/loading-spinner';
import { Loader2, MapPinOff } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/lib/api/weather';
const weatherMockData = {
  location: '경기도 안양시 동안구',
  temperature: 27.0,
  weather: '구름많음' as Weather,
  windSpeed: '1.5m/s',
  fineDust: '보통' as FineDust,
  uvIndex: '높음' as UvIndex,
};

export function WeatherSection() {
  const { data, isError } = useGeoLocation();
  const { latitude, longitude } = data ?? { latitude: 0, longitude: 0 };
  const { location } = useWeatherTabQuery();

  // 위치 정보 -> api 요청 -> 날씨 보여주기
  // 위치 정보 에러 처리, api 요청 에러 처리
  // 현재 여행지 정보 -> api 요청 -> 날씨 보여주기

  // const { data: weatherData } = useQuery<WeatherNowData | null>({
  //   queryKey: ['weather', latitude, longitude],
  //   queryFn: async () => {
  //     const response = await getCurrentWeather(
  //       Number(latitude.toFixed(4)),
  //       Number(longitude.toFixed(4)),
  //     );
  //     if (response.success) {
  //       return response.data;
  //     }
  //     return null;
  //   },
  //   enabled: latitude !== 0 && longitude !== 0,
  //   retry: false,
  //   staleTime: 1000 * 60 * 5,
  //   gcTime: 1000 * 60 * 5,
  // });

  if (location === 'current_location') {
    if (latitude === 0 && longitude === 0) {
      return (
        <div className='flex-col-center h-full w-full gap-4'>
          <Loader2 className='text-point-400 size-12 animate-spin rounded-full' />
          <p className='text-gray-4 text-[14px] leading-[19.6px] font-medium'>
            위치 정보를 가져오는 중입니다.
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
    if (latitude !== 0 && longitude !== 0) {
      return (
        <>
          <WeatherNow weatherData={weatherMockData} />
          <WeatherWeeklyForecast data={MOCK_WEEKLY_WEATHER_DATA} />
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
