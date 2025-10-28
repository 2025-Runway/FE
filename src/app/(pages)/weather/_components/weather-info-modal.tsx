import { X } from 'lucide-react';
import RunningGoodIcon from '@/public/svg/weather/running-good.svg';
import RunningNormalIcon from '@/public/svg/weather/running-normal.svg';
import RunningBadIcon from '@/public/svg/weather/running-bad.svg';

interface WeatherInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WeatherInfoModal({ isOpen, onClose }: WeatherInfoModalProps) {
  if (!isOpen) return null;
  return (
    <div className='absolute top-8 left-0 z-50'>
      <div
        className='rounded-[20px] bg-white px-[20px] py-4'
        style={{ boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.20)' }}
      >
        <div className='mb-6 flex gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-title2'>러닝 지수</p>
            <p className='text-gray-4 text-body4'>
              기상 데이터를 기반으로 기온, 바람, 미세먼지 등을 AI가 종합 분석해
              산출한 러닝 지수입니다.
            </p>
          </div>
          <X className='text-gray-3 h-4 w-4 flex-shrink-0' onClick={onClose} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <span className='flex-col-center flex-shrink-0 gap-1'>
              <RunningGoodIcon />
              <span className='text-title3 text-weather-bl-02 bg-weather-bl-01 rounded-xl px-2 py-1'>
                좋음
              </span>
            </span>
            <p className='text-body4 text-gray-bk whitespace-pre-line'>
              {`맑고 선선한 날씨로\n 러닝하기에 매우 좋은 조건입니다.`}
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <span className='flex-col-center flex-shrink-0 gap-1'>
              <RunningNormalIcon />
              <span className='text-title3 text-point-400 bg-point-000 rounded-xl px-2 py-1'>
                보통
              </span>
            </span>
            <p className='text-body4 text-gray-bk whitespace-pre-line'>
              {`러닝하기에 무난한 날씨입니다.\n 개인 컨디션에 따라 속도를 조절하세요.`}
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <span className='flex-col-center flex-shrink-0 gap-1'>
              <RunningBadIcon />
              <span className='text-title3 text-weather-or-02 bg-weather-or-01 rounded-xl px-2 py-1'>
                나쁨
              </span>
            </span>
            <p className='text-body4 text-gray-bk whitespace-pre-line'>
              흐리거나 공기 질이 좋지 않아 러닝 시 주의가 필요합니다. 초보자는
              실내 러닝을 권장해요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
