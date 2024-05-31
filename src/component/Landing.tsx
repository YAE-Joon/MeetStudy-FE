"use client";

import Image from "next/image";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import routeLinks from "@/lib/routeLinks";
import section_01_img from "../../public/images/1. landing-01.png";

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

const TextPart = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;

  width: 100%;
  height: 100%;
`;

const dummy_list = {
  "📅": "일정관리 가능!",
  "📲": "반응형 사이트!",
  "💬": "실시간 채팅",
};

/** Components */
export const FirstSection = () => {
  return (
    <FlexBox_H_2>
      <TextPart>
        <Title htype={1} content={"온라인에서도 함께 공부해요, 밋스터디"} />
        <Description content={"온라인 스터디 공간"} />
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
            fill={true}
          />
        </ImageWrapper>
      </ImageContainer>
    </FlexBox_H_2>
  );
};

export const SecondSection = () => {
  return (
    <FlexBox_v_2>
      <TextPart>
        <Title
          htype={2}
          content={"밋스터디의 서비스 자랑목록"}
          color={dt.DesignTokenVarNames.colors.simple.blackbasic}
        />
      </TextPart>
      <FlexBox_H_ul>
        {Object.entries(dummy_list).map(([icon, text], idx) => (
          <Li_card key={idx} image={icon} content={text} />
        ))}
      </FlexBox_H_ul>
    </FlexBox_v_2>
  );
};
