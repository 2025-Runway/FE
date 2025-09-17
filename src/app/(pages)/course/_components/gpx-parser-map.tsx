/* eslint-disable */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useNaverMap } from '../_hooks/use-naver-map';
import { GPXParser, GPXTrack, GPXPoint } from '../_utils/gpx-parser';

interface GPXRouteMapProps {
  /** GPX 파일 내용 */
  gpxContent?: string;
  /** 직접 전달할 경로 포인트들 */
  routePoints?: GPXPoint[];
  /** 지도 크기 (부모 크기 자동 감지 시 무시됨) */
  width?: string;
  height?: string;
  /** 부모 크기 자동 감지 여부 */
  autoSize?: boolean;
  /** 경로 스타일 */
  routeStyle?: {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
  };
  /** 마커 스타일 */
  markerStyle?: {
    startColor?: string;
    endColor?: string;
    waypointColor?: string;
    size?: number;
  };
  /** 웨이포인트 간격 (몇 번째 점마다 표시할지) */
  waypointInterval?: number;
  /** 경로 정보 표시 여부 */
  showInfo?: boolean;
}

const GPXRouteMap = ({
  gpxContent,
  routePoints,
  width = '400px',
  height = '300px',
  autoSize = true,
  routeStyle = {
    strokeColor: '#00C851',
    strokeWeight: 6,
    strokeOpacity: 0.8,
  },
  markerStyle = {
    startColor: '#00C851',
    endColor: '#FF6B6B',
    waypointColor: '#00C851',
    size: 12,
  },
  waypointInterval = 20,
  showInfo = true,
}: GPXRouteMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [track, setTrack] = useState<GPXTrack | null>(null);
  const [containerSize, setContainerSize] = useState({ width, height });
  const { isLoaded, error } = useNaverMap();
  const polylineRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 부모 크기 측정
  const measureParentSize = useCallback(() => {
    if (!autoSize || !containerRef.current) return;

    const parent = containerRef.current.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    setContainerSize({
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  }, [autoSize]);

  // ResizeObserver로 부모 크기 변화 감지
  useEffect(() => {
    if (!autoSize) return;

    measureParentSize();

    const resizeObserver = new ResizeObserver(measureParentSize);
    const parent = containerRef.current?.parentElement;

    if (parent) {
      resizeObserver.observe(parent);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [autoSize, measureParentSize]);

  // GPX 데이터 파싱
  useEffect(() => {
    if (gpxContent) {
      try {
        const parsedTrack = GPXParser.parseGPX(gpxContent);
        setTrack(parsedTrack);
      } catch (err) {
        console.error('GPX 파싱 오류:', err);
      }
    } else if (routePoints) {
      setTrack({
        name: 'Custom Route',
        points: routePoints,
      });
    }
  }, [gpxContent, routePoints]);

  // 지도 크기 업데이트
  useEffect(() => {
    if (map && mapRef.current) {
      // 네이버 지도 크기 동적 조정
      window.naver.maps.Event.trigger(map, 'resize');
    }
  }, [containerSize, map]);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map || !window.naver?.maps || !track)
      return;

    try {
      // 경로의 중심점과 적절한 줌 레벨 계산
      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(0, 0),
        new window.naver.maps.LatLng(0, 0),
      );
      track?.points.forEach(point => {
        bounds.extend(new window.naver.maps.LatLng(point.lat, point.lng));
      });

      const center = bounds.getCenter();

      const mapOptions = {
        center: center,
        zoom: 12,
        mapTypeId: window.naver.maps.MapTypeId.NORMAL,
        zoomControl: false, // 줌 컨트롤 비활성화
        scrollWheel: false, // 마우스 휠 줌 비활성화
        pinchZoom: false, // 핀치 줌 비활성화 (모바일)
        keyboardShortcuts: false, // 키보드 단축키 비활성화
        disableDoubleClickZoom: true, // 더블클릭 줌 비활성화
        mapTypeControl: false, // 일반/위성 탭 제거
        scaleControl: true,
        logoControl: false,
        minZoom: 8, // 최소 줌 레벨 설정
        maxZoom: 18, // 최대 줌 레벨 설정
      };

      const naverMap = new window.naver.maps.Map(mapRef.current, mapOptions);
      setMap(naverMap);

      // 경로가 전체적으로 보이도록 bounds에 맞춰 줌 조정 (시작점/끝점 잘림 방지)
      window.naver.maps.Event.once(naverMap, 'init', () => {
        naverMap.fitBounds(bounds, {
          top: 10, // 상단 패딩 증가 (마커 크기 고려)
          right: 60, // 우측 패딩 증가 (마커 크기 고려)
          bottom: 60, // 하단 패딩 증가 (마커 크기 고려)
          left: 60, // 좌측 패딩 증가 (마커 크기 고려)
        });
      });
    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  }, [isLoaded, track]);

  // 경로와 마커 그리기
  useEffect(() => {
    if (!map || !track || !window.naver?.maps) return;

    // 기존 경로와 마커 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const points = track.points;
    if (points.length === 0) return;

    // 경로 그리기 (Polyline)
    const path = points.map(
      point => new window.naver.maps.LatLng(point.lat, point.lng),
    );

    polylineRef.current = new window.naver.maps.Polyline({
      map: map,
      path: path,
      strokeColor: routeStyle.strokeColor,
      strokeWeight: (routeStyle.strokeWeight ?? 0) + 2,
      strokeOpacity: routeStyle.strokeOpacity,
    });

    // 시작점 마커
    const startMarker = new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(points[0].lat, points[0].lng),
      radius: markerStyle.size,
      fillColor: markerStyle.startColor,
      fillOpacity: 0.5,
      strokeWeight: 10,
      strokeColor: '#014538',
      zIndex: 11,
    });
    markersRef.current.push(startMarker);

    // 끝점 마커
    if (points.length > 1) {
      const endMarker = new window.naver.maps.Circle({
        map: map,
        center: new window.naver.maps.LatLng(
          points[points.length - 1].lat,
          points[points.length - 1].lng,
        ),
        radius: markerStyle.size,
        fillColor: markerStyle.endColor,
        fillOpacity: 0.5,
        strokeWeight: 10,
        strokeColor: '#ff4a4a',
        zIndex: 11,
      });
      markersRef.current.push(endMarker);
    }
  }, [map, track, routeStyle, markerStyle, waypointInterval]);

  const handleNaverMap = (points: GPXPoint[]) => {
    if (points.length === 0) return;

    const startPoint = points[0];
    const { lat, lng } = startPoint;

    // 네이버지도 길찾기 URL 생성
    const naverMapUrl = `https://map.naver.com/v5/search/${lat},${lng}`;

    if (window.confirm('네이버 지도로 이동하시겠습니까?')) {
      window.open(naverMapUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (error) {
    return (
      <div
        className='flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600'
        style={{ width, height }}
      >
        <div className='text-center'>
          <div className='font-semibold'>지도 로드 실패</div>
          <div className='mt-1 text-sm'>{error}</div>
        </div>
      </div>
    );
  }

  // 실제 사용할 크기 결정
  const actualSize = autoSize ? containerSize : { width, height };

  return (
    <div ref={containerRef} className='relative'>
      <div
        ref={mapRef}
        style={{
          width: actualSize.width,
          height: actualSize.height,
        }}
        className='overflow-hidden rounded-lg'
      />
      {!isLoaded && (
        <div
          className='absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100'
          style={{
            width: actualSize.width,
            height: actualSize.height,
          }}
        >
          <div className='text-center'>
            <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent'></div>
            <div className='text-gray-500'>경로 로딩중...</div>
          </div>
        </div>
      )}
      <button
        className='flex-center bg-white000 text-title2 text-point-400 border-point-400 absolute bottom-4 left-1/2 h-[44px] w-[80%] -translate-x-1/2 cursor-pointer rounded-[12px] border'
        onClick={() => handleNaverMap(track?.points || [])}
      >
        자세히 보기
      </button>
    </div>
  );
};

export default GPXRouteMap;
