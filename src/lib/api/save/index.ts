import { ApiResponse } from '@/interfaces/api/response.types';
import { FavoriteCoursesByRegion } from '@/interfaces/save/save.types';
import { api } from '@/lib/api';

/**
 * 찜한 코스 목록 가져오는 API
 */
export const getFavoriteCourses = async (): Promise<ApiResponse<FavoriteCoursesByRegion[]>> => {
  return await api.get('/courses/favorite');
};
