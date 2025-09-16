# 🚀 Runway API 사용 가이드

프로젝트의 API 연동을 위한 완전한 사용 설명서입니다.

## 📁 API 구조 분석

### 파일 구조
```
src/lib/api/
├── index.ts           # API 메인 인터페이스
├── config.ts          # API 설정 및 기본값
├── fetch-mutation.ts  # POST/PATCH/PUT/DELETE 처리
└── fetch-query.ts     # GET 요청 처리 (현재 비어있음)
```

### 응답 타입 구조
```typescript
interface ApiResponse<T> {
  data: T | null;      // 실제 데이터
  success: boolean;    // 성공/실패 여부
  message?: string;    // 메시지
  error?: string;      // 에러 메시지
}
```

## 🔧 기본 설정

### 환경 변수 설정
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.runway.site
```

### API 설정 (config.ts)
```typescript
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  query: {
    defaultCache: 'force-cache',
    defaultRevalidate: 3600, // 1시간
  },
  mutation: {
    defaultCache: 'no-store',
    timeout: 10000, // 10초
  },
}
```

## 🔑 Bearer 토큰 인증 설정

### 1. 토큰 저장 방식

#### localStorage 사용
```typescript
// 토큰 저장
const saveToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

// 토큰 가져오기
const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// 토큰 삭제
const removeToken = () => {
  localStorage.removeItem('access_token');
};
```

#### Zustand 스토어 사용 (권장)
```typescript
// src/stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'auth-storage' }
  )
);
```

### 2. 토큰 헤더 자동 추가 (현재 구현됨) 🔥

#### 🚀 **완전 자동화된 토큰 관리**
현재 API는 **URL 패턴에 따라 자동으로 토큰을 추가**하므로, 개발자가 수동으로 토큰을 관리할 필요가 없습니다!

#### **자동 분기 규칙**
```typescript
// ✅ 공개 API (토큰 자동으로 안 붙음)
const courses = await api.get<Course[]>('/public/courses');
const courseDetail = await api.get<Course>('/public/course/123');
const testLogin = await api.post('/auth/test', { data: credentials });

// 🔒 인증 API (토큰 자동으로 붙음)  
const userProfile = await api.get<User>('/user/profile');
const myCourses = await api.get<Course[]>('/courses');
const newPost = await api.post<Post>('/posts', { data: postData });
```

#### **토큰 저장 방법 (Zustand 권장)**
```typescript
// src/stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      isAuthenticated: () => !!get().token,
    }),
    { 
      name: 'auth-storage' // localStorage 키
    }
  )
);
```

#### **토큰 설정 예제**
```typescript
// 로그인 성공 후
const loginResponse = await api.post('/auth/login', {
  data: { email, password }
});

if (loginResponse.success && loginResponse.data?.token) {
  // 토큰 저장 (이후 모든 인증 API에 자동 적용)
  useAuthStore.getState().setToken(loginResponse.data.token);
}

// 로그아웃
const logout = () => {
  useAuthStore.getState().clearToken();
};
```

#### **📋 URL 패턴 목록**

**공개 패턴 (토큰 불필요)**:
- `/public/` - 모든 공개 API
- `/auth/test` - 테스트 로그인

**인증 패턴 (토큰 자동 추가)**:
- `/user/` - 유저 관련 API  
- `/courses` - 내 코스 관리
- `/posts/` - 게시물 작성/수정
- `/weather/` - 개인 날씨 설정
- `/upload` - 파일 업로드
- 기타 `/public/`이 아닌 모든 API

#### **⚠️ 토큰 없을 때 동작**
```typescript
// 토큰이 필요한 API인데 토큰이 없으면 콘솔 경고 후 요청은 전송
console.warn('토큰이 필요한 API이지만 토큰이 없습니다: /user/profile');
// 서버에서 401 응답 → 클라이언트에서 로그인 페이지로 리다이렉트 처리
```

## 📝 실제 사용 예제

### 1. GET 요청 (데이터 조회)

#### 기본 사용법
```typescript
import { api } from '@/lib/api';

