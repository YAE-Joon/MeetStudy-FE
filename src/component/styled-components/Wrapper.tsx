"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface StyledWrapper {
  $minHeight?: string | null;
  $bgColor?: string | null;
}
/** Styled */

export const StyledWrapper = styled.section<StyledWrapper>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  min-height: ${({ $minHeight }) => ($minHeight ? $minHeight : "100%")};

  width: 100%;
  min-width: var(${tokens.boxSizes.width.wrapperMax});

  padding: 1.5rem;

  //색상을 prop으로 받지 않는다면 기본 색상(배경 흰색)으로 설정됨
  background-color: var(
    ${({ $bgColor }) => {
      return $bgColor ? $bgColor : tokens.colors.simple.whitebg;
    }}
  );

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${tokens.boxSizes.width.wrapperMinMobile});
    text-align: center;
  }
`;

/** Component  */
interface WrapperProps {
  children: React.ReactNode;
  $minHeight?: string;
  $bgColor?: string;
}
/**
 *
 * @param param0 React.ReactNode
 * @returns flex, main 태그를 반환
 */
const Wrapper: React.FC<WrapperProps> = ({
  children,
  $bgColor,
  $minHeight,
}) => {
  return (
    <StyledWrapper $bgColor={$bgColor} $minHeight={$minHeight}>
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
