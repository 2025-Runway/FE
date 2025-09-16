export function IntroText() {
  const USERNAME = '민지';
  return (
    <section>
      <p className='text-white000 text-[16px]'>반가워요, {USERNAME}님</p>
      <p className='text-white000 text-[24px] font-semibold whitespace-nowrap'>
        오늘도 나만의 여행길을 달려볼까요?
      </p>
    </section>
  );
}
