export function RecentCourseSkeleton() {
  return (
    <section className='flex flex-col gap-3 px-5'>
      <h2 className='text-gray-bk text-[18px] font-bold'>최근 본 코스</h2>

      <div className='relative h-[140px] w-full overflow-hidden rounded-[20px] bg-gray-2 animate-pulse'>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60' />

        <section className='z-50 flex h-full w-full flex-col justify-end px-4 py-4'>
          <div className='w-32 h-[22px] bg-gray-3/50 rounded-md animate-pulse mb-2' />
          <div className='w-20 h-[16px] bg-gray-3/50 rounded-md animate-pulse' />
        </section>
      </div>
    </section>
  );
}