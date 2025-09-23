// API 응답 구조에 맞는 Course 타입
export interface Course {
  // 기본 식별자
  crsIdx: string; // 코스 고유번호
  routeIdx: string; // 루트 고유번호

  // 코스 기본 정보
  crsKorNm: string; // 코스명
  crsDstnc: number; // 코스 길이 (km)
  crsTotlRqrmHour: number; // 총 소요시간 (분)
  crsLevel: number; // 난이도 (1:쉬, 2:중, 3:상)
  crsCycle: string; // 순환형태

  // 코스 상세 정보
  crsContents: string; // 코스 내용
  crsSummary: string; // 코스 개요
  crsTourInfo: string; // 관광 포인트
  travelerInfo: string; // 여행자 정보
  sigun: string; // 행정구역

  // 길 구분
  brdDiv: string; // 길 구분 (DNWW: 걷기길, DNBW: 자전거길)

  // GPX 파일 정보
  gpxFilePath: string; // GPX 파일 경로

  // 이미지 정보
  crsImg: string | null; // 코스 이미지

  // 시간 정보
  createdAt: string; // 등록일 (ISO 8601 형식)
  updatedAt: string; // 수정일 (ISO 8601 형식)

  // 찜 여부
  isFavorite?: boolean; // 찜 여부
}

// API 응답 래퍼 타입
export interface CourseApiResponse {
  status: number;
  message: string;
  data: Course;
}
