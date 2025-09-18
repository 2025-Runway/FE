import { WeeklyWeatherData, WeatherCardType } from '@/interfaces/weather.types';
import { useRunningCondition } from '../_hooks/running-condition.hook';
import WeatherSmallSunIcon from '@/public/svg/weather/weather-small-sun.svg';
import WeatherSmallCloudIcon from '@/public/svg/weather/weather-small-cloud.svg';
import WeatherSmallRainIcon from '@/public/svg/weather/weather-small-rain.svg';
import WeatherSmallSnowIcon from '@/public/svg/weather/weather-small-snow.svg';
import WeatherSmallHazyIcon from '@/public/svg/weather/weather-small-hazy.svg';
import clsx from 'clsx';

interface WeatherWeeklyCardProps {
  data: WeeklyWeatherData;
  type: WeatherCardType;
  index: number; // 0: 오늘, 1: 내일, 2+: 요일
}

export function WeatherWeeklyCard({
  data,
  type,
  index,
}: WeatherWeeklyCardProps) {
  const mockWeatherData = {
    temperature: (data.tempMin + data.tempMax) / 2, // 평균 온도
    windSpeed: 3, // 기본값 (실제로는 API에서 받아야 함)
    fineDust: '보통' as const,
    uvIndex: '보통' as const,
  };

  const runningCondition = useRunningCondition(mockWeatherData);

  // 날짜 포맷팅
  const formatDate = (
    dateString: string,
    type: WeatherCardType,
    index: number,
  ) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    if (type === 'today') {
      return `${month}. ${day}. 오늘`;
    } else if (type === 'tomorrow') {
      return `${month}. ${day}. 내일`;
    } else {
      return `${month}. ${day}. ${data.dayOfWeek}`;
    }
  };

  // 날씨 아이콘 반환
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '맑음':
        return <WeatherSmallSunIcon />;
      case '구름많음':
        return <WeatherSmallCloudIcon />;
      case '흐림':
        return <WeatherSmallHazyIcon />;
      case '흐림+비':
        return <WeatherSmallRainIcon />;
      case '흐리고 비':
        return <WeatherSmallRainIcon />;
      case '흐림+눈':
        return <WeatherSmallSnowIcon />;
      case '흐림+소나기':
        return <WeatherSmallRainIcon />;
      default:
        return null;
    }
  };

  return (
    <div className='flex items-center justify-around gap-1 p-4'>
      {/* 날씨 아이콘 */}
      <span className='flex-center size-18 flex-shrink-0'>
        {data.weatherAm}
      </span>

      {/* 날짜와 온도 */}
      <div className='flex-col-center flex-shrink-0'>
        <div className='text-body4 text-gray-4'>
          {formatDate(data.date, type, index)}
        </div>
        <div className='flex-center text-title1 gap-1'>
          <span className='text-weather-bl-02'>{data.tempMin}°</span>
          <span className='text-gray-4'>/</span>
          <span className='text-errorpoint'>{data.tempMax}°</span>
        </div>
      </div>

      {/* 대기질 */}
      <div className='flex-col-center flex-shrink-0'>
        <div className='text-caption2 text-gray-4'>대기</div>
        <div className='text-title3 text-gray-bk'>매우 좋음</div>
      </div>

      {/* 러닝 지수 */}
      <div
        className={clsx(
          'flex-col-center flex-shrink-0 rounded-[12px] px-4 py-2.5',
          runningCondition.index === '좋음' &&
            'bg-weather-bl-01 text-weather-bl-02',
          runningCondition.index === '보통' && 'bg-point-000 text-point-400',
          runningCondition.index === '나쁨' &&
            'bg-weather-or-01 text-weather-or-02',
        )}
      >
        <div className='text-caption2'>러닝 지수</div>
        <div className='text-title3'>{runningCondition.index}</div>
      </div>
    </div>
  );
}
