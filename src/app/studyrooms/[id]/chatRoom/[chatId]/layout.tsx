"use client";
// 채팅방 레이아웃

import { getChatRoomId } from "@/app/studyrooms/studyroomSub";

import dt from "@/lib/designToken/designTokens";
import { Container } from "@/component/styled-components/Container";

import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { fetchData } from "next-auth/client/_utils";
import { apiPaths } from "@/config/api";
import Link from "next/link";
const { Header, Title, HeaderButtons, IconButton } = ChatStyled;
const tokens = dt.DesignTokenVarNames;

export default function ChatRoomLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      $bgColor={tokens.colors.simple.whitebg}
      $height={"100vh"}
      $padding={"0.5rem"}
    >
      <Container
        $bgColor={tokens.colors.simple.secondary}
        $height={"100%"}
        $borderRadius={"15px"}
        // $padding={"1rem"}
        $overflow={"hidden"}
      >
        <Header>
          <Title>채팅방 이름</Title>
          <HeaderButtons>
            {/* <IconButton>
              <span>참가인원</span>
            </IconButton> */}
            <Link href="/studyrooms/1/chatRoom/">
              <span>채팅방 나가기</span>
            </Link>
          </HeaderButtons>
        </Header>
        {children}
      </Container>
    </Container>
  );
}
