import { useState, useEffect } from 'react';
import { SearchResult } from '@/interfaces/home/home.types';

const STORAGE_KEY = 'recent-searches';
const MAX_RECENT_SEARCHES = 10;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  // localStorage에서 최근 검색 가져옴
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SearchResult[];
        setRecentSearches(parsed);
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // 검색 기록에 아이템 추가
  const addToRecentSearches = (course: SearchResult) => {
    if (typeof window === 'undefined') return;

    setRecentSearches(prev => {
      // 중복 제거 (같은 crsIdx면 제거)
      const filtered = prev.filter(item => item.crsIdx !== course.crsIdx);

      // 맨 앞에 추가하고 최대 개수 제한
      const updated = [course, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      // localStorage에 저장
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save recent searches:', error);
      }

      return updated;
    });
  };

  // 검색 기록에서 아이템 제거
  const removeFromRecentSearches = (crsIdx: string) => {
    if (typeof window === 'undefined') return;

    setRecentSearches(prev => {
      const updated = prev.filter(item => item.crsIdx !== crsIdx);

      // localStorage에 저장
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save recent searches:', error);
      }

      return updated;
    });
  };

  // 모든 검색 기록 삭제
  const clearRecentSearches = () => {
    if (typeof window === 'undefined') return;

    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  };

  return {
    recentSearches,
    addToRecentSearches,
    removeFromRecentSearches,
    clearRecentSearches,
  };
}
