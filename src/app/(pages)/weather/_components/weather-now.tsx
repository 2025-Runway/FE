import { WeatherNowData } from '@/interfaces/weather.types';
import LocationIcon from '@/public/svg/weather/location.svg';
import { WeatherIcon } from './weather-icon';
import RunningAlertIcon from '@/public/svg/weather/running-alert.svg';
import clsx from 'clsx';
import { WeatherRunningCondition } from './weather-running-condition';

const formatDate = (date: Date) => {
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .slice(0, -1);
};

export function WeatherNow({ weatherData }: { weatherData: WeatherNowData }) {
  return (
    <section className='pb-7.5 w-full h-auto flex flex-col rounded-[28px] bg-white000'>
      <header className='pl-10 pt-5 pb-3 w-full h-auto flex justify-start items-center gap-1 border-b-4 border-gray-0'>
        <LocationIcon />
        <p className='text-title1 text-gray-bk'>{weatherData.location}</p>
      </header>

      {/* 날씨 Icon + 온도 정보 */}
      <div className='pt-12 pb-2 w-full h-auto flex-center gap-5'>
        <WeatherIcon weather={weatherData.weather} />
        <span className='flex-col-center'>
          <h1 className='text-heading2 text-gray-bk'>
            {weatherData.temperature}°
          </h1>
          <span className='flex items-center gap-2 text-body4 text-gray-4'>
            <span>{formatDate(new Date())}</span>
            <span>|</span>
            <span>{weatherData.weather}</span>
          </span>
        </span>
      </div>

      {/* 풍속, 미세먼지, 자외선 정보 */}
      <div className='px-8 flex-center gap-1'>
        <span className='flex-1 p-4 flex-col-center'>
          <span className='text-body4 text-gray-4'>풍속</span>
          <span className='text-title1 text-gray-bk'>
            {weatherData.windSpeed}
          </span>
        </span>

        <span className='h-10 w-[1px] bg-gray-2' />

        <span className='flex-1 p-4 flex-col-center'>
          <span className='text-body4 text-gray-4'>미세먼지</span>
          <span
            className={clsx(
              'text-title1 text-gray-bk',
              weatherData.fineDust === '좋음' && 'text-weather-bl-02',
              weatherData.fineDust === '보통' && 'text-point-400',
              weatherData.fineDust === '나쁨' && 'text-shadow-errorpoint',
              weatherData.fineDust === '매우나쁨' && 'text-errorpoint',
              weatherData.fineDust === '점검중' && 'text-gray-4',
            )}
          >
            {weatherData.fineDust}
          </span>
        </span>

        <span className='h-10 w-[1px] bg-gray-2' />

        <span className='flex-1 p-4 flex-col-center'>
          <span className='text-body4 text-gray-4'>자외선</span>
          <span
            className={clsx(
              'text-title1 text-gray-bk',
              weatherData.uvIndex === '위험' && 'text-errorpoint',
              weatherData.uvIndex === '매우높음' && 'text-errorpoint',
              weatherData.uvIndex === '높음' && 'text-red-500',
              weatherData.uvIndex === '보통' && 'text-point-400',
              weatherData.uvIndex === '낮음' && 'text-weather-bl-02',
              weatherData.uvIndex === '점검중' && 'text-gray-4',
            )}
          >
            {weatherData.uvIndex}
          </span>
        </span>
      </div>

      {/* 러닝 지수 */}
      <div className='px-5 w-full h-auto'>
        <WeatherRunningCondition
          weatherData={{
            temperature: weatherData.temperature,
            windSpeed: Number(weatherData.windSpeed.split('m/s')),
            fineDust: weatherData.fineDust,
            uvIndex: weatherData.uvIndex,
          }}
        />
      </div>
    </section>
  );
}
