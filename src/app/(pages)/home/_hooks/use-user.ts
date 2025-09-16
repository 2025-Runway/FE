import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { UserInfo } from '@/interfaces/home/home.types';

export const useUser = () => {
  return useQuery<ApiResponse<UserInfo>>({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
};