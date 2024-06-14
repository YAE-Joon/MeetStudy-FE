"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChatRoomInfoProps } from "@/lib/types";
import dt from "@/lib/designToken/designTokens";
import PackedStyledChatrooms from "@/app/studyrooms/[id]/chatRoom/StyledChatRoomCompoents";
import { CreateChatRoom } from "@/app/studyrooms/[id]/chatRoom/CreateNewChatRoom";
import { useState } from "react";
import { QuitButton } from "@/app/admin/UserStyled";
import getTokenByClient from "@/util/getTokenByClient";
const {
  ChatRoomContainer,
  ChatRoomCard,
  LinkContent,
  LinkDetails,
  LinkTitle,
  NoChatContainer,
  NoChatCard,
  NoChatTitle,
  NoChatText,
} = PackedStyledChatrooms;

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export const ChatRoomList = ({
  chatRoomList,
}: {
  chatRoomList: ChatRoomInfoProps[];
}) => {
  const pathname = usePathname();
  //console.log("pathname?", pathname);
  return (
    <ChatRoomContainer>
      {chatRoomList.map((chatRoomInfo, idx) => (
        <ChatRoomCard
          key={chatRoomInfo.id}
          href={`${pathname}/${chatRoomInfo.id}`}
        >
          <LinkContent>
            <LinkTitle>{chatRoomInfo.title}</LinkTitle>
            <LinkDetails>{chatRoomInfo.notice} </LinkDetails>
          </LinkContent>
        </ChatRoomCard>
      ))}
    </ChatRoomContainer>
  );
};

// 이렇게 했더니 createChatRoom 이 활성화된 동안 NochatRoom이 길어져서 보임

export const NoChatRoom = ({ roomId }: { roomId: number }) => {
  return (
    <NoChatContainer>
      <NoChatCard>
        <NoChatTitle>개설된 채팅방이 없습니다.</NoChatTitle>
        <NoChatText>
          아직 채팅방을 만들지 않았습니다. 채팅방을 만들어보세요!
        </NoChatText>
        {/* <CreateChatRoom roomId={roomId} /> */}
      </NoChatCard>
    </NoChatContainer>
  );
};
