import { cn } from '@/utils/cn';
import PlaceIcon from '@/public/svg/contest/place.svg';

interface ContestLocationProps {
  location: string;
  className?: string;
}

export function ContestLocation({ location, className }: ContestLocationProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <PlaceIcon />
      <span className='text-body4 text-gray-4'>{location}</span>
    </div>
  );
}