import { API_CONFIG } from './config';
import type { FetchOptions } from '@/interfaces/api/request.types';
import type { ApiResponse } from '@/interfaces/api/response.types';

/**
 * @description API 에러를 정의하는 클래스
 * @author yun_yj
 */
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * GET 요청 전용 fetch wrapper
 * - 캐싱 최적화
 * - ISR 지원
 * - 주로 데이터 조회에 사용
 *
 * @param endpoint API 엔드포인트
 * @param options fetch 옵션 (캐싱 설정 포함)
 * @returns Promise<ApiResponse<T>>
 *
 * @example
 * ```typescript
 * const users = await fetchQuery<User[]>('/users', {
 *   next: { revalidate: 300, tags: ['users'] }
 * });
 * ```
 *
 * @author yun_yj
 * @since 1.0.0
 */
export async function fetchQuery<T>(
  endpoint: string,
  options: Omit<FetchOptions, 'method' | 'body'> = {},
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_CONFIG.baseURL}${endpoint}`;

  const config: RequestInit = {
    method: 'GET',
    headers: {
      // ...API_CONFIG.defaultHeaders,
      ...options.headers,
    },
    cache: options.cache ?? API_CONFIG.query.defaultCache,
    next: {
      revalidate:
        options.next?.revalidate ?? API_CONFIG.query.defaultRevalidate,
      tags: options.next?.tags ?? [],
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    console.log(response);
    const responseData: ApiResponse<T> = await response.json();
    return responseData;
  } catch (error: unknown) {
    console.error(`Query Error - ${endpoint}:`, error);

    if (error instanceof ApiError) {
      return {
        data: null as T,
        success: false,
        error: error.message,
      };
    }

    return {
      data: null as T,
      success: false,
      error:
        error instanceof Error ? error.message : '데이터 조회에 실패했습니다.',
    };
  }
}
