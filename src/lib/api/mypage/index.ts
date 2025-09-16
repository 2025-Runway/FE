import { MypageInfo } from '@/interfaces/mypage.types';
import { api } from '..';
import { ApiResponse } from '@/interfaces/api/response.types';

/**
 * 마이페이지 정보 조회
 * @method get
 * @returns 마이페이지 정보
 */
export function getMypageInfo(): Promise<ApiResponse<MypageInfo>> {
  return api.get('/mypage');
}
/**
 * 여행지 설정
 * @method patch
 * @param destination 여행지
 */
export function setDestination(destination: string) {
  return api.patch('/mypage/destination', {
    data: {
      destination,
    },
  });
}
