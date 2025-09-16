'use client';

import { useState, useEffect } from 'react';
import GPXRouteMap from './gpx-parser-map';

export function CourseMap({ gpxUrl }: { gpxUrl: string }) {
  const [gpxContent, setGpxContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGpxContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // GPX 파일 다운로드
        const response = await fetch(
          `/api/gpx-proxy?url=${encodeURIComponent(gpxUrl)}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const content = await response.text();
        setGpxContent(content);
      } catch (err) {
        console.error('GPX 파일 로드 실패:', err);
        setError('GPX 파일을 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchGpxContent();
  }, []);

  if (isLoading) {
    return (
      <div className='flex px-4 pt-8 pb-10'>
        <div className='bg-gray-1 text-gray-bk flex aspect-[368/220] h-auto max-h-[300px] w-full items-center justify-center rounded-[20px]'>
          <div className='text-center'>
            <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent'></div>
            <p>경로를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex px-4 pt-8 pb-10'>
        <div className='bg-gray-1 text-gray-bk flex aspect-[368/220] h-auto max-h-[300px] w-full items-center justify-center rounded-[20px]'>
          <div className='text-center text-red-500'>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex px-4 pt-8 pb-10'>
      <div className='bg-gray-1 text-gray-bk flex-center aspect-[368/220] h-auto max-h-[280px] min-h-[220px] w-full rounded-[20px]'>
        {gpxContent && (
          <GPXRouteMap
            gpxContent={gpxContent}
            routeStyle={{
              strokeColor: '#00C851',
              strokeWeight: 6,
              strokeOpacity: 0.8,
            }}
            markerStyle={{
              startColor: '#00C851',
              endColor: '#FF6B6B',
              waypointColor: '#00C851',
              size: 15,
            }}
            waypointInterval={3}
            showInfo={true}
          />
        )}
      </div>
    </div>
  );
}
