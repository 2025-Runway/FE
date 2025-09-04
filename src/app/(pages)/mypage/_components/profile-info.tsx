import Image from 'next/image';

const NICKNAME = '케로로';

export function ProfileInfo() {
  return (
    <div className='flex-shrink-0 px-5 pt-1 pb-10 w-full h-auto flex-col-center gap-4'>
      <div className='relative size-27 rounded-full overflow-hidden'>
        <Image
          src='/img/mypage/virtual-image.png'
          alt='profile'
          fill
          className='w-full h-full object-cover'
        />
      </div>
      <p className='text-[24px] font-bold text-gray-bk'>{NICKNAME}</p>
    </div>
  );
}
