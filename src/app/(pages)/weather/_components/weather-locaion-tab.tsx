'use client';

import { cn } from '@/utils/cn';
import clsx from 'clsx';
import { Location, useWeatherTabQuery } from '../_hooks/weather-tab-query.hook';

const TAB_LIST = ['current_location', 'travel_location'] as Location[];

export function WeatherLocationTab() {
  const { location, setLocation } = useWeatherTabQuery();
  return (
    <div className='my-5 w-full h-auto border-b border-gray-2 bg-gray-bg'>
      <nav className='px-5 w-full h-auto flex-center'>
        {TAB_LIST.map(item => (
          <button
            key={item}
            onClick={() => setLocation(item)}
            className={clsx(
              'flex-1 w-full h-12 text-title4 text-gray-2 flex-center cursor-pointer',
              location === item && 'text-gray-bk border-b-2 border-gray-bk',
            )}
          >
            {item === 'current_location' ? '현재 위치 날씨' : '여행지 날씨'}
          </button>
        ))}
      </nav>
    </div>
  );
}
