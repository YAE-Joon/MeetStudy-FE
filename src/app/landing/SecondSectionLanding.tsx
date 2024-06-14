"use client";
import React from "react";
import { Container } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import { MovingButton } from "@/component/styled-components/Button/Buttons";
import FeaturesSection from "@/component/styled-components/Cards/MainCard/FeatureSerctions";
import { tokens } from "./Landing";
import { LandingProps } from "./FirstSectionLanding";

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
          <span style={{ color: "#52C233", fontSize: "25px" }}>밋스터디</span>의
          서비스 자랑목록
        </Title>
        <FeaturesSection />
      </FlexBoxV>
      <MovingButton onClick={mover} content={"down"} type={"primary"} />
    </Container>
  );
});
