export function CourseSkeleton() {
  return (
    <div className='flex gap-3 overflow-x-auto scrollbar-hide'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className='flex-shrink-0 w-[168px] h-[196px] relative overflow-hidden rounded-[20px] bg-gray-2 animate-pulse'
        >
          <div className='absolute bottom-4 left-4 space-y-2'>
            <div className='w-24 h-[18px] bg-gray-3/50 rounded-md animate-pulse' />
            <div className='w-16 h-[14px] bg-gray-3/50 rounded-md animate-pulse' />
          </div>
        </div>
      ))}
    </div>
  );
}