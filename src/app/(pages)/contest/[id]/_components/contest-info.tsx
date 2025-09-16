import { DistanceBadge } from '../../_components/distance-badge';
import { ContestDate } from '../../_components/contest-date';
import { ContestLocation } from '../../_components/contest-location';

interface ContestInfoProps {
  date: string;
  day: string;
  title: string;
  location: string;
  distances: string[];
}

export function ContestInfo({ date, day, title, location, distances }: ContestInfoProps) {
  return (
    <div className='mt-5 px-6 py-5'>
      <ContestDate date={date} day={day} className='mb-2' />

      <h1 className='text-title1 mb-3'>{title}</h1>

      <ContestLocation location={location} className='mb-4' />

      <div className='flex gap-2'>
        {distances.map((distance, index) => (
          <DistanceBadge key={index} distance={distance} />
        ))}
      </div>
    </div>
  );
}