"use client";

import Image from "next/image";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import routeLinks from "@/lib/routeLinks";
import section_01_img from "../../public/images/1. landing-01.png";

import { Container } from "@/component/styled-components/Container";
import {
  FlexBox_H_2,
  FlexBox_v_2,
  FlexBox_H_ul,
} from "@/component/styled-components/FlexBoxes";
import { ImageContainer, ImageWrapper } from "@/component/ImageConainer";
import { Description, Title } from "@/component/styled-components/TextBoxes";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/component/styled-components/Buttons";
import { GridBox_ul } from "@/component/styled-components/GridBoxes";
import { Li_card } from "@/component/styled-components/Card";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const TextPart = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;

  width: 100%;
  height: 100%;
  @media only screen and (max-width: ${mobileWidth}) {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center; */
    //color: white;
  }
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

/** Components */
// 사진과 타이틀
export const FirstSectionLanding = () => {
  return (
    <Container
      color={tokens.colors.simple.secondary}
      padding={"2rem 0 2rem 0"}
      gap={"3px"}
    >
      <FlexBox_H_2>
        <TextPart>
          <Title
            htype={1}
            content={"온라인에서도 함께 공부해요, 밋스터디"}
            align="left"
          />
          <Description content={"온라인 스터디 공간"} align="left" />
          <GridBox_ul>
            <PrimaryButton content={"스터디 합류하기"} href={"/"} />
            <SecondaryButton content="회원가입하기" href={routeLinks.signUp} />
          </GridBox_ul>
        </TextPart>
        <ImageContainer>
          <ImageWrapper position="relative" width="400px" height="300px">
            <Image
              src={section_01_img}
              alt="컴퓨터로 공부하는 이미지"
              priority={true}
              fill={true}
              sizes={`(max-width: ${mobileWidth}) 50vw, (max-width: 1200px) 50vw, 33vw`}
            />
          </ImageWrapper>
        </ImageContainer>
      </FlexBox_H_2>
    </Container>
  );
};
// 자랑거리 목록
export const SecondSectionLanding = () => {
  return (
    <Container
      color={tokens.colors.simple.whitebg}
      padding={"2rem 0 2rem 0"}
      gap={"3px"}
    >
      <FlexBox_v_2>
        <TextPart>
          <Title
            htype={2}
            content={"밋스터디의 서비스 자랑목록"}
            color={tokens.colors.simple.blackbasic}
          />
        </TextPart>
        <FlexBox_H_ul>
          {Object.entries(dummy_list_sect2).map(([emoji, comment], idx) => (
            <Li_card key={idx} item={{ emoji, comment }} />
          ))}
        </FlexBox_H_ul>
      </FlexBox_v_2>
    </Container>
  );
};
// 사용자 후기 섹션
export const ThirdSectionLanding = () => {
  return (
    <Container
      color={tokens.colors.simple.tertiarygray}
      padding={"2rem 0 2rem 0"}
      gap={"3px"}
    >
      <FlexBox_v_2>
        <TextPart>
          <Title
            htype={2}
            content={"사용자 후기"}
            color={tokens.colors.simple.blackbasic}
          />
        </TextPart>
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
      </FlexBox_v_2>
    </Container>
  );
};
