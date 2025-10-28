import { WeatherLocationTab } from './_components/weather-locaion-tab';
import { Suspense } from 'react';
import { WeatherSection } from './_components/weather-section';
import { NoticeDialog } from '@/components/notice-dialog';

export default function WeatherPage() {
  return (
    <div className='flex h-full w-full flex-col'>
      <NoticeDialog
        title='공지'
        description={`현재 기상청 데이터 불안정으로,\n일부 지역의 날씨 정보가 정확하지 않을 수 있습니다.`}
        storageKey='weather-notice-dismissed'
      />
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
