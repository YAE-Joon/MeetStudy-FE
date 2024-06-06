"use client";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { ChatRoomList } from "@/app/studyrooms/[id]/chatRoom/chatroomComponents";
import { Title } from "@/component/styled-components/TextBoxes";
import useFetch from "@/hooks/useFetch";
const {
  // InnerContainer,
  // CategoryNav,
  //StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  CategoryTitleWrapper,
} = StyledStudyRoomIndex;

import dt from "@/lib/designToken/designTokens";
import { ChatRoomInfoProps } from "@/lib/types";
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
      <SearchBarWarpper>
        <Title
          htype={3}
          align={"left"}
          content={"채팅방입니당"}
          color={tokens.colors.simple.blackbasic}
          fontSize={tokens.fontSize.web.medium}
        />
      </SearchBarWarpper>

      <ChatRoomList chatRoomList={chatRoomList} />
    </>
  );
};

export default ChatRoom;
