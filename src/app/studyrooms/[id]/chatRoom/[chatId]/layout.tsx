"use client";
// 채팅방 레이아웃

import { getChatRoomId } from "@/app/studyrooms/studyroomSub";

import dt from "@/lib/designToken/designTokens";
import { Container } from "@/component/styled-components/Container";

import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { fetchData } from "next-auth/client/_utils";
import { apiPaths } from "@/config/api";
import Link from "next/link";
import { useRoomId } from "@/hooks/useGetRoomId";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
const { Header, Title, HeaderButtons, IconButton } = ChatStyled;
const tokens = dt.DesignTokenVarNames;
import { ChatRoomInfoProps } from "@/lib/types";
export default function ChatRoomLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const chatRoomId = getChatRoomId();
  const roomId = useRoomId();

  console.log("스터디룸 아이디는 ", roomId, "채팅방 아이디는", chatRoomId);

  const [chatRoomDetails, error, loading] = useFetch<ChatRoomInfoProps>(
    apiPaths.chatroom.detail(chatRoomId),
    {}
  );

  const chatRoomTitle =
    chatRoomDetails && chatRoomDetails.title
      ? chatRoomDetails.title
      : `${roomId}번 채팅방`;

  return (
    <Container
      $bgColor={tokens.colors.simple.whitebg}
      $height={"100vh"}
      $padding={"0.5rem"}
    >
      <Container
        $bgColor={tokens.colors.simple.whitebg}
        $height={"100%"}
        $borderRadius={"15px"}
        // $padding={"1rem"}
        $overflow={"hidden"}
      >
        <Header>
          <Title>{chatRoomTitle}</Title>
          <HeaderButtons>
            {/* <IconButton>
              <span>참가인원</span>
            </IconButton> */}
            <Link href={`/studyrooms/${roomId}/chatRoom`}>
              <span>채팅방 목록으로</span>
            </Link>
          </HeaderButtons>
        </Header>
        {children}
      </Container>
    </Container>
  );
}
