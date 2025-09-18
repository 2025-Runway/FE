import { useQuery } from '@tanstack/react-query';
import { searchCourses } from '@/lib/api/home';
import { ApiResponse } from '@/interfaces/api/response.types';
import { SearchResponse } from '@/interfaces/home/home.types';
import { useDebounce } from './use-debounce';

export const useSearch = (query: string, page = 1) => {
  const debouncedQuery = useDebounce(query, 100);

  return useQuery<ApiResponse<SearchResponse>>({
    queryKey: ['search', debouncedQuery, page],
    queryFn: () => searchCourses(debouncedQuery, page),
    enabled: !!debouncedQuery && debouncedQuery.trim().length > 0,
  });
};
