'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CourseTabs } from './course-tabs';
import { PopularCourse } from './popular-course';
import { AICourse } from './ai-course';
import { EmptyDestination } from './empty-destination';
import { usePopularCourses } from '../../_hooks/use-popular-courses';
import { useRecommendedCourses } from '../../_hooks/use-recommended-courses';
import { getUserDataCached } from '@/lib/api/home';

export function CourseSection() {
  const [activeTab, setActiveTab] = useState<'nationwide' | 'destinations'>('nationwide');

  // 사용자 정보 조회
  const { data: userDataResponse } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserDataCached,
  });

  // 목적지 정보 추출
  const destination = userDataResponse?.data?.destination || '';
  const hasDestination = destination.trim() !== '';

  // API 호출 조건 결정
  const isDestinationTab = activeTab === 'destinations';
  const shouldUseRegionalAPI = isDestinationTab && hasDestination;
  const regionParam = shouldUseRegionalAPI ? destination : undefined;

  // 코스 데이터 조회
  const { data: popularCoursesResponse, isLoading: popularLoading } =
    usePopularCourses(true, regionParam);

  const { data: recommendedCoursesResponse, isLoading: recommendedLoading } =
    useRecommendedCourses(true, regionParam);

  // 데이터 추출
  const popularCourses = popularCoursesResponse?.data || [];
  const recommendedCourses = recommendedCoursesResponse?.data || [];

  // 이벤트 핸들러
  const handleTabChange = (tab: 'nationwide' | 'destinations') => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // 렌더링 조건
  const shouldShowEmpty = isDestinationTab && !hasDestination;
  const shouldShowCourses = !shouldShowEmpty;

  return (
    <section>
      <CourseTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {shouldShowEmpty ? (
        <EmptyDestination />
      ) : shouldShowCourses ? (
        <>
          <div className='mt-8 pl-5'>
            <PopularCourse courses={popularCourses} isLoading={popularLoading} />
          </div>

          <div className='mt-8 pl-5'>
            <AICourse courses={recommendedCourses} isLoading={recommendedLoading} />
          </div>
        </>
      ) : null}
    </section>
  );
}
