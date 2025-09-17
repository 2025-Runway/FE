import { useQuery } from '@tanstack/react-query';
import { getPopularCourses, getPopularCoursesByRegion } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { PopularCourse } from '@/interfaces/home/home.types';

export const usePopularCourses = (enabled: boolean = true, region?: string) => {
  return useQuery<ApiResponse<PopularCourse[]>>({
    queryKey: region ? ['popularCourses', 'region', region] : ['popularCourses'],
    queryFn: () => region ? getPopularCoursesByRegion(region) : getPopularCourses(),
    enabled,
  });
};