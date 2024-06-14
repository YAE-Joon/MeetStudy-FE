"use client";
import React from "react";
import { Container } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import { MovingButton } from "@/component/styled-components/Button/Buttons";
import ReviewSection from "@/component/styled-components/Cards/MainCard/ReviewSection";
import { tokens } from "./Landing";
import { LandingProps } from "./FirstSectionLanding";

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
      <FlexBoxV type={"center"} $justifyContent={"center"} $width={"100%"}>
        <Title $htype={2} $color={tokens.colors.simple.blackbasic}>
          사용자 후기
        </Title>

        <ReviewSection />
      </FlexBoxV>
      <MovingButton onClick={mover} content={"down"} type={"primary"} />
    </Container>
  );
});
