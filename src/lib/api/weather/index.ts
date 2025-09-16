import { ApiResponse } from '@/interfaces/api/response.types';
import { api } from '..';
import { WeatherNowData } from '@/interfaces/weather.types';

/**
 * 현재 위치 기반 날씨 정보 조회 - 토큰X
 * @param latitude 위도
 * @param longitude 경도
 * @returns 현재 위치 날씨 정보
 */
export function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<ApiResponse<WeatherNowData>> {
  return api.get(`/public/weather/details?lat=${latitude}&lon=${longitude}`);
}
