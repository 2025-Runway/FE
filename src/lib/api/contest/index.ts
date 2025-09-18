import { ApiResponse } from '@/interfaces/api/response.types';
import {
  MarathonResponse,
  MarathonDetail,
} from '@/interfaces/contest/contest.types';
import { api } from '@/lib/api';

/**
 * 대회 정보 가져오는 API
 */
export const getMarathons = async (
  page = 1,
): Promise<ApiResponse<MarathonResponse>> => {
  return await api.get(`/public/marathons?page=${page}`);
};

/**
 * 대회 상세 정보 가져오는 API
 */
export const getMarathonDetail = async (
  marathonId: string,
): Promise<ApiResponse<MarathonDetail>> => {
  return await api.get(`/public/marathons/${marathonId}`);
};
