import { useQuery } from '@tanstack/react-query';
import { getCourseHistory } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { CourseHistory } from '@/interfaces/home/home.types';

export const useCourseHistory = () => {
  return useQuery<ApiResponse<CourseHistory>>({
    queryKey: ['courseHistory'],
    queryFn: getCourseHistory,
  });
};
