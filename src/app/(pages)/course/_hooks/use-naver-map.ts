'use client';

import { useEffect, useState } from 'react';

export const useNaverMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNaverMapScript = async () => {
      try {
        // 이미 로드된 경우
        if (window.naver ?? window.naver.maps) {
          setIsLoaded(true);
          return;
        }

        // 스크립트 태그 생성
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY_ID}`;
        script.async = true;

        // 프로미스로 스크립트 로드 대기
        const scriptPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error('네이버 지도 스크립트 로드 실패'));
        });

        document.head.appendChild(script);
        await scriptPromise;

        setIsLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
        console.error('네이버 지도 로드 실패:', err);
      }
    };

    void loadNaverMapScript();
  }, []);

  return { isLoaded, error };
};
