"use client";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { Title } from "@/component/styled-components/TextBoxes";
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
const tokens = dt.DesignTokenVarNames;
const ChatRoom = () => {
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
      <SearchResultContainer>
        <div>여기에 뭐넣지?</div>
      </SearchResultContainer>
    </>
  );
};

export default ChatRoom;
