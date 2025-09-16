import { ProfileEditBtn } from './_components/profile-edit-btn';
import { ProfileInfo } from './_components/profile-info';
import { TravelPlaceContent } from './_components/travel-place-content';

export default function MyPage() {
  return (
    <div className='flex h-full w-full flex-col'>
      <ProfileInfo />

      <span className='flex-center border-gray-0 h-auto w-full flex-shrink-0 border-b-8 px-16' />

      <TravelPlaceContent />
    </div>
  );
}
