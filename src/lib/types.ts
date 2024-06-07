export interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}
export interface UserProfile {
  email?: string;
  username: string;
  nickname: string;
  password: string;
  interests: string[];
}

export interface UserCalendar {
  id: number;
  title: string;
  content: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  isHoliday: boolean;
}

// 구조 확인 필요
// export interface UserStudyRoom {
//   id: number;
//   joinData: Date;
//   permission: string;
//   studyRoomId: number;
//   user: { email: string; password: string };
// }

export type MyaccountProps = {
  UserProfile: UserProfile;
};

export interface UserData {
  userProfile: UserProfile | null;
  userCalendars: UserCalendar[];
  userScrappedPosts: null;
  userPosts: null;
}

export interface CategoriyOptions {
  id: number;
  name: string;
  description: string;
  slug?: string;
}

export interface ChatRoomInfoProps {
  id: number;
  title: string;

  //필수요소긴 함
  studyRoomId?: number;
  notice?: string;

  //목업데이터용
  member?: number;
  maxMember?: number;
  desc?: string;
}

export interface ChatMessage {
  nickName: string;
  content: string;
  chatRoomId?: string;
  createdAt: string;
  isOwn?: boolean;
}

export interface APIRequestConfig {
  method: string;
  url: string;
  isAdmin: boolean;
  isLogin: boolean;
  header?: HeadersInit;
  body: BodyInit | null;
  hasParam?: boolean;
}

export interface User {
  email: string;
  password: string;
}

export interface UserStudyRoom {
  id: number;
  joinDate: string;
  permission: string;
  studyRoomId: number;
  user: User;
}

export interface StudyRoom {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  maxCapacity: string;
  userStudyRooms: UserStudyRoom[];
}
