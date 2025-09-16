/**
 * 관광지 정보 아이템
 */
export interface TourInfoItem {
  contentId: string;
  contentType: string;
  title: string;
  category: string;
  address: string;
  imageUrl: string;
  mapX: number;
  mapY: number;
}

/**
 * 페이지네이션 정렬 정보
 */
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/**
 * 페이지네이션 정보
 */
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

/**
 * 관광지 정보 목록 api 응답 데이터
 */
export interface CourseTourInfoData {
  content: TourInfoItem[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

/**
 * 관광지 정보 API 응답
 */
export interface CourseTourInfoApiResponse {
  status: number;
  message: string;
  data: CourseTourInfoData;
}

/**
 * 관광지 정보 요청 파라미터
 */
export interface CourseTourInfoParams {
  crsIdx: string;
  contentType?: string;
  page: number;
  pageSize?: number;
}
