/**
 * 최근 본 코스 타입
 */
export interface CourseHistory {
  crsIdx: string;
  crsKorNm: string;
  crsDstnc: number;
  viewedAt: string;
  sigun: string;
  crsImgUrl: string;
}

/**
 * 전국인기코스 타입
 */
export interface PopularCourse {
  sigun: string;
  crsKorNm: string;
  crsIdx: string;
  crsImgUrl: string;
}

/**
 * 날씨 정보 타입
 */
export interface WeatherInfo {
  temperature: number;
  condition: string;
  airQuality: string;
}
