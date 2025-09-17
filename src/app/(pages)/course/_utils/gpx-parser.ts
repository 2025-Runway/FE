export interface GPXPoint {
  lat: number;
  lng: number;
  elevation?: number;
  time?: Date;
}

export interface GPXTrack {
  name?: string;
  points: GPXPoint[];
}

export class GPXParser {
  /**
   * GPX 파일 내용을 파싱하여 좌표 배열로 변환
   */
  static parseGPX(gpxContent: string): GPXTrack {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxContent, 'text/xml');

    // 트랙 이름 추출
    const trackName =
      xmlDoc.querySelector('trk name')?.textContent ?? 'Unknown Track';

    // 트랙 포인트 추출
    const trackPoints = xmlDoc.querySelectorAll('trkpt');
    const points: GPXPoint[] = [];

    trackPoints.forEach(point => {
      const lat = parseFloat(point.getAttribute('lat') ?? '0');
      const lng = parseFloat(point.getAttribute('lon') ?? '0');
      const elevation = point.querySelector('ele')?.textContent;
      const time = point.querySelector('time')?.textContent;

      points.push({
        lat,
        lng,
        elevation: elevation ? parseFloat(elevation) : undefined,
        time: time ? new Date(time) : undefined,
      });
    });

    return {
      name: trackName,
      points,
    };
  }
}
