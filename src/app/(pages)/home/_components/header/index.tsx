import Image from 'next/image';
import HomeSearch from './home-search';
import IntroText from './intro-text';
import WeatherSummary from './weather-summary';

export default function HomeHeader() {
  return (
    <header className='flex justify-between relative w-full h-[366px] px-5'>
      <Image
        src='/img/home/home.png'
        alt='홈 상단 배경 이미지'
        fill
        className='object-cover'
      />

      <div className='flex flex-col justify-between z-50 w-full h-full pt-[6px] pb-[28px]'>
        <HomeSearch />
        <div className='flex flex-col gap-4'>
          <IntroText />
          <WeatherSummary />
        </div>
      </div>
    </header>
  );
}
