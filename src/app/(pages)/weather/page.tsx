import { FineDust, UvIndex, Weather } from '@/interfaces/weather.types';
import { WeatherLocationTab } from './_components/weather-locaion-tab';
import { WeatherNow } from './_components/weather-now';
import { WeatherWeeklyForecast } from './_components/weather-weekly-forecast';
import { MOCK_WEEKLY_WEATHER_DATA } from '@/utils/mockdata/weather-weekly.mock';

const weatherMockData = {
  location: '경기도 안양시 동안구',
  temperature: 27.0,
  weather: '구름많음' as Weather,
  windSpeed: '1.5m/s',
  fineDust: '보통' as FineDust,
  uvIndex: '높음' as UvIndex,
};

export default function WeatherPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <header className='py-3 w-full h-auto flex-center text-title1 text-gray-bk border-b-8 border-gray-0'>
        날씨
      </header>
      <WeatherLocationTab />
      <main className='flex-1 pb-5 w-full h-auto flex flex-col gap-7 overflow-y-auto '>
        <WeatherNow weatherData={weatherMockData} />
        <WeatherWeeklyForecast data={MOCK_WEEKLY_WEATHER_DATA} />
      </main>
    </div>
  );
}
