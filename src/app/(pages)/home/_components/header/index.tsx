import Image from 'next/image';
import { HomeSearch } from './home-search';
import { IntroText } from './intro-text';
import { WeatherSummary } from './weather-summary';

export function HomeHeader() {
  return (
    <header className='relative flex h-[366px] w-full justify-between px-5'>
      <Image
        src='/img/home/home.png'
        alt='홈 상단 배경 이미지'
        fill
        className='object-cover'
      />

      <div className='z-50 flex h-full w-full flex-col justify-between pt-[6px] pb-[28px]'>
        <HomeSearch />
        <div className='flex flex-col gap-4'>
          <IntroText />
          <WeatherSummary />
        </div>
      </div>
    </header>
  );
}
