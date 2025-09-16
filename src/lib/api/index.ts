import { fetchQuery } from './fetch-query';
import { fetchMutation, type MutationOptions } from './fetch-mutation';
import { FetchOptions } from '@/interfaces/api/request.types';

/**
 * 공개 URL 패턴 (토큰 불필요)
 */
const PUBLIC_PATTERNS = [
  '/public/', // 모든 공개 API
  '/auth/test', // 테스트 로그인
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
const getAuthToken = (): string | null => {
  // 서버 사이드에서는 토큰 없음
  // if (typeof window === 'undefined') return null;

  // try {
  //   // Zustand persist storage에서 직접 가져오기
  //   const authStorage = localStorage.getItem('auth-storage');
  //   if (authStorage) {
  //     const parsed = JSON.parse(authStorage);
  //     return parsed.state?.token || null;
  //   }
  // } catch (error) {
  //   console.warn('토큰 가져오기 실패:', error);
  // }

  return null;
};
/**
 * 자동 인증 헤더 추가 함수
 */
const addAuthHeaders = (
  endpoint: string,
  options: Omit<FetchOptions, 'method' | 'body'> | MutationOptions = {},
): Omit<FetchOptions, 'method' | 'body'> | MutationOptions => {
  const needsAuth = requiresAuth(endpoint);

  if (!needsAuth) {
    return options;
  }

  const token = getAuthToken();

  if (!token) {
    console.warn(`토큰이 필요한 API이지만 토큰이 없습니다: ${endpoint}`);
    // 토큰이 없어도 요청은 보냄 (서버에서 401 처리)
  }

  return {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
};
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
  get: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ) => {
    const enhancedOptions = addAuthHeaders(endpoint, options);
    return fetchQuery<T>(endpoint, enhancedOptions);
  },

  // Mutation 래퍼들
  post: <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = addAuthHeaders(endpoint, options);
    return fetchMutation<T>('POST', endpoint, enhancedOptions);
  },

  patch: <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = addAuthHeaders(endpoint, options);
    return fetchMutation<T>('PATCH', endpoint, enhancedOptions);
  },

  put: <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = addAuthHeaders(endpoint, options);
    return fetchMutation<T>('PUT', endpoint, enhancedOptions);
  },

  delete: <T>(endpoint: string, options?: MutationOptions) => {
    const enhancedOptions = addAuthHeaders(endpoint, options);
    return fetchMutation<T>('DELETE', endpoint, enhancedOptions);
  },
};
