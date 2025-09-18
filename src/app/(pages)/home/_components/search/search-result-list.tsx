import { SearchResult } from '@/interfaces/home/home.types';
import { SearchItem } from './search-item';

interface SearchResultListProps {
  results: SearchResult[];
  onCourseClick: (course: SearchResult) => void;
  isLoading?: boolean;
}

export function SearchResultList({
  results,
  onCourseClick,
  isLoading,
}: SearchResultListProps) {
  if (isLoading) {
    return (
      <div className='flex justify-center py-4'>
        <p className='text-body2 text-gray-500'>검색 중...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='flex justify-center py-4'>
        <p className='text-body2 text-gray-500'>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='custom-scrollbar flex flex-col overflow-y-auto'>
      {results.map(item => (
        <SearchItem key={item.crsIdx} item={item} onClick={onCourseClick} />
      ))}
    </div>
  );
}
