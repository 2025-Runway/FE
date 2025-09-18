import { WeatherLocationTab } from './_components/weather-locaion-tab';
import { Suspense } from 'react';
import { WeatherSection } from './_components/weather-section';

export default function WeatherPage() {
  return (
    <div className='flex h-full w-full flex-col'>
      <header className='flex-center text-title1 text-gray-bk border-gray-0 h-auto w-full border-b-8 py-3'>
        날씨
      </header>
      <Suspense fallback={<></>}>
        <WeatherLocationTab />
      </Suspense>
      <main className='flex h-auto w-full flex-1 flex-col gap-7 overflow-y-auto pb-5'>
        <Suspense fallback={<></>}>
          <WeatherSection />
        </Suspense>
      </main>
    </div>
  );
}
