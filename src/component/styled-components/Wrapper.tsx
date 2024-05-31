"use client";

import React from "react";
import styled from "styled-components";
import DesignTokenVarNames from "@/lib/designToken/designTokens";
/** Styled */

const mobileWidth = DesignTokenVarNames.boxSizes.width.containerMaxMobile;
export const StyledWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  //padding: var(--spacing-padding);

  min-height: 100vh;
  max-width: 100%;
  width: var(${DesignTokenVarNames.boxSizes.width.wrapperMax});

  background-color: var(--colors-simple-whitebg);

  @media only screen and (${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${DesignTokenVarNames.boxSizes.width.wrapperMinMobile});
    text-align: center;
  }
`;

/** Component  */
interface WrapperProps {
  children: React.ReactNode;
}
/**
 *
 * @param param0 React.ReactNode
 * @returns flex, main 태그를 반환
 */
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
