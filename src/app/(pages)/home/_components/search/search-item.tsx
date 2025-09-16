import { X } from 'lucide-react';
import { Course } from '@/interfaces/course.types';

interface SearchItemProps {
  item: Course;
  showRemoveButton?: boolean;
  onRemove?: (id: number) => void;
  onClick?: (item: Course) => void;
}

// 검색 관련 아이템(최근 검색어, 검색 결과)
export function SearchItem({
  item,
  showRemoveButton = false,
  onRemove,
  onClick,
}: SearchItemProps) {
  return (
    <div
      key={item.id}
      className={`border-gray-1 flex items-center justify-between border-b-1 py-4 ${
        onClick ? 'hover:bg-gray-0 cursor-pointer transition-colors' : ''
      }`}
      onClick={() => onClick?.(item)}
    >
      <div className='flex flex-col gap-1'>
        <p className='text-body1'>{item.title}</p>
        <p className='text-body4'>{item.location}</p>
      </div>
      {showRemoveButton && onRemove && (
        <button
          className='p-1'
          onClick={e => {
            e.stopPropagation();
            onRemove(item.id);
          }}
        >
          <X className='text-gray-3 h-5 w-5' />
        </button>
      )}
    </div>
  );
}
