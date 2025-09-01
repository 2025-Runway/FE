import { PlacePickSheet } from './place-pick-sheet';

export function TravelPlaceContent() {
  return (
    <div className='flex-1 w-full h-auto flex-col-center gap-6'>
      <div className='w-full h-auto flex-col-center gap-1'>
        <h1 className='text-[20px] font-bold text-gray-bk leading-7'>
          런트립을 떠나시나요?
        </h1>
        <p className='text-[14px] font-medium text-gray-4 leading-[19.6px]'>
          가고 싶은 여행지를 설정하고, <br /> 런웨이 코스를 살펴보세요.
        </p>
      </div>
      <PlacePickSheet />
    </div>
  );
}
