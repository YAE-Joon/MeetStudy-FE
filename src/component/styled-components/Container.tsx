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

// outer container

interface OuterContainerProps {
  as?: keyof JSX.IntrinsicElements;
  $minWidth?: string | null;
  $gap?: string | null;
  $height?: string | null;
  $bgColor?: string | null;
  $justify?: string | null;
}

export const OuterContainer = styled.div.attrs<OuterContainerProps>(
  ({ as }) => ({
    as: as || "div",
  })
)<OuterContainerProps>`
  scroll-snap-type: y mandatory;
  height: ${(props) => props.$height || "100vh"};
  flex: 1; /** footer를 밀어내기 위해서 */
  min-width: ${(props) => props.$minWidth || "auto"};
  gap: ${(props) => props.$gap || "0"};
  background-color: ${(props) => props.$bgColor || "transparent"};

  //수정용
  min-height: ${(props) => props.$height || "100vh"};
  justify-content: ${(props) => props.$justify || "flex-start"};

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100vw;
  }
`;

export const OuterContainerMain = styled.div.attrs<OuterContainerProps>(
  ({ as }) => ({
    as: as || "div",
  })
)<OuterContainerProps>`
  scroll-snap-type: y mandatory;
  height: 100vh;
  flex: 1;
  min-width: auto;
  gap: 0;
  background-color: transparent;

  //수정용
  /* height: auto; */
  min-height: 100vh;
  justify-content: center;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100vw;
  }
`;

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StyledProps {
  as?: keyof JSX.IntrinsicElements;
}

/**
 *
 * @param param0 { children, color, maxWidth} 색상/최소 너비 설정이 필요할 때 color 라는 이름으로 props로 내려보낼 수 있음. 단, 색상은 tokens.colors ...로 가져와야 함
 * @returns  flex, 중앙 정렬 및 양쪽 여백을 균등하게 맞추는 div
 *
 */

export const Container = styled(
  forwardRef<HTMLDivElement, ContainerProps>(
    (
      {
        children,
        as = "div",
        $bgColor = null,
        $minWidth = null,
        $gap = null,
        $padding = null,
        $height = null,
        ...rest
      },
      ref
    ) => {
      if (as === "main") {
        return (
          <main ref={ref} {...rest}>
            {children}
          </main>
        );
      }
      return (
        <div ref={ref} {...rest}>
          {children}
        </div>
      );
    }
  )
)<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.$width || "100%"};
  min-width: ${(props) => props.$minWidth || "100%"};
  background-color: ${(props) => `var(${props.$bgColor})` || "transparent"};
  gap: ${(props) => props.$gap || "0"};
  padding: ${(props) => props.$padding || "0"};
  height: ${(props) => (props.$height ? props.$height : "auto")};
  scroll-snap-align: start;
  border-radius: ${(props) => props.$borderRadius || "0"};

  overflow: ${(props) => props.$overflow || "visible"};

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 200px;

    text-align: center;
  }

  //background-color: red;
  // 수정
  justify-content: flex-start;
  min-height: ${(props) => (props.$height ? props.$height : "100vh")};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  flex-grow: 1;
  overflow: visible;

  padding: 1rem;

  & > * {
    max-height: 400px;
    overflow: hidden;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 200px;

    text-align: center;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  flex-grow: 1;
`;

export const GridContainerFull = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 100%;
  max-width: 1200px;
  overflow: visible;
  list-style-type: none;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  /* background-color: blue; */

  li {
    list-style-type: none;
    aspect-ratio: 1 / 1;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 200px;
    text-align: center;

    li > div {
      height: 50%;
    }
  }
`;
export const FlexContainerFull = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  //flex-grow: 1;

  align-items: center;
  justify-content: center;

  overflow: visible; //

  //background-color: blue;
`;

export const GridContainerMini = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;
  max-width: 1200px;
  overflow: visible;
  list-style-type: none;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  /* background-color: blue; */

  li {
    list-style-type: none;
    aspect-ratio: 1 / 1;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 200px;
    text-align: center;

    li > div {
      height: 50%;
    }
  }
`;

export const MainContainer = styled.main<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 100%;
  background: linear-gradient(to bottom, #52c233, #2b8213);
  gap: 0;
  padding-top: 5rem;
  height: 100vh;
  scroll-snap-align: start;
  border-radius: 0;

  overflow: visible;

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 200px;
    text-align: center;
  }

  min-height: auto;
`;
