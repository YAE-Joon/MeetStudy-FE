"use client";

import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import { StyledProps } from "@/component/styled-components/styledProps";
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface Styled_ul extends StyledProps {}

interface StyledFlexProps {
  type?: "center" | "space-between";
  direction?: "right" | "left";
}
export const FlexBoxH = styled.div<StyledFlexProps>`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${({ direction }) => {
    return direction === "right" ? "row-reverse" : "row";
  }};
  justify-content: ${({ type }) => type || "space-between"};

  align-items: center;

  gap: 0.5rem;

  height: 100%;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
  }

  /* > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  } */
`;

export const FlexBoxV = styled.div<StyledFlexProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) =>
    direction === "right" ? "row-reverse" : "column"};
  justify-content: ${({ type }) => type || "space-between"};
  align-items: center;

  gap: 5rem;
  height: 100%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  /* > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  } */
`;
// ul - flex - basic
export const StyledUl = styled.ul<Styled_ul>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  list-style-type: none;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: stretch;
  }
`;
// landing에 사용했음, landing에 specific하게 수정 필요
export const FlexBox_H_ul = styled(StyledUl)`
  flex-direction: row;
  padding-bottom: 2vh;
  gap: 0.5rem;

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const FlexBoxUlV = styled.ul<Styled_ul>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;
