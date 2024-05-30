"use client";

import React from "react";
import styled from "styled-components";

/** Styled */

export const StyledWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  //padding: var(--spacing-padding);

  min-height: 100vh;
  max-width: 100%;
  width: var(--box-sizes-width-wrapper-max);

  background-color: var(--colors-simple-whitebg);

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(--box-sizes-width-wrapper-min-mobile);
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
