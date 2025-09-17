function SkeletonCard() {
  return (
    <div className='h-50 w-44 flex-shrink-0 animate-pulse rounded bg-gray-200' />
  );
}

function SkeletonRegion() {
  return (
    <div className='mb-8'>
      <div className='mb-3 h-6 w-12 animate-pulse rounded bg-gray-200' />
      <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className='flex-1 overflow-y-auto pt-9 pl-5'>
      <SkeletonRegion />
    </div>
  );
}