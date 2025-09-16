/**
 * @description fetch API 응답 타입을 정의하는 타입
 *
 *
 */
export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message?: string;
  error?: string;
}
