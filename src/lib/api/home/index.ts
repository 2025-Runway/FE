import { ApiResponse } from '@/interfaces/api/response.types';
import {
  CourseHistory,
  PopularCourse,
  WeatherInfo,
  UserInfo,
  SearchResponse,
} from '@/interfaces/home/home.types';
import { api } from '@/lib/api';
import { fetchQuery } from '@/lib/api/fetch-query';
import { cache } from 'react';

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
export const getWeatherInfo = async (
  lat: number,
  lon: number,
): Promise<ApiResponse<WeatherInfo>> => {
  return await api.get(`/public/weather?lat=${lat}&lon=${lon}`);
};

/**
 * 사용자 정보 가져오는 API
 */
export const getUserInfo = async (): Promise<ApiResponse<UserInfo>> => {
  return await api.get('/mypage');
};

/**
 * 검색 API
 */
export const searchCourses = async (
  query: string,
  page: number = 1,
): Promise<ApiResponse<SearchResponse>> => {
  return await api.get(
    `/public/search?q=${encodeURIComponent(query)}&page=${page}`,
  );
};

/**
 * 사용자 정보를 가져오는 캐시된 함수
 */
export const getUserDataCached = cache(
  async (): Promise<ApiResponse<UserInfo>> => {
    return await api.get('/mypage');
  },
);

/**
 * 지역별 인기 코스 가져오는 API
 */
export const getPopularCoursesByRegion = async (region: string): Promise<
  ApiResponse<PopularCourse[]>
> => {
  return await api.get(`/courses/popular/region?region=${encodeURIComponent(region)}`);
};

/**
 * 지역별 AI 추천 코스 가져오는 API
 */
export const getRecommendedCoursesByRegion = async (region: string): Promise<
  ApiResponse<PopularCourse[]>
> => {
  return await api.get(`/courses/recommendations/region?region=${encodeURIComponent(region)}`);
};
