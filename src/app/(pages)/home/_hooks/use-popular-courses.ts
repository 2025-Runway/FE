import { useQuery } from '@tanstack/react-query';
import { getPopularCourses } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { PopularCourse } from '@/interfaces/home/home.types';

export const usePopularCourses = (enabled: boolean = true) => {
  return useQuery<ApiResponse<PopularCourse[]>>({
    queryKey: ['popularCourses'],
    queryFn: getPopularCourses,
    enabled,
  });
};