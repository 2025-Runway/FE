import { fetchQuery } from './fetch-query';
import { fetchMutation, type MutationOptions } from './fetch-mutation';
import { FetchOptions } from '@/interfaces/api/request.types';
import { cache } from 'react';
import { ApiResponse } from '@/interfaces/api/response.types';

/**
 * 공개 URL 패턴 (토큰 불필요)
 */
const PUBLIC_PATTERNS = [
  '/public/', // 모든 공개 API
  '/auth/test', // 테스트 로그인
  '/auth/login/kakao', // 카카오 로그인
];

/**
 * URL이 토큰이 필요한지 확인
 * 기본 원칙: /public/로 시작하면 공개, 그 외는 인증 필요
 */
const requiresAuth = (endpoint: string): boolean => {
  // /public/로 시작하는 URL은 토큰 불필요
  if (endpoint.startsWith('/public/')) {
    return false;
  }

  // 기타 공개 패턴 확인
  const isPublicEndpoint = PUBLIC_PATTERNS.some(pattern =>
    endpoint.startsWith(pattern),
  );

  if (isPublicEndpoint) {
    return false;
  }

  // 그 외 모든 URL은 토큰 필요
  return true;
};

/**
 * 토큰 가져오기 (Zustand 스토어 or 쿠키에서 -> 정해야 함.)
 */
/* eslint-disable @typescript-eslint/no-require-imports*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const getAuthToken = async (): Promise<string | null> => {
  // 서버 사이드에서는 쿠키에서 토큰 가져오기
  if (typeof window === 'undefined') {
    try {
      const { cookies } = require('next/headers');
      const { unstable_noStore } = require('next/cache');
      unstable_noStore(); // 정적 생성 비활성화
      const cookieStore = await cookies();
      const token = cookieStore.get('accessToken')?.value;
      return token ?? null;
    } catch (error) {
      console.warn('서버에서 토큰 가져오기 실패:', error);
      return null;
    }
  } else {
    try {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken ?? null;
    } catch (error) {
      console.warn('토큰 가져오기 실패:', error);
      return null;
    }
  }
};
/**
 * 자동 인증 헤더 추가 함수
 */
const addAuthHeaders = async (
  endpoint: string,
  options: Omit<FetchOptions, 'method' | 'body'> | MutationOptions = {},
): Promise<Omit<FetchOptions, 'method' | 'body'> | MutationOptions> => {
  const needsAuth = requiresAuth(endpoint);

  if (!needsAuth) {
    return options;
  }

  const token = await getAuthToken();

  return {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
};

/**
 * @description 캐시된 GET 요청 함수
 * @param endpoint API 엔드포인트
 * @param options fetch 옵션 (캐싱 설정 포함)
 * @returns Promise<ApiResponse<T>>
 */
export const cachedGet = cache(
  async <T>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<ApiResponse<T>> => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return await fetchQuery<T>(endpoint, enhancedOptions);
  },
);

/**
 * @description 편의를 위한 fetch API 래퍼 함수들
 * @example
 * ```typescript
 * const users = await api.get<User[]>('/users', {
 *   next: { revalidate: 300, tags: ['users'] }
 * });
 * const newUser = await api.post<User>('/users', {
 *   data: { name: 'John', email: 'john@example.com' }
 * });
 * const updatedUser = await api.patch<User>('/users/1', {
 *   data: { name: 'Jane' }
 * });
 * const deleteResult = await api.delete<{ success: boolean }>('/users/1');
 * ```
 *
 * @author yun_yj
 */

export const api = {
  // Query 래퍼
  get: async <T>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ) => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return fetchQuery<T>(endpoint, enhancedOptions);
  },

  // Mutation 래퍼들
  post: async <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return fetchMutation<T>('POST', endpoint, enhancedOptions);
  },

  patch: async <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return fetchMutation<T>('PATCH', endpoint, enhancedOptions);
  },

  put: async <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return fetchMutation<T>('PUT', endpoint, enhancedOptions);
  },

  delete: async <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = await addAuthHeaders(endpoint, options);
    return fetchMutation<T>('DELETE', endpoint, enhancedOptions);
  },
};
