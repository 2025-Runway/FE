import { API_CONFIG } from './config';
import type { ApiResponse } from '@/interfaces/api/response.types';

/**
 * Mutation 옵션 타입 정의
 */
export interface MutationOptions extends Omit<RequestInit, 'method' | 'body'> {
  /** 요청 바디 데이터 (자동으로 JSON.stringify 처리) */
  data?: unknown;
  /** 타임아웃 설정 (ms) */
  timeout?: number;
}

/**
 * 타임아웃 기능이 있는 fetch 래퍼
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * POST/PATCH/DELETE 등의 Mutation 작업 전용 fetch wrapper
 * - API Route의 응답을 그대로 전달 (throw하지 않음)
 * - 자동 JSON 처리
 * - 타임아웃 지원
 *
 * @param method HTTP 메서드
 * @param endpoint API 엔드포인트
 * @param options mutation 옵션
 * @returns Promise<ApiResponse<T>>
 */
export async function fetchMutation<T>(
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  endpoint: string,
  options: MutationOptions = {},
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_CONFIG.baseURL}${endpoint}`;

  const {
    data,
    timeout = API_CONFIG.mutation.timeout,
    ...restOptions
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      ...API_CONFIG.defaultHeaders,
      ...restOptions.headers,
    },
    cache: API_CONFIG.mutation.defaultCache,
    body: data ? JSON.stringify(data) : null,
    ...restOptions,
  };

  try {
    const response = await fetchWithTimeout(url, config, timeout);

    // Content-Type 확인
    const contentType = response.headers.get('content-type');
    const isJsonResponse = contentType?.includes('application/json') ?? false;

    // JSON 응답 파싱 (성공/실패 상관없이)
    let responseData: ApiResponse<T>;

    if (isJsonResponse) {
      responseData = await response.json();
    } else {
      // JSON이 아닌 경우 기본 응답 구조 생성
      responseData = {
        data: {} as T,
        success: response.ok,
        message: response.statusText,
      };
    }

    // API Route에서 온 응답을 그대로 반환 (throw하지 않음)
    return responseData;
  } catch (error: unknown) {
    console.error(`Mutation Error - ${method} ${endpoint}:`, error);

    // 타임아웃 에러 처리
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        data: null as T,
        success: false,
        message: '요청 시간이 초과되었습니다.',
      };
    }

    // 네트워크 에러나 기타 에러 처리
    return {
      data: null as T,
      success: false,
      message:
        error instanceof Error ? error.message : '요청 처리에 실패했습니다.',
    };
  }
}
