"use client";
import { ChatRoomInfoProps } from "@/lib/types";
import useFetch from "@/hooks/useFetch";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { ChatRoomList } from "@/app/studyrooms/[id]/chatRoom/chatroomComponents";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import dt from "@/lib/designToken/designTokens";
import { apiPaths } from "@/config/api";
import { usePathname } from "next/navigation";

const { SearchBarWarpper } = StyledStudyRoomIndex;

const tokens = dt.DesignTokenVarNames;
// studyrooms/{roomId}/chatRoom
// 특정 스터디룸에 속한 채팅방 리스트를 불러옵니다.
const ChatRoom = () => {
  const roomId = getRoomId();

  // 임시, next.js 서버로 보내는 요청
  // const [chatRoomList, error] = useFetch<ChatRoomInfoProps[]>(
  //   "/api/chat/chatRoomList",
  //   {},
  //   false,
  //   true
  // );

  const [chatRoomList, error] = useFetch<ChatRoomInfoProps[]>(
    apiPaths.chatroom.byStudyRoom(roomId),
    {},
    false,
    false
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chatRoomList) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <FlexBoxV $justifyContent={"center"}>
        <SearchBarWarpper>
          <Title
            $htype={3}
            $align={"left"}
            $color={tokens.colors.simple.blackbasic}
            $fontSize={tokens.fontSize.web.medium}
          >
            채팅방입니당
          </Title>
        </SearchBarWarpper>
        <ChatRoomList chatRoomList={chatRoomList} />
      </FlexBoxV>
    </>
  );
};

export default ChatRoom;

// room id 추출
// studyRooms 를 통해 들어오지 않는 경우를 대비
function getRoomId() {
  const currPath = usePathname();
  const match = currPath.match(/\/studyrooms\/(\d+)\/chatRoom/);

  if (match && match[1]) {
    const roomId = parseInt(match[1], 10);
    console.log("현재 참가중인 방 아이디:", roomId);
    return roomId;
  } else {
    console.log("방 아이디를 찾을 수 없습니다.");
    return 0;
  }
}
