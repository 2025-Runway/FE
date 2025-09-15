import { Course, CourseApiResponse } from '@/interfaces/course/course.type';

// API 응답 구조에 맞는 남파랑길 1코스 목데이터
export const MOCK_COURSE_DATA: Course = {
  // 기본 식별자
  crsIdx: 'T_CRS_MNG0000005116',
  routeIdx: 'T_ROUTE_MNG0000000001',

  // 코스 기본 정보
  crsKorNm: '남파랑길 1코스',
  crsDstnc: 19, // 19km
  crsTotlRqrmHour: 420, // 420분 (7시간)
  crsLevel: 2, // 중 (1:쉬, 2:중, 3:상)
  crsCycle: '비순환형',

  // 코스 상세 정보
  crsContents:
    '갈맷길 3-1구간, 3-2구간과 중첩되는 구간으로서 해파랑길 시종점인 오륙도 해맞이 공원에서부터 부산 중구 부산대교까지 이어지는 구간이다.  신선이 노닐던 신선대 및 부산항의 역동적인 파노라마을 만끽할 수 있는 구간이며 세계에서 하나뿐인 UN기념공원 및 부산박물관, 영화 “친구”로 유명한 부산 일대의 명소를 함께 체험할 수 있다.  아름다운 해안경관과 우리나라 제1의 항구도시 부산의 매력을 느낄 수 있는 구간이다.',

  crsSummary:
    '• 해파랑길 시종점인 오륙도 해맞이 공원에서부터 부산 중구 부산대교까지 이어지는 구간\n• 신선이 노닐던 신선대 및 부산항의 역동?',

  crsTourInfo:
    "• 동쪽에서 보면 여섯 봉우리가 되고 서쪽에서 보면 다섯 봉우리가 되는 부산의 상징 '오륙도' \n• 오륙도와 영도를 어우르는 해인",

  travelerInfo:
    '• 시점 : 오륙도해맞이공원 (부산 남구 오륙도로 137) \n교통편) 경성대부경대역 24번 버스, 오륙도스카이워크 하차\n• 종진',

  sigun: '부산 남구',

  // 길 구분
  brdDiv: 'DNWW', // 걷기길

  // GPX 파일 정보
  gpxFilePath:
    'https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/course/summap/T_CRS_MNG0000005',

  // 이미지 정보
  crsImg: '/img/course/course-detail-preview.png',

  // 시간 정보
  createdAt: '2020-02-16T02:41:53',
  updatedAt: '2025-07-16T07:15:39',
};

// API 응답 형태의 목데이터
export const MOCK_COURSE_API_RESPONSE: CourseApiResponse = {
  status: 200,
  message: '요청에 성공하였습니다.',
  data: MOCK_COURSE_DATA,
};

// AI 런웨이 포인트 정보
export const MOCK_RUNWAY_POINTS = [
  {
    id: 1,
    title: '고도 정보',
    content:
      '코스의 평균 고도는 약 66m로, 반복적인 오르막 구간이 많아 체력적으로 부담이 될 수 있어 중급 이상의 러너에게 적합합니다.',
    type: 'difficulty' as const,
  },
  {
    id: 2,
    title: '초보자 팁',
    content:
      '초보자는 5-10km 왕복 구간만 이용하거나, 고도 변화가 적은 초반 구간만 러닝하는 것을 권장합니다.',
    type: 'tip' as const,
  },
];

// 코스 주변 시설 정보 (탭에서 사용할 데이터)
export const MOCK_SURROUNDING_FACILITIES = {
  전체: [
    { name: '오륙도 해맞이공원', type: '관광지', distance: 0.2 },
    { name: '신선대', type: '관광지', distance: 1.5 },
    { name: 'UN기념공원', type: '문화시설', distance: 2.8 },
    { name: '부산박물관', type: '문화시설', distance: 3.2 },
    { name: '부산대교', type: '관광지', distance: 10.0 },
  ],
  음식점: [
    { name: '해운대 해물탕', type: '음식점', distance: 1.2 },
    { name: '부산 밀면집', type: '음식점', distance: 2.5 },
    { name: '남포동 회센터', type: '음식점', distance: 4.1 },
  ],
  관광지: [
    { name: '오륙도 해맞이공원', type: '관광지', distance: 0.2 },
    { name: '신선대', type: '관광지', distance: 1.5 },
    { name: '부산대교', type: '관광지', distance: 10.0 },
    { name: '영화 친구 촬영지', type: '관광지', distance: 3.8 },
  ],
  문화시설: [
    { name: 'UN기념공원', type: '문화시설', distance: 2.8 },
    { name: '부산박물관', type: '문화시설', distance: 3.2 },
    { name: '부산시립미술관', type: '문화시설', distance: 4.5 },
  ],
  '축제/공연/행사': [
    { name: '부산국제영화제', type: '축제', distance: 3.5 },
    { name: '부산바다축제', type: '축제', distance: 1.8 },
  ],
  레포츠: [
    { name: '해운대 해수욕장', type: '레포츠', distance: 1.0 },
    { name: '부산아쿠아리움', type: '레포츠', distance: 2.2 },
  ],
  숙박: [
    { name: '해운대 그랜드호텔', type: '숙박', distance: 1.5 },
    { name: '부산 파크하얏트', type: '숙박', distance: 3.8 },
  ],
  쇼핑: [
    { name: '남포동 상가', type: '쇼핑', distance: 4.0 },
    { name: '부산국제시장', type: '쇼핑', distance: 4.2 },
  ],
};

// 코스 통계 정보 (API 데이터 기반)
export const MOCK_COURSE_STATS = {
  difficulty: '중',
  estimatedTime: '07:00', // 420분 = 7시간
  courseLength: '19km',
  averageAltitude: 66,
  elevationGain: 120,
  elevationLoss: 80,
};

// 코스 이미지 정보
export const MOCK_COURSE_IMAGES = [
  {
    id: 1,
    url: '/images/courses/nampareung-gil-1-main.jpg',
    alt: '남파랑길 1코스 메인 이미지',
    description: '남쪽의 쪽빛 바다와 함께 걷는 길',
  },
  {
    id: 2,
    url: '/images/courses/nampareung-gil-1-map.jpg',
    alt: '남파랑길 1코스 지도',
    description: '오륙도 해맞이공원에서 부산대교까지의 경로',
  },
];

// 코스 상세 정보 (API 데이터 기반)
export const MOCK_COURSE_DETAILS = {
  startPoint: '오륙도해맞이공원 (부산 남구 오륙도로 137)',
  endPoint: '부산대교 (부산 중구)',
  region: '부산 남구',
  type: '비순환형',
  surface: '포장도로, 보도',
  facilities: ['주차장', '화장실', '음수대', '휴게소'],
  accessibility: '휠체어 접근 가능',
  bestSeason: '봄, 가을',
  weather: '해안가 특성상 바람이 강할 수 있음',
  transportation: '경성대부경대역 24번 버스, 오륙도스카이워크 하차',
};
