import { useMemo } from 'react';
import { AirQuality, FineDust, UvIndex } from '@/interfaces/weather.types';

export type RunningIndex = '좋음' | '보통' | '나쁨';

export interface RunningCondition {
  index: RunningIndex;
  score: number;
  tip: string;
  description: string;
  factors: {
    temperature: { score: number; status: string };
    windSpeed: { score: number; status: string };
    fineDust: { score: number; status: string };
    uvIndex: { score: number; status: string };
  };
}

export interface WeatherData {
  temperature: number;
  windSpeed?: number; // m/s
  fineDust?: FineDust;
  uvIndex?: UvIndex;
  airQuality?: AirQuality;
}

/**
 * 종합적인 날씨 조건으로 러닝 지수를 계산하는 훅
 * @param weatherData 날씨 데이터
 * @returns 러닝 지수 정보
 */
export function useRunningCondition(
  weatherData: WeatherData,
): RunningCondition {
  return useMemo(() => {
    const { temperature, windSpeed, fineDust, uvIndex, airQuality } =
      weatherData;

    // 각 요소별 점수 계산
    const temperatureScore = calculateTemperatureScore(temperature);
    const windSpeedScore = calculateWindSpeedScore(windSpeed ?? 0);
    const fineDustScore = calculateFineDustScore(fineDust ?? '보통');
    const uvIndexScore = calculateUvIndexScore(uvIndex ?? '보통');
    const airQualityScore = calculateAirQualityScore(airQuality ?? '보통');
    // 가중치 적용 (온도 40%, 풍속 20%, 미세먼지 25%, 자외선 15%)
    const totalScore = Math.round(
      temperatureScore.score * 0.4 +
        windSpeedScore.score * 0.2 +
        fineDustScore.score * 0.25 +
        uvIndexScore.score * 0.15 +
        airQualityScore.score * 0.1,
    );

    // 종합 지수 결정
    let index: RunningIndex;
    let tip: string;
    let description: string;

    if (totalScore >= 80) {
      index = '좋음';
      tip = '완벽한 러닝 날씨입니다!';
      description = '모든 조건이 러닝하기에 최적입니다.';
    } else if (totalScore >= 60) {
      index = '보통';
      tip = getModerateTip(
        temperatureScore,
        windSpeedScore,
        fineDustScore,
        uvIndexScore,
      );
      description = '약간의 준비가 필요한 날씨입니다.';
    } else {
      index = '나쁨';
      tip = getBadTip(
        temperatureScore,
        windSpeedScore,
        fineDustScore,
        uvIndexScore,
      );
      description = '러닝에 주의가 필요한 날씨입니다.';
    }

    return {
      index,
      score: totalScore,
      tip,
      description,
      factors: {
        temperature: temperatureScore,
        windSpeed: windSpeedScore,
        fineDust: fineDustScore,
        uvIndex: uvIndexScore,
      },
    };
  }, [weatherData]);
}

// 온도 점수 계산
function calculateTemperatureScore(temperature: number): {
  score: number;
  status: string;
} {
  if (temperature >= 10 && temperature <= 20) {
    return { score: 100, status: '최적' };
  } else if (temperature >= 5 && temperature < 10) {
    return { score: 70, status: '쌀쌀' };
  } else if (temperature > 20 && temperature <= 25) {
    return { score: 80, status: '따뜻' };
  } else if (temperature > 25 && temperature <= 30) {
    return { score: 60, status: '더움' };
  } else if (temperature > 30) {
    return { score: 30, status: '매우 더움' };
  } else {
    return { score: 40, status: '추움' };
  }
}

// 풍속 점수 계산
function calculateWindSpeedScore(windSpeed: number): {
  score: number;
  status: string;
} {
  if (windSpeed <= 2) {
    return { score: 100, status: '무풍' };
  } else if (windSpeed <= 5) {
    return { score: 90, status: '약한 바람' };
  } else if (windSpeed <= 10) {
    return { score: 70, status: '보통 바람' };
  } else if (windSpeed <= 15) {
    return { score: 50, status: '강한 바람' };
  } else {
    return { score: 20, status: '매우 강한 바람' };
  }
}

