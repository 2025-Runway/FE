export type Weather =
  | '맑음'
  | '구름많음'
  | '흐림'
  | '흐림+비'
  | '흐리고 비'
  | '흐림+눈'
  | '흐림+소나기';
export type FineDust = '좋음' | '보통' | '나쁨' | '매우나쁨' | '점검중';
export type UvIndex = '낮음' | '보통' | '높음' | '매우높음' | '위험' | '점검중';
export type AirQuality = '좋음' | '보통' | '나쁨' | '매우나쁨' | '점검중';

// 현재 날씨 데이터 타입
export interface WeatherNowData {
  location: string;
  temperature: number;
  weather: Weather; // enum type
  windSpeed: string;
  fineDust: FineDust; // enum type
  uvIndex: UvIndex; // enum type
}

// 주간 예보 데이터 타입
export interface WeeklyWeatherData {
  date: string; // YYYY-MM-DD 형식
  dayOfWeek: string; // 요일 (월, 화, 수, 목, 금, 토, 일)
  weatherAm: Weather; // 오전 날씨
  weatherPm: Weather; // 오후 날씨
  tempMin: number; // 최저 기온
  tempMax: number; // 최고 기온
  airQuality: AirQuality; // 공기 질 지수
}

// 주간 예보 API 응답 타입
export interface WeeklyWeatherApiResponse {
  status: number;
  message: string;
  data: WeeklyWeatherData[];
}

// 날씨 카드 타입 (오늘, 내일, 일반)
export type WeatherCardType = 'today' | 'tomorrow' | 'weekday';
