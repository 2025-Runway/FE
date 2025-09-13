import { Course } from '@/interfaces/course.types';
import { SearchItem } from './search-item';

interface SearchResultListProps {
  results: Course[];
  onCourseClick: (course: Course) => void;
}

export function SearchResultList({ results, onCourseClick }: SearchResultListProps) {
  return (
    <div className='flex flex-col'>
      {results.map(item => (
        <SearchItem
          key={item.id}
          item={item}
          onClick={onCourseClick}
        />
      ))}
    </div>
  );
}