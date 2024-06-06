import { ChatMessage } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("👩‍💻 studyRooms/[0]/chatSample | GET요청을 받았습니다..");
  const chatMessages = await getChatData();
  return NextResponse.json(chatMessages);
}

async function getChatData() {
  console.log("👩‍💻 Client>Next.server: 데이터를 가져옵니다..");

  const dummy = chatMessages;
  return dummy;
}

const chatMessages: ChatMessage[] = [
  {
    nickName: "주니어프론트",
    content: "웹소켓이 무엇이고 어떻게 사용하는지 알고 싶어요.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:01:00Z",
  },
  {
    nickName: "시니어프론트",
    content:
      "웹소켓은 서버와 클라이언트 간에 양방향 통신을 할 수 있게 해주는 프로토콜이야. 실시간 데이터 전송에 유용해.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:02:00Z",
  },
  {
    nickName: "주니어프론트",
    content: "HTTP와는 어떻게 다른가요?",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:03:00Z",
  },
  {
    nickName: "시니어프론트",
    content:
      "HTTP는 요청-응답 방식이라서 클라이언트가 요청을 보내면 서버가 응답해. 반면에 웹소켓은 연결이 열리면 양쪽에서 자유롭게 메시지를 주고받을 수 있어.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:04:00Z",
  },
  {
    nickName: "주니어프론트",
    content: "그럼 웹소켓은 주로 어디에 사용되나요?",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:05:00Z",
  },
  {
    nickName: "시니어프론트",
    content:
      "채팅 애플리케이션, 실시간 알림, 게임 등 실시간 데이터 전송이 필요한 곳에 많이 사용돼.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:06:00Z",
  },
  {
    nickName: "주니어프론트",
    content: "웹소켓을 사용하려면 어떤 준비가 필요하죠?",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:07:00Z",
  },
  {
    nickName: "시니어프론트",
    content:
      "서버는 웹소켓을 지원해야 하고, 클라이언트에서는 WebSocket 객체를 사용해 서버에 연결할 수 있어.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:08:00Z",
  },
  {
    nickName: "주니어프론트",
    content: "웹소켓 연결을 관리하는 팁이 있을까요?",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:09:00Z",
  },
  {
    nickName: "시니어프론트",
    content:
      "연결 상태를 잘 관리하고, 연결이 끊어졌을 때 재연결 로직을 구현하는 게 중요해. 그리고 메시지를 주고받을 때는 JSON 포맷을 많이 사용해.",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:10:00Z",
  },
  {
    nickName: "주니어프론트",
    content: "감이 좀 오는 것 같아요. 감사합니다!",
    chatRoomId: "1",
    createdAt: "2024-06-07T10:11:00Z",
  },
];
