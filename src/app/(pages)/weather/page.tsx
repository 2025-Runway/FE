import { FineDust, UvIndex, Weather } from '@/interfaces/weather.types';
import { WeatherLocationTab } from './_components/weather-locaion-tab';
import { WeatherNow } from './_components/weather-now';
import { WeatherWeeklyForecast } from './_components/weather-weekly-forecast';
import { MOCK_WEEKLY_WEATHER_DATA } from '@/utils/mockdata/weather-weekly.mock';
import { Suspense } from 'react';
import { WeatherSection } from './_components/weather-section';

export default function WeatherPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <header className='py-3 w-full h-auto flex-center text-title1 text-gray-bk border-b-8 border-gray-0'>
        날씨
      </header>
      <Suspense fallback={<></>}>
        <WeatherLocationTab />
      </Suspense>
      <main className='flex-1 pb-5 w-full h-auto flex flex-col gap-7 overflow-y-auto '>
        <WeatherSection />
      </main>
    </div>
  );
}
