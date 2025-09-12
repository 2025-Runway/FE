import { useRouter } from 'next/navigation';

export default function EmptyDestination() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/mypage');
  };

  return (
    <section className='flex flex-col items-center py-16'>
      <p className='text-gray-bk mb-1 text-[20px] leading-[140%] font-bold'>
        여행지가 설정되지 않았습니다
      </p>
      <p className='text-gray-4 mb-8 text-center text-[14px] leading-[140%]'>
        마이페이지에서 가고싶은 여행지를 설정하고
        <br />
        런웨이 코스를 살펴보세요.
      </p>
      <button
        onClick={handleClick}
        className='bg-point-400 text-white000 rounded-[12px] px-7 py-3 text-[16px] font-extrabold'
      >
        마이페이지 바로가기
      </button>
    </section>
  );
}
