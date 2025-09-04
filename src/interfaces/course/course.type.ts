export interface Course {
  // 기본 식별자
  crsIdx: string; // 코스 고유번호 (VARCHAR(50))
  courseIdx: string; // 일 고유번호 (VARCHAR(50))

  // 코스 기본 정보
  crsKorNm: string; // 코스명 (VARCHAR(200))
  crsDstnc: number; // 코스 길이 (DECIMAL(5,2)) - km 단위, 최대 999.99
  crsTotlRqrmtHour: number; // 총 소요시간 (INT) - 분 단위
  crsLevel: number; // 난이도 (TINYINT) - 1:쉬, 2:중, 3:상
  crsCycle: string; // 순환형태 (VARCHAR(50)) - 순환형/비순환

  // 코스 상세 정보 (선택적 필드들)
  crsContents?: string; // 코스 내용 (TEXT) - HTML 포함
  crsSummary?: string; // 코스 개요 (TEXT)
  crsTourInfo?: string; // 관광 포인트 (TEXT)
  travelerInfo?: string; // 외협자 정보 (TEXT)
  sigun?: string; // 행정구역 (VARCHAR(100)) - 예: 성남 일산시

  // 길 구분
  grdDiv: 'DNWW' | 'DNBW'; // 길 구분 (ENUM) - DNWW: 걷기길, DNBW: 자전거길

  // GPX 파일 정보
  gpxFileUrl?: string; // GPX 파일 경로 (VARCHAR(500)) - URL

  // 시간 정보
  createdtime?: Date; // 등록일 (DATETIME)
  modifiedtime?: Date; // 수정일 (DATETIME)

  // 추가 정보
  field?: string; // 코스 이미지 (VARCHAR(200)) - 크롤링용
}
