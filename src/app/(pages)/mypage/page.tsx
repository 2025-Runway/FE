import { ProfileEditBtn } from './_components/profile-edit-btn';
import { ProfileInfo } from './_components/profile-info';
import { TravelPlaceContent } from './_components/travel-place-content';

export default function MyPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <header className='flex-shrink-0 p-4 w-full h-auto flex items-center justify-end'>
        <ProfileEditBtn />
      </header>
      <ProfileInfo />
      <nav className='flex-shrink-0 px-16 w-full h-auto flex-center  border-b border-gray-2'>
        <p className='py-4 w-full h-auto flex-center text-[16px] font-extrabold leading-[19.2px] text-gray-bk border-b-2 border-gray-bk opacity-50'>
          내 여행
        </p>
      </nav>
      <TravelPlaceContent />
    </div>
  );
}
