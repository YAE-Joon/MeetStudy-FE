"use client";
import { ChatRoomInfoProps } from "@/lib/types";
import useFetch from "@/hooks/useFetch";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { ChatRoomList } from "@/app/studyrooms/[id]/chatRoom/chatroomComponents";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import dt from "@/lib/designToken/designTokens";

const { SearchBarWarpper } = StyledStudyRoomIndex;

const tokens = dt.DesignTokenVarNames;
const ChatRoom = () => {
  const [chatRoomList, error] = useFetch<ChatRoomInfoProps[]>(
    "/api/chat/chatRoomList", // 임시, next서버로 보냄
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
