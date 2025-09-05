import { WeeklyWeatherData, WeatherCardType } from '@/interfaces/weather.types';
import { WeatherWeeklyCard } from './weather-weekly-card';

interface WeatherWeeklyForecastProps {
  data: WeeklyWeatherData[];
}

export function WeatherWeeklyForecast({ data }: WeatherWeeklyForecastProps) {
  // 카드 타입 결정 함수
  const getCardType = (index: number): WeatherCardType => {
    if (index === 0) return 'today';
    if (index === 1) return 'tomorrow';
    return 'weekday';
  };

  return (
    <section className='pb-7.5 w-full h-auto flex flex-col rounded-[28px] bg-white000'>
      {/* 제목 */}
      <h2 className='pl-10 pt-5 pb-3 border-b-8 border-gray-0 text-title1 text-gray-bk'>
        주간 예보
      </h2>

      {/* 주간 예보 카드들 */}
      <div className='px-2 w-full h-auto flex flex-col'>
        {data.map((weatherData, index) => (
          <WeatherWeeklyCard
            key={weatherData.date}
            data={weatherData}
            type={getCardType(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
