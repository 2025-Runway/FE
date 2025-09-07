import Image from 'next/image';

export function RecentCourse() {
  return (
    <section className='flex flex-col gap-3 px-5'>
      <h2 className='text-gray-bk text-[18px] font-bold'>최근 본 코스</h2>

      <div className='relative h-[140px] w-full overflow-hidden rounded-[20px]'>
        <Image
          src='/img/home/home.png'
          alt='최근 본 코스 배경 이미지'
          fill
          className='object-cover'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/60' />

        <section className='z-50 flex h-full w-full flex-col justify-end px-4 py-4'>
          <p className='text-white000 z-50 text-[18px] leading-[140%] font-bold'>
            밀양강 자전거길
          </p>
          <p className='text-white000 z-50 text-[14px] font-light'>
            2025. 07. 28 - 2.1km
          </p>
        </section>
      </div>
    </section>
  );
}
