"use client";

import React from "react";
import styled from "styled-components";

/** Styled */

interface SectionHorizonProps {
  $gridCounter: number;
  $sectionColor: string;
}

export const StyledSectionHori = styled.section<SectionHorizonProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $gridCounter }) => $gridCounter},
    minmax(25%, auto)
  );
  width: 100%;
  height: 100%;
  min-height: 100%;

  background-color: ${({ $sectionColor }) => `var(${$sectionColor})`};

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

/** Component  */
interface SectionProps {
  children: React.ReactNode;
  gridCounter: number;
  sectionColor: string;
}

const SectionHori: React.FC<SectionProps> = ({
  children,
  gridCounter,
  sectionColor,
}) => {
  return (
    <StyledSectionHori $gridCounter={gridCounter} $sectionColor={sectionColor}>
      {children}
    </StyledSectionHori>
  );
};

export default SectionHori;
