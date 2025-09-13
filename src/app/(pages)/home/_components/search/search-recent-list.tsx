import { Course } from '@/interfaces/course.types';
import { SearchItem } from './search-item';

interface SearchRecentListProps {
  searches: Course[];
  onRemoveSearch: (id: number) => void;
}

export function SearchRecentList({ searches, onRemoveSearch }: SearchRecentListProps) {
  return (
    <>
      <div className='text-title2 mb-[2px]'>최근 검색어</div>
      
      <div className='flex flex-col'>
        {searches.map(item => (
          <SearchItem
            key={item.id}
            item={item}
            showRemoveButton
            onRemove={onRemoveSearch}
          />
        ))}
      </div>
    </>
  );
}