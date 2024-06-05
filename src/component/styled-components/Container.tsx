"use client";

import React, { forwardRef } from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  StyledComponentsProps,
  StyledProps,
} from "@/component/styled-components/styledProps";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
/** Styled */

interface StyledContainerProps extends StyledProps {
  $minWidth?: string | null;
  $gap?: string | null;
  as?: keyof JSX.IntrinsicElements; // for as prop
}

//const mobileWidth = DesignTokenVarNames.media.mobileWidth;
const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  // 너비를 지정받지 않는다면
  min-width: var(
    ${({ $minWidth }) => {
      return $minWidth ? "$minWidth" : "100%";
    }}
  );

  //색상을 prop으로 받지 않는다면 기본 색상(배경 흰색)으로 설정됨
  background-color: var(
    ${({ $bgColor }) => {
      return $bgColor ? $bgColor : tokens.colors.simple.whitebg;
    }}
  );

  ${({ $gap }) =>
    $gap &&
    `
    gap: ${$gap};
  `}

  ${({ $padding }) =>
    $padding &&
    `
    padding: ${$padding};
  `}

  // scroll snap setting triggerd by height prop
  ${({ $height }) =>
    $height
      ? `
    height: ${$height};
    scroll-snap-align: start;
  `
      : `
    height: auto; 
    //min-height: calc(100vh - 3rem); 
    scroll-snap-align: start;
  `}

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    min-width: var(${tokens.boxSizes.width.containerMinMobile});

    text-align: center;
  }
`;

/** Component  */
interface ContainerProps extends StyledComponentsProps {
  minWidth?: string | null;
  gap?: string | null;
  height?: string | null;
  bgColor?: string | null;
  as?: keyof JSX.IntrinsicElements;
}

// /**
//  *
//  * @param param0 { children, color, maxWidth} 색상/최소 너비 설정이 필요할 때 color 라는 이름으로 props로 내려보낼 수 있음.
//  * @returns  flex, 중앙 정렬 및 양쪽 여백을 균등하게 맞추는 div
//  */
// export const Container: React.FC<ContainerProps> = ({
//   children,
//   color = null,
//   minWidth = null,
//   gap = null,
//   padding = null,
//   height = null,
// }) => {
//   return (
//     <StyledContainer
//       $bgColor={color}
//       $minWidth={minWidth}
//       $gap={gap}
//       $padding={padding}
//       $height={height}
//     >
//       {children}
//     </StyledContainer>
//   );
// };

/**
 *
 * @param param0 { children, color, maxWidth} 색상/최소 너비 설정이 필요할 때 color 라는 이름으로 props로 내려보낼 수 있음. 단, 색상은 tokens.colors ...로 가져와야 함
 * @returns  flex, 중앙 정렬 및 양쪽 여백을 균등하게 맞추는 div
 *
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      as = "div",
      bgColor = null,
      minWidth = null,
      gap = null,
      padding = null,
      height = null,
    },
    ref
  ) => {
    return (
      <StyledContainer
        ref={ref}
        as={as}
        $bgColor={bgColor}
        $minWidth={minWidth}
        $gap={gap}
        $padding={padding}
        $height={height}
      >
        {children}
      </StyledContainer>
    );
  }
);

// outer container

const StyledOuterContainer = styled.div<StyledContainerProps>`
  scroll-snap-type: y mandatory;
  height: 100vh;
  //overflow-y: scroll;
  min-height: 100vh;
  flex: 1; /** footer를 밀어내기 위해서 */

  @media only screen and (max-width: ${mobileWidth}) {
    width: 95vw;
  }
`;
export const OuterContainer: React.FC<ContainerProps> = ({
  children,
  as = "div",
  minWidth = null,
  gap = null,
  height = null,
  bgColor = null,
}) => {
  return <StyledOuterContainer as={as}>{children}</StyledOuterContainer>;
};
