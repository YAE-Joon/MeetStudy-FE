"use client";
// 채팅방
import { useState, ChangeEvent, useRef, useEffect } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { ChatMessage, UserProfile } from "@/lib/types";
import useWebSocket from "@/webSocket/client";
import { getRoomId } from "@/app/studyrooms/studyroomSub";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import {
  FlexBoxV,
  FlexBox_H_ul,
} from "@/component/styled-components/FlexBoxes";
import { nullChecker } from "@/util/unllChecker";
import { useStudyRoomData } from "@/context/StudyRoomDataContext";
import { Li_card, MemberCard } from "@/component/styled-components/Card";
import { setDateStr, convertISOToYMD } from "@/util/dateUtils";
import { Container } from "@/component/styled-components/Container";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
const {
  ChatRoomMain,
  MessageContainer,
  Message,
  MessageAuthor,
  MessageText,
  Footer,
  StyledTextarea,
  Button,
} = ChatStyled;

const {
  InnerContainer,
  StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  HamburgerMenu,
} = StyledStudyRoomIndex;

export default function MemberLists() {
  let membersInfo = [];
  const studyRoomData = useStudyRoomData().userStudyRooms.map((member) => {
    const { id, joinDate, permission, user } = member;
    const memberInfo = {
      id,
      joinDate,
      permission,
      email: user.email,
    };
    return memberInfo;
  });

  if (!studyRoomData) {
    return <div>목록 로딩중</div>;
  }

  return (
    <Container $width={"100%"} $minWidth={"600px"}>
      <SearchResultContainer>
        {studyRoomData.map((member, index) => (
          <MemberCard
            key={member.id}
            id={member.id}
            email={member.email}
            joinDate={nullChecker(member.joinDate, "string", (value) =>
              setDateStr(convertISOToYMD(value))
            )}
            permission={member.permission}
          />
        ))}
      </SearchResultContainer>
    </Container>
  );
}
