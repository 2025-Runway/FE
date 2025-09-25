// use-weather-data.ts
import { useQuery } from '@tanstack/react-query';
import {
  getCurrentWeather,
  getDestinationWeather,
  getWeatherWeekly,
  getDestinationWeatherWeekly,
} from '@/lib/api/weather';

export function useWeather(lat: number, lng: number, location: string) {
  return useQuery({
    queryKey: ['weather', lat, lng],
    queryFn: async () => {
      const response = await getCurrentWeather(lat, lng);

      return response.data ?? null;
    },
    enabled: lat !== 0 && lng !== 0 && location === 'current_location', // 0일 때 요청 안 함
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시 보관
    retry: 1,
    retryDelay: 1000,
  });
}

export function useWeatherWeekly(lat: number, lng: number, location: string) {
  return useQuery({
    queryKey: ['weatherWeekly', lat, lng],
    queryFn: async () => {
      const response = await getWeatherWeekly(lat, lng);
      return response.data ?? null;
    },
    enabled: lat !== 0 && lng !== 0 && location === 'current_location',
    staleTime: 10 * 60 * 1000, // 주간 데이터는 10분
    gcTime: 30 * 60 * 1000, // 30분간 캐시
    retry: 1,
    retryDelay: 1000,
  });
}

export function useDestinationWeather(
  lat: number,
  lng: number,
  location: string,
) {
  return useQuery({
    queryKey: ['destinationWeather', lat, lng],
    queryFn: async () => {
      const response = await getDestinationWeather(lat, lng);
      return response.data ?? null;
    },
    enabled: lat !== 0 && lng !== 0 && location === 'travel_location',
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시
    retry: 1,
    retryDelay: 1000,
  });
}

export function useDestinationWeatherWeekly(
  lat: number,
  lng: number,
  location: string,
) {
  return useQuery({
    queryKey: ['destinationWeatherWeekly', lat, lng],
    queryFn: async () => {
      const response = await getDestinationWeatherWeekly(lat, lng);
      return response.data ?? null;
    },
    enabled: lat !== 0 && lng !== 0 && location === 'travel_location',
    staleTime: 10 * 60 * 1000, // 주간 데이터는 10분
    gcTime: 30 * 60 * 1000, // 30분간 캐시
    retry: 1,
    retryDelay: 1000,
  });
}
