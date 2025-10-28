'use client';

import RunningNormalIcon from '@/public/svg/weather/running-normal.svg';
import RunningGoodIcon from '@/public/svg/weather/running-good.svg';
import RunningBadIcon from '@/public/svg/weather/running-bad.svg';
import RunningAlertIcon from '@/public/svg/weather/running-alert.svg';

import {
  useRunningCondition,
  WeatherData,
} from '../_hooks/running-condition.hook';
import clsx from 'clsx';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { WeatherInfoModal } from './weather-info-modal';

interface RunningIndexProps {
  weatherData: WeatherData;
}

export function WeatherRunningCondition({ weatherData }: RunningIndexProps) {
  const runningCondition = useRunningCondition(weatherData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className={cn(
        'relative flex h-auto w-full flex-col gap-1 rounded-[20px] border px-8 py-3 shadow-[0_0_8px_0_rgba(103,236,180,0.20)]',
        runningCondition.index === '좋음' && 'border-weather-bl-02',
        runningCondition.index === '보통' && 'border-point-400',
        runningCondition.index === '나쁨' && 'border-weather-or-02',
      )}
    >
      <span className='flex items-center gap-1'>
        <span className='text-caption2 text-gray-3'>러닝 지수</span>

        <button onClick={() => setIsModalOpen(true)}>
          <RunningAlertIcon />
        </button>
      </span>
      <div className='flex items-center justify-start gap-7'>
        <span className='flex-col-center gap-1'>
          {runningCondition.index === '좋음' ? (
            <RunningGoodIcon />
          ) : runningCondition.index === '보통' ? (
            <RunningNormalIcon />
          ) : (
            <RunningBadIcon />
          )}
          <span
            className={clsx(
              'text-title3',
              runningCondition.index === '좋음' && 'text-weather-bl-02',
              runningCondition.index === '보통' && 'text-point-400',
              runningCondition.index === '나쁨' && 'text-weather-or-02',
            )}
          >
            {runningCondition.index}
          </span>
        </span>

        <span className='flex h-auto w-full flex-col gap-4'>
          <span className='text-body4 text-gray-3 bg-gray-0 h-6 w-fit rounded-[16px] px-3 py-1'>
            TIP
          </span>
          <p className='text-title3 text-gray-bk'>{runningCondition.tip}</p>
        </span>
      </div>
      <WeatherInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
