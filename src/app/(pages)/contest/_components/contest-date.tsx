import clsx from 'clsx';

interface ContestDateProps {
  date: string;
  day: string;
  className?: string;
}

export function ContestDate({ date, day, className }: ContestDateProps) {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
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
  );
}