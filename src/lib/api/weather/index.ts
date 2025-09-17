import { ApiResponse } from '@/interfaces/api/response.types';
import { api } from '..';
import { WeatherNowData, WeeklyWeatherData } from '@/interfaces/weather.types';

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

/**
 * 현재 위치 기반 주간 날씨 정보 조회 - 토큰X
 * @param latitude 위도
 * @param longitude 경도
 * @returns 현재 위치 주간 날씨 정보
 */
export function getWeatherWeekly(
  latitude: number,
  longitude: number,
): Promise<ApiResponse<WeeklyWeatherData[]>> {
  return api.get(`/public/weather/weekly?lat=${latitude}&lon=${longitude}`);
}

/**
 * 설정 여행지 기반 날씨 정보 조회 - 토큰O
 * @param latitude 위도
 * @param longitude 경도
 * @returns 설정 여행지 날씨 정보
 */
export function getDestinationWeather(
  latitude: number,
  longitude: number,
): Promise<ApiResponse<WeatherNowData>> {
  return api.get(`/weather/details?lat=${latitude}&lon=${longitude}`);
}

/**
 * 설정 여행지 기반 주간 날씨 정보 조회 - 토큰O
 * @param latitude 위도
 * @param longitude 경도
 * @returns 설정 여행지 주간 날씨 정보
 */
export function getDestinationWeatherWeekly(
  latitude: number,
  longitude: number,
): Promise<ApiResponse<WeeklyWeatherData[]>> {
  return api.get(`/weather/weekly?lat=${latitude}&lon=${longitude}`);
}
