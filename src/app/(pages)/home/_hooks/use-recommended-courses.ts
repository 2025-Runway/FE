import { useQuery } from '@tanstack/react-query';
import { getRecommendedCourses } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { PopularCourse } from '@/interfaces/home/home.types';

export const useRecommendedCourses = (enabled: boolean = true) => {
  return useQuery<ApiResponse<PopularCourse[]>>({
    queryKey: ['recommendedCourses'],
    queryFn: getRecommendedCourses,
    enabled,
  });
};