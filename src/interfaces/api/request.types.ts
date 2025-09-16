/**
 * @description fetch wrapper에서 사용하는 API 요청 옵션을 정의하는 타입
 *
 *
 */
export interface FetchOptions extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}
