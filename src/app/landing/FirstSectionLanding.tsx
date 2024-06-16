"use client";

import React, { RefObject } from "react";
import Image from "next/image";
import routeLinks from "@/lib/routeLinks";
import section_01_img from "../../../public/images/1. landing-01.png";
import { Container } from "@/component/styled-components/Container";
import { ImageContainer, ImageWrapper } from "@/component/ImageConainer";
import { Description, Title } from "@/component/styled-components/TextBoxes";
import {
  PrimaryButton,
  SecondaryButton,
  MovingButton,
} from "@/component/styled-components/Button/Buttons";
import { GridBox_ul } from "@/component/styled-components/GridBoxes";
import { tokens, mobileWidth } from "./Landing";
import styled from "styled-components";
import { FlexBoxV, FlexBoxH } from "@/component/styled-components/FlexBoxes";

/** Components */
// 사진과 타이틀

export const FirstSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  const handleAlert = () => {
    console.log("landing 합류하기 클릭함");
    alert("회원가입 후 입장할 수 있습니다.");
  };
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
              <PrimaryButton
                content={"스터디 합류하기"}
                onClick={handleAlert}
              />
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

export const TextPart = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  width: 100%;
`;

export interface LandingProps {
  ref: RefObject<HTMLDivElement>;
  mover: () => void;
}

export const ExtendedFlexBoxH = styled(FlexBoxH)`
  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const ExtendedFlexBoxV = styled(FlexBoxV)`
  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const LandingDesc = styled(Description)`
  padding: 1rem;
`;
