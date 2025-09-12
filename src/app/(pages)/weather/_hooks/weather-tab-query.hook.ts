import { parseAsStringLiteral, useQueryState } from 'nuqs';

export type Location = 'current_location' | 'travel_location';

export const useWeatherTabQuery = () => {
  const [location, setLocation] = useQueryState(
    'location',
    parseAsStringLiteral<Location>([
      'current_location',
      'travel_location',
    ]).withDefault('current_location'),
  );

  return { location, setLocation };
};
