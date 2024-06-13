"use client";
// 스터디룸의 chatroom 대기실

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";

import { ChatRoomInfoProps } from "@/lib/types";
import { getRoomId } from "@/app/studyrooms/studyroomSub";

import { CreateChatRoom } from "@/app/studyrooms/[id]/chatRoom/CreateNewChatRoom";

import { Title } from "@/component/styled-components/TextBoxes";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import {
  ChatRoomList,
  NoChatRoom,
} from "@/app/studyrooms/[id]/chatRoom/chatroomComponents";

import dt from "@/lib/designToken/designTokens";

const { SearchBarWarpperH } = StyledStudyRoomIndex;

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
      <SearchBarWarpperH>
        <Title
          $htype={2}
          $align={"left"}
          $color={tokens.colors.simple.blackbasic}
          $fontSize={tokens.fontSize.web.large}
          $padding={"0"}
        >
          채팅방
        </Title>
        {chatRoomList.length !== 0 ? <CreateChatRoom roomId={roomId} /> : null}
      </SearchBarWarpperH>
      <FlexBoxV
        // $padding={"0.5rem 0.5rem 0 0"}
        $width={"100%"}
        $height={"100vh"}
      >
        {chatRoomList.length !== 0 ? (
          <ChatRoomList chatRoomList={chatRoomList} />
        ) : (
          <NoChatRoom roomId={roomId} />
        )}
      </FlexBoxV>
    </>
  );
};

export default ChatRoom;
