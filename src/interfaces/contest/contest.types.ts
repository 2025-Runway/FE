export interface Marathon {
  marathonId: number;
  title: string;
  addr: string;
  month: string;
  day: string;
  dayOfWeek: string;
  types: string[];
  applying: boolean;
}

export interface MarathonDetailPrice {
  type: string;
  price: string;
}

export interface MarathonDetailCourseInfo {
  crsIdx: string;
  crsKorNm: string;
  sigun: string;
  crsImgUrl: string;
}

export interface MarathonDetail {
  marathonId: number;
  title: string;
  month: string;
  day: string;
  dayOfWeek: string;
  addr: string;
  host: string;
  prices: MarathonDetailPrice[];
  courseInfos: MarathonDetailCourseInfo[];
  homepageUrl: string;
}

export interface MarathonContent {
  data: Marathon;
  pageInfo: any;
}

export interface MarathonSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface MarathonPageable {
  pageNumber: number;
  pageSize: number;
  sort: MarathonSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MarathonResponse {
  content: MarathonContent[];
  pageable: MarathonPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: MarathonSort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}