// 미세먼지 점수 계산
function calculateFineDustScore(fineDust: FineDust): {
  score: number;
  status: string;
} {
  switch (fineDust) {
    case '좋음':
      return { score: 100, status: '좋음' };
    case '보통':
      return { score: 80, status: '보통' };
    case '나쁨':
      return { score: 40, status: '나쁨' };
    case '매우나쁨':
      return { score: 10, status: '매우나쁨' };
    case '점검중':
      return { score: 50, status: '점검중' };
    default:
      return { score: 50, status: '알 수 없음' };
  }
}

// 자외선 지수 점수 계산
function calculateUvIndexScore(uvIndex: UvIndex): {
  score: number;
  status: string;
} {
  switch (uvIndex) {
    case '낮음':
      return { score: 100, status: '낮음' };
    case '보통':
      return { score: 80, status: '보통' };
    case '높음':
      return { score: 60, status: '높음' };
    case '매우높음':
      return { score: 30, status: '매우높음' };
    case '위험':
      return { score: 10, status: '위험' };
    case '점검중':
      return { score: 50, status: '점검중' };
    default:
      return { score: 50, status: '알 수 없음' };
  }
}

// 공기 질 점수 계산
function calculateAirQualityScore(airQuality: AirQuality): {
  score: number;
  status: string;
} {
  switch (airQuality) {
    case '좋음':
      return { score: 100, status: '좋음' };
    case '보통':
      return { score: 80, status: '보통' };
    case '나쁨':
      return { score: 40, status: '나쁨' };
    case '매우나쁨':
      return { score: 10, status: '매우나쁨' };
    case '점검중':
      return { score: 50, status: '점검중' };
    default:
      return { score: 50, status: '알 수 없음' };
  }
}
// 보통 등급 팁 생성
function getModerateTip(
  temp: { score: number; status: string },
  wind: { score: number; status: string },
  dust: { score: number; status: string },
  uv: { score: number; status: string },
): string {
  const tips = [];

  if (temp.score < 70) {
    if (temp.status === '쌀쌀') tips.push('따뜻한 옷을 입으세요');
    if (temp.status === '따뜻') tips.push('가벼운 옷을 입으세요');
    if (temp.status === '더움') tips.push('충분한 수분을 섭취하세요');
  }

  if (wind.score < 70) {
    tips.push('바람막이를 챙기세요');
  }

  if (dust.score < 70) {
    tips.push('마스크를 착용하세요');
  }

  if (uv.score < 70) {
    tips.push('자외선 차단제를 바르세요');
  }

  return tips.length > 0 ? tips.join(', ') : '모자와 바람막이를 챙기세요!';
}

// 나쁨 등급 팁 생성
function getBadTip(
  temp: { score: number; status: string },
  wind: { score: number; status: string },
  dust: { score: number; status: string },
  uv: { score: number; status: string },
): string {
  if (temp.score < 50) {
    if (temp.status === '매우 더움') return '실내 러닝을 권장합니다!';
    if (temp.status === '추움') return '따뜻한 옷을 입고 러닝하세요!';
  }

  if (dust.score < 50) {
    return '미세먼지가 심하니 실내 러닝을 권장합니다!';
  }

  if (wind.score < 50) {
    return '강한 바람으로 러닝이 어려울 수 있습니다!';
  }

  if (uv.score < 50) {
    return '자외선이 강하니 실내 러닝을 권장합니다!';
  }

  return '러닝에 주의가 필요한 날씨입니다!';
}

/**
 * 러닝 지수에 따른 색상 반환
 * @param index 러닝 지수
 * @returns 색상 클래스명
 */
export function getRunningIndexColor(index: RunningIndex): string {
  switch (index) {
    case '좋음':
      return 'text-green-500';
    case '보통':
      return 'text-yellow-500';
    case '나쁨':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

/**
 * 러닝 지수에 따른 배경 색상 반환
 * @param index 러닝 지수
 * @returns 배경 색상 클래스명
 */
export function getRunningIndexBgColor(index: RunningIndex): string {
  switch (index) {
    case '좋음':
      return 'bg-green-100';
    case '보통':
      return 'bg-yellow-100';
    case '나쁨':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
}
