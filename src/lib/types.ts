export interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
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
