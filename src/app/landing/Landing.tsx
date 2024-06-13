"use client";

import React, { RefObject, useRef, forwardRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import routeLinks from "@/lib/routeLinks";
import section_01_img from "../../../public/images/1. landing-01.png";
import { Container } from "@/component/styled-components/Container";
import {
  FlexBoxV,
  FlexBoxH,
  FlexBox_H_ul,
} from "@/component/styled-components/FlexBoxes";
import { ImageContainer, ImageWrapper } from "@/component/ImageConainer";
import { Description, Title } from "@/component/styled-components/TextBoxes";
import {
  PrimaryButton,
  SecondaryButton,
  MovingButton,
} from "@/component/styled-components/Button/Buttons";
import { GridBox_ul } from "@/component/styled-components/GridBoxes";
import { Li_card } from "@/component/styled-components/Card";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import { StudyRoom } from "@/types/StudyRoom";
import Loading from "@/component/Loading/Loading";
import { MainStudyRoomCard } from "@/component/StudyRoomCard";
import Link from "next/link";
import { StyledButtonLink } from "@/component/styled-components/Button/buttonsComponents";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const TextPart = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;

  width: 100%;
`;

const dummy_list_sect2 = {
  "📅": "일정관리 가능!",
  "📲": "반응형 사이트!",
  "💬": "실시간 채팅",
};

const dummy_list_sect3 = [
  {
    category: "개발",
    desc: "모각코하기 딱 좋아요^^",
    profilePic: "👩‍💻",
    author: "클라우드 레이서",
  },
  {
    category: "공무원",
    desc: "실시간으로 채팅하기 좋아요",
    profilePic: "👩‍💻",
    author: "합격맨",
  },
];

interface LandingProps {
  ref: RefObject<HTMLDivElement>;
  mover: () => void;
}

const ExtendedFlexBoxH = styled(FlexBoxH)`
  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

const ExtendedFlexBoxV = styled(FlexBoxV)`
  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

const LandingDesc = styled(Description)`
  padding: 1rem;
`;

/** Components */
// 사진과 타이틀
export const FirstSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  return (
    <Container
      $bgColor={tokens.colors.simple.secondary}
      $padding={"2rem 0 2rem 0"}
      $gap={"3px"}
      $height={"100vh"}
      ref={ref}
      $justifyContent={"center"}
    >
      <ExtendedFlexBoxV $justifyContent={"center"}>
        <ExtendedFlexBoxH>
          <TextPart>
            <Title $htype={1} $align="left">
              온라인에서도 함께 공부해요, 밋스터디
            </Title>
            <LandingDesc content={"온라인 스터디 공간"} align="left" />
            <GridBox_ul>
              <PrimaryButton content={"스터디 합류하기"} href={"/studyrooms"} />
              <SecondaryButton
                content="회원가입하기"
                href={routeLinks.signUp}
              />
            </GridBox_ul>
          </TextPart>
          <ImageContainer>
            <ImageWrapper position="relative" width="400px" height="300px">
              <Image
                src={section_01_img}
                alt="컴퓨터로 공부하는 이미지"
                fill={true}
                sizes={`(max-width: ${mobileWidth}) 50vw, (max-width: 1200px) 50vw, 33vw`}
                placeholder="blur"
                blurDataURL={"../../../../public/images/1. landing-01.png"}
              />
            </ImageWrapper>
          </ImageContainer>
        </ExtendedFlexBoxH>
        <MovingButton onClick={mover} content={"down"} type={"primary"} />
      </ExtendedFlexBoxV>
    </Container>
  );
});
// 자랑거리 목록
export const SecondSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  return (
    <Container
      $bgColor={tokens.colors.simple.whitebg}
      $padding={"2rem 0 2rem 0"}
      $gap={"3px"}
      $height={"100vh"}
      ref={ref}
    >
      <FlexBoxV type={"center"} $justifyContent={"center"}>
        <Title $htype={2} $color={tokens.colors.simple.blackbasic}>
          밋스터디의 서비스 자랑목록
        </Title>
        <FlexBox_H_ul>
          {Object.entries(dummy_list_sect2).map(([emoji, comment], idx) => (
            <Li_card key={idx} item={{ emoji, comment }} />
          ))}
        </FlexBox_H_ul>
      </FlexBoxV>
      <MovingButton onClick={mover} content={"down"} type={"primary"} />
    </Container>
  );
});
// 사용자 후기 섹션
export const ThirdSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  return (
    <Container
      $bgColor={tokens.colors.simple.tertiarygray}
      $padding={"2rem 0 2rem 0"}
      $gap={"3px"}
      $height={"100vh"}
      ref={ref}
    >
      <FlexBoxV type={"center"} $justifyContent={"center"}>
        <Title $htype={2} $color={tokens.colors.simple.blackbasic}>
          사용자 후기
        </Title>

        <FlexBox_H_ul>
          {dummy_list_sect3.map((item, idx) => (
            <Li_card
              key={idx}
              item={{
                emoji: item.profilePic,
                comment: item.desc,
                author: item.author,
              }}
              styles={{
                $effectType: "hoverEffect",
                $shadow: "primary",
                $bgColor: tokens.colors.simple.whitebg,
              }}
            />
          ))}
        </FlexBox_H_ul>
      </FlexBoxV>
      <MovingButton onClick={mover} content={"down"} type={"primary"} />
    </Container>
  );
});

// 스터디룸 섹션
export const ForthSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  const [studyRoomsData, error, loading] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {}
  );

  const totalStudyRooms =
    studyRoomsData?.map((studyRoom: StudyRoom) => {
      const currMembers = studyRoom.userStudyRooms?.length;

      return { ...studyRoom, currMembers };
    }) || [];

  const currStudyRoomsNum = totalStudyRooms.length || 10;
  const studyRooms = totalStudyRooms.slice(0, 5);

  return (
    <Container
      $bgColor={tokens.colors.simple.whitebg}
      $padding={"2rem 0 2rem 0"}
      $gap={"3px"}
      $height={"100vh"}
      ref={ref}
    >
      <FlexBoxV type={"center"} $justifyContent={"center"}>
        {studyRooms.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <Title
              $htype={2}
              $color={tokens.colors.simple.blackbasic}
            >{`지금 ${currStudyRoomsNum}개의 스터디룸이 함께하고 있어요`}</Title>

            <FlexBox_H_ul>
              {studyRooms.map((item, idx) => (
                <MainStudyRoomCard key={item.id} item={item} />
              ))}
            </FlexBox_H_ul>
          </>
        )}
        <StyledButtonLink href={"/studyrooms"}>지금 합류하기</StyledButtonLink>
      </FlexBoxV>
      <MovingButton onClick={mover} $arrow={"up"} type={"primary"} />
    </Container>
  );
});
