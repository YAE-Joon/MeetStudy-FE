import { ChatRoomInfoProps } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("👩‍💻 studyRooms/[0]/chatRoom | GET요청을 받았습니다..");
  const chatroomlist = await getChatRoomList();
  return NextResponse.json(chatroomlist);
}

async function getChatRoomList() {
  console.log("👩‍💻 Client>Next.server: 데이터를 가져옵니다..");

  const dummy = chatRoomList;
  return dummy;
}

const chatRoomList: ChatRoomInfoProps[] = [
  {
    id: 0,
    title: "일반 채팅",
    member: 100,
    maxMember: 150,
    desc: "모두가 함께하는 일반 채팅방",
  },
  {
    id: 1,
    title: "디자인 토론",
    member: 50,
    maxMember: 75,
    desc: "디자인에 대해 토론하는 방",
  },
  {
    id: 2,
    title: "엔지니어링 허들",
    member: 75,
    maxMember: 100,
    desc: "엔지니어링 관련 논의를 위한 방",
  },
  {
    id: 3,
    title: "마케팅 브레인스토밍",
    member: 60,
    maxMember: 80,
    desc: "마케팅 아이디어를 브레인스토밍하는 방",
  },
  {
    id: 4,
    title: "프로젝트 관리",
    member: 30,
    maxMember: 50,
    desc: "프로젝트 관리에 대한 논의를 위한 방",
  },
  {
    id: 5,
    title: "프론트엔드 개발",
    member: 40,
    maxMember: 60,
    desc: "프론트엔드 개발에 대해 논의하는 방",
  },
];
