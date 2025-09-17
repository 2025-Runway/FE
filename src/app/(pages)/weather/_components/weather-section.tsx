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
import {
  useWeather,
  useWeatherWeekly,
  useDestinationWeather,
  useDestinationWeatherWeekly,
} from '../_hooks/use-weather-data';
import { WeatherCurrentSection } from './weather-current-section';
import { WeatherDestinationSection } from './weather-destination-section';

export function WeatherSection() {
  const { data, isError } = useGeoLocation();
  const { latitude, longitude } = data ?? { latitude: 0, longitude: 0 };
  const { location } = useWeatherTabQuery();

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
  if (location === 'current_location') {
    return (
      <WeatherCurrentSection
        lat={latitude}
        lon={longitude}
        location={location}
      />
    );
  } else if (location === 'travel_location') {
    return (
      <WeatherDestinationSection
        lat={latitude}
        lon={longitude}
        location={location}
      />
    );
  }
  return null;
}
