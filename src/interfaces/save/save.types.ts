export interface FavoriteCourse {
  sigun: string;
  crsKorNm: string;
  crsIdx: string;
  crsImgUrl: string;
}

export interface FavoriteCoursesByRegion {
  region: string;
  courses: FavoriteCourse[];
}