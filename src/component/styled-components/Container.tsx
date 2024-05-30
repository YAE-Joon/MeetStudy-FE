"use client";

import React from "react";
import styled from "styled-components";

/** Styled */

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0 1rem 0;

  width: 100%;
  max-width: var(--box-sizes-width-container-max);
  min-height: 100vh;

  background-color: var(--colors-simple-whitebg);

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(--box-sizes-width-container-min-mobile);
    text-align: center;
  }
`;

/** Component  */
interface ContainerProps {
  children: React.ReactNode;
}
/**
 *
 * @param param0 React.ReactNode
 * @returns flex, 중앙 정렬 및 양쪽 여백을 균등하게 맞추는 div
 */
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
