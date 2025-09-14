// IP 기반 위치 정보 타입
export interface IpLocationData {
  ip: string;
  network: string;
  version: 'IPv4' | 'IPv6';
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: 'AS' | 'EU' | 'AF' | 'NA' | 'SA' | 'OC' | 'AN';
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

// IP 위치 API 응답 타입
export interface IpLocationApiResponse {
  status: number;
  message: string;
  data: IpLocationData;
}

// 위치 정보 타입 (GPS + IP 조합)
export interface LocationInfo {
  source: 'gps' | 'ip';
  latitude: number;
  longitude: number;
  accuracy?: number; // GPS 정확도 (미터)
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  timestamp: number;
}

// 위치 서비스 상태 타입
export interface LocationServiceState {
  loading: boolean;
  error: string | null;
  location: LocationInfo | null;
  permissions: {
    gps: 'granted' | 'denied' | 'prompt' | 'unknown';
    ip: 'available' | 'unavailable' | 'unknown';
  };
}
