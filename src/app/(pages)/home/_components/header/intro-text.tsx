'use client';
import { useUser } from '../../_hooks/use-user';

export function IntroText() {
  const { data: userResponse, isLoading } = useUser();
  const userName = userResponse?.data?.nickname || '유저';

  return (
    <section>
      <p className='text-white000 text-[16px]'>
        반가워요, {isLoading ? '...' : userName}님
      </p>
      <p className='text-white000 text-[24px] font-semibold whitespace-nowrap'>
        오늘도 나만의 여행길을 달려볼까요?
      </p>
    </section>
  );
}
