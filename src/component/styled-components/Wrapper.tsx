"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface WrapperProps {
  children?: React.ReactNode;
  $bgColor?: string | null;
  $minHeight?: string | null;
  flexDirection?: "column" | "row";
  $padding?: string | null;
}
/** Styled */

export const Wrapper = styled.section<WrapperProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  justify-content: space-between;
  align-items: center;

  min-height: ${({ $minHeight }) => ($minHeight ? $minHeight : "100%")};
  width: 100%;
  min-width: var(${tokens.boxSizes.width.wrapperMax});
  padding: ${({ $padding }) => ($padding ? $padding : "1.5rem")};

  background-color: ${({ $bgColor }) =>
    $bgColor || tokens.colors.simple.whitebg};

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${tokens.boxSizes.width.wrapperMinMobile});
    text-align: center;
  }
`;

/** Component  */
// interface WrapperProps {
//   children: React.ReactNode;
//   $minHeight?: string;
//   $bgColor?: string;
// }
// /**
//  *
//  * @param param0 React.ReactNode
//  * @returns flex, main 태그를 반환
//  */
// const Wrapper: React.FC<WrapperProps> = ({
//   children,
//   $bgColor,
//   $minHeight,
// }) => {
//   return (
//     <StyledWrapper $bgColor={$bgColor} $minHeight={$minHeight}>
//       {children}
//     </StyledWrapper>
//   );
// };

export default Wrapper;
