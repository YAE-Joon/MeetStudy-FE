// (client → server)
export interface SendingChatMessage {
  userId?: number; // 유저의 id, 숫자로
  content: string;
  chatRoomId?: number;
}
// (server → client)
// (client -> client : 내가 보내는 메시지)
export interface ReceivedChatMessage {
  nickName: string;
  content: string;
  createdAt: string;
  isAnnounce?: boolean | null; //안내용
}
