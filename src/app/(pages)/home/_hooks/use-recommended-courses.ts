import { useQuery } from '@tanstack/react-query';
import {
  getRecommendedCourses,
  getRecommendedCoursesByRegion,
} from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { PopularCourse } from '@/interfaces/home/home.types';

export const useRecommendedCourses = (enabled = true, region?: string) => {
  return useQuery<ApiResponse<PopularCourse[]>>({
    queryKey: region
      ? ['recommendedCourses', 'region', region]
      : ['recommendedCourses'],
    queryFn: () =>
      region ? getRecommendedCoursesByRegion(region) : getRecommendedCourses(),
    enabled,
  });
};
