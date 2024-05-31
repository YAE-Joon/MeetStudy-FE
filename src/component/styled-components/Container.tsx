"use client";

import React from "react";
import styled from "styled-components";
import DesignTokenVarNames from "@/lib/designToken/designTokens";
/** Styled */

interface StyledContainerProps {
  $bgColor: string | null;
  $minWidth: string | null;
}

const mobileWidth = DesignTokenVarNames.boxSizes.width.containerMaxMobile;
export const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0 1rem 0;

  width: 100%;
  // 너비를 지정받지 않는다면
  min-width: var(
    ${({ $minWidth }) => {
      return $minWidth ? "$minWidth" : "100%";
    }}
  );

  min-height: 100vh;
  //색상을 prop으로 받지 않는다면 기본 색상(배경 흰색)으로 설정됨
  background-color: var(
    ${({ $bgColor }) => {
      return $bgColor
        ? $bgColor
        : `${DesignTokenVarNames.colors.simple.whitebg}`;
    }}
  );

  @media only screen and (${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${DesignTokenVarNames.boxSizes.width.containerMinMobile});

    text-align: center;
  }
`;

/** Component  */
interface ContainerProps {
  children: React.ReactNode;
  color?: string | null;
  minWidth?: string | null;
}

/**
 *
 * @param param0 { children, color, maxWidth} 색상/최소 너비 설정이 필요할 때 color 라는 이름으로 props로 내려보낼 수 있음.
 * @returns  flex, 중앙 정렬 및 양쪽 여백을 균등하게 맞추는 div
 */
const Container: React.FC<ContainerProps> = ({
  children,
  color = null,
  minWidth = null,
}) => {
  return (
    <StyledContainer $bgColor={color} $minWidth={minWidth}>
      {children}
    </StyledContainer>
  );
};

export default Container;
