'use client';

import { cn } from "@/utils/cn";
import clsx from "clsx";
import { useState } from "react";

const TAB_LIST = [
    '현재 위치 날씨',
    '여행지 날씨'
]

export function WeatherLocationTab() {
    const [isActive, setIsActive] = useState('현재 위치 날씨');
  return (
    <div className="my-5 w-full h-auto border-b border-gray-2 bg-gray-bg">
        <nav className="px-5 w-full h-auto flex-center">
            {TAB_LIST.map((item) => (
                <button key={item} onClick={() => setIsActive(item)} className={clsx(
                    'flex-1 w-full h-12 text-title4 text-gray-2 flex-center transition-all duration-300 cursor-pointer',
                    isActive === item && 'text-gray-bk border-b-2 border-gray-bk'
                )}>
                    {item}
                </button>
            ))}
        </nav>
    </div>
  );
}