// 유저 목록 조회
const fetchUsers = async () => {
  try {
    const response = await api.get<User[]>('/users');
    
    if (response.success && response.data) {
      console.log('유저 목록:', response.data);
      return response.data;
    } else {
      console.error('조회 실패:', response.message);
      return [];
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
    return [];
  }
};
```

#### React Query와 함께 사용 (자동 토큰)
```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api'; // 🔥 자동 토큰 추가되는 api 사용

const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      // 🚀 /user/profile은 자동으로 토큰이 추가됨
      const response = await api.get<User>('/user/profile');
      
      if (!response.success) {
        throw new Error(response.message || '프로필 조회 실패');
      }
      
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 컴포넌트에서 사용
const ProfileComponent = () => {
  const { data: user, isLoading, error } = useUserProfile();
  
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;
  if (!user) return <div>프로필이 없습니다.</div>;
  
  return <div>안녕하세요, {user.name}님!</div>;
};
```

### 2. POST 요청 (데이터 생성)

#### 기본 사용법
```typescript
import { api } from '@/lib/api';

// 새 유저 생성
const createUser = async (userData: CreateUserData) => {
  try {
    const response = await api.post<User>('/users', {
      data: userData,
    });
    
    if (response.success && response.data) {
      console.log('유저 생성 성공:', response.data);
      return { success: true, user: response.data };
    } else {
      console.error('유저 생성 실패:', response.message);
      return { success: false, error: response.message };
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
};
```

#### React Query Mutation과 함께 사용 (자동 토큰)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api'; // 🔥 자동 토큰 추가되는 api 사용

const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postData: CreatePostData) => {
      // 🚀 /posts는 자동으로 토큰이 추가됨
      const response = await api.post<Post>('/posts', { data: postData });
      
      if (!response.success) {
        throw new Error(response.message || '게시물 작성 실패');
      }
      
      return response.data;
    },
    onSuccess: () => {
      // 성공 시 게시물 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// 컴포넌트에서 사용
const CreatePostForm = () => {
  const createPost = useCreatePost();
  
  const handleSubmit = (formData: CreatePostData) => {
    createPost.mutate(formData, {
      onSuccess: (data) => {
        alert('게시물이 작성되었습니다!');
      },
      onError: (error) => {
        alert(`오류: ${error.message}`);
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 내용 */}
      <button 
        type="submit" 
        disabled={createPost.isPending}
      >
        {createPost.isPending ? '작성 중...' : '게시물 작성'}
      </button>
    </form>
  );
};
```

### 3. PATCH 요청 (데이터 수정)

```typescript
// 유저 정보 수정 (자동 토큰)
const updateUser = async (userId: string, updateData: Partial<User>) => {
  try {
    // 🚀 /users/${userId}는 자동으로 토큰이 추가됨
    const response = await api.patch<User>(`/users/${userId}`, { data: updateData });
    
    if (response.success && response.data) {
      return { success: true, user: response.data };
    } else {
      return { success: false, error: response.message };
    }
  } catch (error) {
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
};
```

### 4. DELETE 요청 (데이터 삭제)

```typescript
// 유저 삭제 (자동 토큰)
const deleteUser = async (userId: string) => {
  try {
    // 🚀 /users/${userId}는 자동으로 토큰이 추가됨
    const response = await api.delete<{ success: boolean }>(`/users/${userId}`);
    
    if (response.success) {
      return { success: true };
    } else {
      return { success: false, error: response.message };
    }
  } catch (error) {
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
};
```

## 🔄 파일 업로드

### FormData 사용
```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    // 🚀 /upload는 자동으로 토큰이 추가됨
    const response = await api.post<{ url: string }>('/upload', {
      data: formData,
      headers: {
        // Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
      },
    });
    
    if (response.success && response.data) {
      return { success: true, url: response.data.url };
    } else {
      return { success: false, error: response.message };
    }
  } catch (error) {
    return { success: false, error: '파일 업로드 실패' };
  }
};
```

## ⚠️ 에러 처리 패턴

### 1. API 응답 에러 처리
```typescript
const handleApiResponse = <T>(response: ApiResponse<T>) => {
  if (response.success && response.data) {
    return { success: true, data: response.data };
  }
  
  // 에러 메시지 우선순위: error > message > 기본 메시지
  const errorMessage = response.error || response.message || '알 수 없는 오류가 발생했습니다.';
  
  return { success: false, error: errorMessage };
};
```

### 2. 전역 에러 처리
```typescript
// src/lib/api/error-handler.ts
export const handleApiError = (error: unknown, context: string) => {
  console.error(`API Error in ${context}:`, error);
  
  if (error instanceof Error) {
    // 네트워크 오류
    if (error.name === 'AbortError') {
      return '요청 시간이 초과되었습니다.';
    }
    
    // 기타 오류
    return error.message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};
```

### 3. 인증 토큰 만료 처리
```typescript
// src/lib/api/interceptor.ts
export const checkAuthError = (response: ApiResponse<any>) => {
  // 401 Unauthorized 또는 특정 에러 메시지 확인
  if (response.message === 'Unauthorized' || response.error === 'Token expired') {
    // 토큰 삭제 및 로그인 페이지로 리다이렉트
    useAuthStore.getState().clearToken();
    window.location.href = '/login';
    return true;
  }
  
  return false;
};
```

## 🎯 실전 사용 팁

### 1. 커스텀 훅 패턴
```typescript
// src/hooks/api/useAuth.ts
export const useAuth = () => {
  const { token, setToken, clearToken } = useAuthStore();
  
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<{ token: string, user: User }>('/auth/login', {
        data: credentials,
      });
      
      if (!response.success) {
        throw new Error(response.message || '로그인 실패');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.token) {
        setToken(data.token);
      }
    },
  });
  
  const logout = () => {
    clearToken();
  };
  
  return {
    isAuthenticated: !!token,
    login,
    logout,
  };
};
```

### 2. 타입 안전성 보장
```typescript
// src/interfaces/api/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  avatar?: string;
}
```

### 3. 환경별 설정
```typescript
// src/lib/api/config.ts
const getApiConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? (isDev ? 'http://localhost:3001' : '/api'),
    timeout: isDev ? 30000 : 10000, // 개발환경에서는 더 긴 타임아웃
  };
};
```

---

## 📚 추가 참고사항

1. **캐싱 전략**: GET 요청은 기본적으로 캐싱되며, Mutation은 캐싱되지 않습니다.
2. **타임아웃**: Mutation 요청은 기본 10초 타임아웃이 설정되어 있습니다.
3. **에러 처리**: 모든 에러는 ApiResponse 형태로 일관되게 반환됩니다.
4. **타입 안전성**: TypeScript를 활용하여 요청/응답 타입을 명확히 정의하세요.

이 가이드를 참고하여 안전하고 효율적인 API 연동을 구현하시기 바랍니다! 🚀