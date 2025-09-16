import Image from 'next/image';

const NICKNAME = '케로로';

export function ProfileInfo() {
  return (
    <div className='flex-col-center h-auto w-full flex-shrink-0 gap-4 px-5 pt-15 pb-5'>
      <div className='relative size-27 overflow-hidden rounded-full'>
        <Image
          src='/img/mypage/virtual-image.png'
          alt='profile'
          fill
          className='h-full w-full object-cover'
        />
      </div>
      <p className='text-heading1 text-gray-bk'>
        {NICKNAME} <span className='text-gray-4'>님</span>
      </p>
      <button className='text-title2 text-point-400 border-point-400 hover:bg-point-000 h-auto w-fit cursor-pointer rounded-[12px] border px-10 py-2 transition-all duration-300'>
        로그아웃
      </button>
    </div>
  );
}
