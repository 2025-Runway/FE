import { useQuery } from '@tanstack/react-query';
import { getWeatherInfo } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { WeatherInfo } from '@/interfaces/home/home.types';

interface ILocation {
  latitude: number;
  longitude: number;
}

const getCurrentPosition = (): Promise<ILocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported.'));
      return;
    }

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
        reject(new Error(`위치 정보 가져오기 실패: ${error.message}`));
      },
      options,
    );
  });
};

const getWeatherWithLocation = async (): Promise<ApiResponse<WeatherInfo>> => {
  const location = await getCurrentPosition();
  return getWeatherInfo(location.latitude, location.longitude);
};

export const useWeather = () => {
  return useQuery<ApiResponse<WeatherInfo>>({
    queryKey: ['weather'],
    queryFn: getWeatherWithLocation,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
};