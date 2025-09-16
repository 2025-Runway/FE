import { ApiResponse } from '@/interfaces/api/response.types';
import { api } from '..';
import { Course } from '@/interfaces/course/course.types';
import { CourseTourInfoData } from '@/interfaces/course/tour-info.types';

/**
 * @description 코스 상세 조회 - 토큰x
 * @param course_id 코스 고유번호
 * @returns 코스 상세 정보
 */
export function getCourseDetail(
  course_id: string,
): Promise<ApiResponse<Course>> {
  return api.get(`/public/courses/${course_id}`);
}
/**
 * @description 코스 분석 요약 조회 - 토큰x
 * @param course_id 코스 고유번호
 * @returns 코스 분석 요약 정보
 */
export function getCourseAISummary(
  course_id: string,
): Promise<ApiResponse<{ analysis: string[] }>> {
  return api.get(`/public/courses/${course_id}/analysis`);
}

/**
 * @description 코스 관광지 정보 조회 - 토큰x
 * @param course_id 코스 고유번호
 * @returns 코스 관광지 정보
 */
export function getCourseTourInfo(
  course_id: string,
  contentType: string,
  page: number,
): Promise<ApiResponse<CourseTourInfoData>> {
  if (contentType === '') {
    // 전체
    return api.get(`/public/tourinfo/${course_id}?page=${page}`, {
      cache: 'force-cache',
    });
  } else {
    return api.get(
      `/public/tourinfo/${course_id}?contentType=${contentType}&page=${page}`,
      {
        cache: 'force-cache',
      },
    );
  }
}
