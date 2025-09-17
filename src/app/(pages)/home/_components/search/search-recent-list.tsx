import { SearchResult } from '@/interfaces/home/home.types';
import { SearchItem } from './search-item';

interface SearchRecentListProps {
  searches: SearchResult[];
  onRemoveSearch: (crsIdx: string) => void;
}

export function SearchRecentList({ searches, onRemoveSearch }: SearchRecentListProps) {
  return (
    <>
      <div className='text-title2 mb-[2px]'>최근 검색어</div>
      
      <div className='flex flex-col'>
        {searches.map(item => (
          <SearchItem
            key={item.crsIdx}
            item={item}
            showRemoveButton
            onRemove={onRemoveSearch}
          />
        ))}
      </div>
    </>
  );
}