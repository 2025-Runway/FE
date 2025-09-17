import { cn } from '@/utils/cn';
import { sortDistances } from '../_utils/sort-distances';
import { DistanceBadge } from './distance-badge';
import { ContestDate } from './contest-date';
import { ContestLocation } from './contest-location';

interface ContestCardProps {
  id: string;
  date: string;
  day: string;
  title: string;
  location: string;
  distances: string[];
  className?: string;
  onClick?: (id: string) => void;
}

export function ContestCard({
  id,
  date,
  day,
  title,
  location,
  distances,
  className,
  onClick,
}: ContestCardProps) {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-[20px] bg-white px-6 py-5 transition-transform active:scale-95',
        'shadow-[0_4px_16px_0_rgba(158,170,181,0.20)]',
        className,
      )}
      onClick={() => onClick?.(id)}
    >
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <ContestDate date={date} day={day} />

          <h3 className='text-title1'>{title}</h3>

          <ContestLocation location={location} />

          <div className='mt-2 flex gap-2'>
            {sortDistances(distances).map((distance, index) => (
              <DistanceBadge key={index} distance={distance} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
