"use client";
// 스터디룸의 chatroom 대기실
import { ChatRoomInfoProps } from "@/lib/types";
import useFetch from "@/hooks/useFetch";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { ChatRoomList } from "@/app/studyrooms/[id]/chatRoom/chatroomComponents";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import dt from "@/lib/designToken/designTokens";
import { apiPaths } from "@/config/api";
import { getRoomId } from "@/app/studyrooms/studyroomSub";
import { Container } from "@/component/styled-components/Container";
import { useEffect } from "react";
import { CreateChatRoom } from "@/app/studyrooms/[id]/chatRoom/CreateNewChatRoom";

const {
  InnerContainer,
  SearchBarWarpper,
  SearchBarWarpperH,
  SearchResultContainer,
} = StyledStudyRoomIndex;

const tokens = dt.DesignTokenVarNames;
// studyrooms/{roomId}/chatRoom
// 특정 스터디룸에 속한 채팅방 리스트를 불러옵니다.
const ChatRoom = () => {
  const roomId = getRoomId();
  const [chatRoomList, error] = useFetch<ChatRoomInfoProps[]>(
    apiPaths.chatroom.byStudyRoom(roomId),
    {}
  );
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chatRoomList) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <Container $width={"100%"} $minWidth={"600px"}>
        <FlexBoxV $width={"90%"} $justifyContent={"center"}>
          <SearchBarWarpperH>
            <Title
              $htype={2}
              $align={"left"}
              $color={tokens.colors.simple.blackbasic}
              $fontSize={tokens.fontSize.web.large}
            >
              채팅방
            </Title>

            <CreateChatRoom roomId={roomId} />
          </SearchBarWarpperH>
          <ChatRoomList chatRoomList={chatRoomList} />
        </FlexBoxV>
      </Container>
    </>
  );
};

export default ChatRoom;
