'use client';

import { useQuery } from '@tanstack/react-query';

export interface ILocation {
  latitude: number;
  longitude: number;
}

// IP 기반 위치 서비스 (GPS/Wi-Fi 실패 시 fallback)
const getLocationFromIP = async (): Promise<ILocation> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP 위치 서비스 응답 오류');

    const data = await response.json();

    if (!data.latitude || !data.longitude) {
      throw new Error('IP 위치 데이터 없음');
    }

    return {
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
    };
  } catch (error) {
    // Fallback to ipgeolocation.io
    try {
      const response = await fetch(
        'https://api.ipgeolocation.io/ipgeo?apiKey=anonymous',
      );
      const data = await response.json();

      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      };
    } catch {
      throw new Error('모든 IP 위치 서비스 실패');
    }
  }
};

// GPS 실패 시 IP 기반 위치로 fallback하는 함수
const getCurrentPosition = (): Promise<ILocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported.'));
      return;
    }

    let attempts = 0;
    const maxAttempts = 2; // 1번 재시도까지만

    const tryGetPosition = () => {
      const options: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 2500,
        maximumAge: 600000,
      };

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          // GPS 실패 시 재시도 (1번까지만)
          if (attempts < maxAttempts - 1) {
            attempts++;
            setTimeout(tryGetPosition, 1000);
            return;
          }

          // 최종 실패 - IP 기반 위치로 fallback
          getLocationFromIP()
            .then(ipLocation => resolve(ipLocation))
            .catch(ipError =>
              reject(new Error(`모든 위치 서비스 실패: ${ipError.message}`)),
            );
        },
        options,
      );
    };

    tryGetPosition();
  });
};

export const useGeoLocation = () => {
  return useQuery({
    queryKey: ['geolocation'],
    queryFn: getCurrentPosition,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: 2, // React Query 레벨에서도 2번 재시도
    retryDelay: 1000, // 1초 간격
    refetchOnWindowFocus: false,
  });
};
