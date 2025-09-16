import { cn } from '@/utils/cn';

interface DistanceBadgeProps {
  distance: string;
  className?: string;
}

export function DistanceBadge({ distance, className }: DistanceBadgeProps) {
  return (
    <span
      className={cn(
        'text-caption2 text-point-400 bg-point-000 rounded-full px-3 py-1',
        className,
      )}
    >
      {distance}
    </span>
  );
}
