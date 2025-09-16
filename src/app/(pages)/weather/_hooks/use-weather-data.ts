import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherWeekly } from '@/lib/api/weather';
import { WeatherNowData, WeeklyWeatherData } from '@/interfaces/weather.types';

export function useWeather(lat: number, lng: number) {
  const [data, setData] = useState<WeatherNowData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getCurrentWeather(lat, lng);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return { data, loading, error };
}

export function useWeatherWeekly(lat: number, lng: number) {
  const [data, setData] = useState<WeeklyWeatherData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getWeatherWeekly(lat, lng);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return { data, loading, error };
}
