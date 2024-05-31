"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

const DesignTokenVarNames = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

/** Styled */

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

  @media only screen and (max-width: ${mobileWidth}) {
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
