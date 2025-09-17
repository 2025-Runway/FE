export function ContestSkeleton() {
  return (
    <div className='flex flex-col gap-7 overflow-y-auto px-4 py-5'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='h-32 animate-pulse rounded-lg bg-gray-200'
        />
      ))}
    </div>
  );
}
