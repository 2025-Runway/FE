import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;
  const AI_TEXT = `사용자의 취근 코스를 바탕으로 난이도, 시간, 코스 길이 등을 분석해 AI가 추천한 코스입니다.`;
  return (
    <div className='absolute top-8 left-0 z-50 pr-4'>
      <div
        className='rounded-[20px] bg-white px-[20px] py-4'
        style={{ boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.20)' }}
      >
        <div className='flex gap-2'>
          <p className='text-gray-4 text-[14px] leading-[140%] font-light'>
            {AI_TEXT}
          </p>
          <X className='text-gray-3 h-4 w-4 flex-shrink-0' onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
