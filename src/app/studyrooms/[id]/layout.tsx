"use client";
import { OuterContainer } from "@/component/styled-components/Container";
import SearchPageContainer from "@/app/studyrooms/StudyRoomPage";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";

import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import { Title } from "@/component/styled-components/TextBoxes";

import { ChangeEvent, useState } from "react";
import { MdMenu } from "react-icons/md";

import {
  InnerContainer,
  CategoryNav,
  StudyRoomCategories,
} from "@/app/studyrooms/[id]/StyledComponents";

import dt from "@/lib/designToken/designTokens";
import Link from "next/link";
const tokens = dt.DesignTokenVarNames;

import { useParams } from "next/navigation";

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

export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isopen, setIsopen] = useState(false);

  //const roomId = params.id;

  //const roomId = 1;

  const params = useParams();
  const roomId = params.id?.toString();
  console.log("roomId", roomId);

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const studyRoomMenu = [
    { label: "홈", link: `/studyrooms/${roomId}` },
    { label: "채팅", link: `/studyrooms/${roomId}/chatRoom` },
    { label: "스터디룸_캘린더", link: `/studyrooms/${roomId}/calendar` },
    { label: "참가자_리스트", link: `/studyrooms/${roomId}/members` },
    { label: "게시판", link: `/studyrooms/${roomId}/board` },
  ];
  return (
    <OuterContainer>
      <InnerContainer>
        <CategoryNav>
          <StudyRoomCategories isopen={isopen}>
            <CategoryTitleWrapper>
              <TitleWrapper>
                <Title
                  htype={3}
                  align={"left"}
                  content={"무슨무슨 스터디(스터디이름)"}
                  color={tokens.colors.simple.blackbasic}
                  fontSize={tokens.fontSize.web.medium}
                />
              </TitleWrapper>
            </CategoryTitleWrapper>
            {studyRoomMenu.map((menuItem, idx) => (
              <Link key={idx} href={menuItem.link}>
                {menuItem.label}
              </Link>
            ))}
          </StudyRoomCategories>
        </CategoryNav>
        <SearchResultSection>{children}</SearchResultSection>
      </InnerContainer>
    </OuterContainer>
  );
}
