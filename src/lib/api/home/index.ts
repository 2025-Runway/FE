import { ApiResponse } from '@/interfaces/api/response.types';
import { CourseHistory, PopularCourse, WeatherInfo } from '@/interfaces/home/home.types';
import { api } from '@/lib/api';

/**
 * 최근 본 코스 가져오는 API
 */
export const getCourseHistory = async (): Promise<
  ApiResponse<CourseHistory>
> => {
  return await api.get('/courses/history');
};

/**
 * 전국인기코스 가져오는 API
 */
export const getPopularCourses = async (): Promise<
  ApiResponse<PopularCourse[]>
> => {
  return await api.get('/public/courses/popular');
};

/**
 * AI 추천코스 가져오는 API
 */
export const getRecommendedCourses = async (): Promise<
  ApiResponse<PopularCourse[]>
> => {
  return await api.get('/courses/recommendations');
};

/**
 * 날씨 정보 가져오는 API
 */
export const getWeatherInfo = async (lat: number, lon: number): Promise<
  ApiResponse<WeatherInfo>
> => {
  return await api.get(`/public/weather?lat=${lat}&lon=${lon}`);
};
