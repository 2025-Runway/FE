import { WeatherWeeklyForecast } from './weather-weekly-forecast';
import { MOCK_WEEKLY_WEATHER_DATA } from '@/utils/mockdata/weather-weekly.mock';

export function WeatherWeeklyExample() {
  return (
    <div className="w-full max-w-md mx-auto">
      <WeatherWeeklyForecast data={MOCK_WEEKLY_WEATHER_DATA} />
    </div>
  );
}
