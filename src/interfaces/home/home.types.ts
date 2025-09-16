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

/**
 * 사용자 정보 타입
 */
export interface UserInfo {
  nickname: string;
  profileImageUrl: string | null;
  destination: string;
  regionImageUrl: string;
}

/**
 * 검색 결과 아이템 타입
 */
export interface SearchResult {
  crsIdx: string;
  crsName: string;
  address: string;
}

/**
 * 검색 응답 타입
 */
export interface SearchResponse {
  content: SearchResult[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
