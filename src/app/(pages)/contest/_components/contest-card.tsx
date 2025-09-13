import { cn } from '@/utils/cn';
import clsx from 'clsx';
import PlaceIcon from '@/public/svg/contest/place.svg';
import { DistanceBadge } from './distance-badge';

interface ContestCardProps {
  date: string;
  day: string;
  title: string;
  location: string;
  distances: string[];
  className?: string;
}

export function ContestCard({
  date,
  day,
  title,
  location,
  distances,
  className,
}: ContestCardProps) {
  return (
    <div
      className={cn(
        'rounded-[20px] bg-white px-6 py-5',
        'shadow-[0_4px_16px_0_rgba(158,170,181,0.20)]',
        className,
      )}
    >
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <span className='text-title3 text-black'>{date}</span>
            <span
              className={clsx(
                'text-title3',
                day === '토요일'
                  ? 'text-weather-bl-02'
                  : day === '일요일'
                    ? 'text-weather-or-02'
                    : 'text-gray-4',
              )}
            >
              {day}
            </span>
          </div>

          <h3 className='text-title1'>{title}</h3>

          <div className='flex items-center gap-1'>
            <PlaceIcon />
            <span className='text-body4 text-gray-4'>{location}</span>
          </div>

          <div className='mt-2 flex gap-2'>
            {distances.map((distance, index) => (
              <DistanceBadge key={index} distance={distance} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
