//자유게시판 타입 정의
export interface PostBoard {
  id: number;
  category: string;
  nickname: string;
  title: string;
  content: string;
  hit: number;
  createdAt: string;
}
