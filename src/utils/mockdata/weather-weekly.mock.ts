import { WeeklyWeatherData, WeeklyWeatherApiResponse } from '@/interfaces/weather.types';

// 주간 예보 목데이터
export const MOCK_WEEKLY_WEATHER_DATA: WeeklyWeatherData[] = [
  {
    date: '2025-09-05',
    dayOfWeek: '금',
    weatherAm: '맑음',
    weatherPm: '구름많음',
    tempMin: 22,
    tempMax: 30,
  },
  {
    date: '2025-09-06',
    dayOfWeek: '토',
    weatherAm: '흐림+비',
    weatherPm: '흐림',
    tempMin: 21,
    tempMax: 28,
  },
  {
    date: '2025-09-07',
    dayOfWeek: '일',
    weatherAm: '흐림',
    weatherPm: '맑음',
    tempMin: 20,
    tempMax: 26,
  },
  {
    date: '2025-09-08',
    dayOfWeek: '월',
    weatherAm: '맑음',
    weatherPm: '맑음',
    tempMin: 18,
    tempMax: 24,
  },
  {
    date: '2025-09-09',
    dayOfWeek: '화',
    weatherAm: '구름많음',
    weatherPm: '흐림+비',
    tempMin: 19,
    tempMax: 25,
  },
  {
    date: '2025-09-10',
    dayOfWeek: '수',
    weatherAm: '흐림',
    weatherPm: '흐림',
    tempMin: 17,
    tempMax: 23,
  },
  {
    date: '2025-09-11',
    dayOfWeek: '목',
    weatherAm: '맑음',
    weatherPm: '구름많음',
    tempMin: 16,
    tempMax: 22,
  },
];

// API 응답 형태의 목데이터
export const MOCK_WEEKLY_WEATHER_API_RESPONSE: WeeklyWeatherApiResponse = {
  status: 200,
  message: '요청에 성공하였습니다.',
  data: MOCK_WEEKLY_WEATHER_DATA,
};
