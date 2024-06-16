"use client";

import { usePathname } from "next/navigation";
import { ChatRoomInfoProps } from "@/lib/types";
import PackedStyledChatrooms from "@/app/studyrooms/[id]/chatRoom/StyledChatRoomCompoents";
const { ChatRoomContainer, ChatRoomCard, LinkContent, LinkDetails, LinkTitle } =
  PackedStyledChatrooms;

import PackedStyledEmpty from "@/component/styled-components/EmptyContent";
const { EmptyStyledLink, EmptyText, EmptyTitle, EmptyCard, EmptyContainer } =
  PackedStyledEmpty;

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
    <EmptyContainer>
      <EmptyCard>
        <EmptyTitle>개설된 채팅방이 없습니다.</EmptyTitle>
        <EmptyText>
          아직 채팅방을 만들지 않았습니다. 채팅방을 만들어보세요!
        </EmptyText>
        {/* <CreateChatRoom roomId={roomId} /> */}
      </EmptyCard>
    </EmptyContainer>
  );
};
