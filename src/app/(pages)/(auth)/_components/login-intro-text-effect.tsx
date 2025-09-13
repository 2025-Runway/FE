'use client';

import { TextEffect } from '@/components/ui/text-effect';

export function LoginIntroTextEffect() {
  return (
    <div className='z-50 pl-10 flex flex-col space-y-0'>
      <TextEffect
        per='char'
        delay={0.3}
        variants={{
          container: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10,
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          },
        }}
        className='text-[32px] font-bold text-white000 leading-[44.8px]'
      >
        뛰는 순간, 
      </TextEffect>
      <TextEffect per='char' delay={0.9}
        preset='blur'
      className='text-[32px] font-bold text-white000 leading-[44.8px]'
      >
        여행이 시작된다
      </TextEffect>
      <TextEffect
        per='char'
        delay={1.6}
        className='pt-2 text-body2 text-white000'
        preset='blur'
      >
        날씨 · 코스 · 여행 정보까지 한 번에, 
      </TextEffect>
      <TextEffect
        per='char'
        delay={2.1}
        className='text-body2 text-white000'
        preset='blur'
      >
        런웨이에서 시작하세요 
      </TextEffect>
    </div>
  );
}
