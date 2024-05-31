import React, { ReactNode } from "react";
import styled from "styled-components";
import { StyledComponentsProps } from "@/component/styled-components/styledProps";
import dt from "@/lib/designToken/designTokens";
const DesignTokenVarNames = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

/** styled */
interface StyledUIProps {
  $borderColor?: string | null;
}

const Styled_ul = styled.ul<StyledUIProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  padding: 1rem;

  ${(props) =>
    props.$borderColor &&
    `
    border: 1px solid ${props.$borderColor};
  `}
  border-radius: 5px;

  list-style-type: none;

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${DesignTokenVarNames.boxSizes.width.containerMinMobile});

    text-align: center;
  }
`;

const Styled_li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;

/** component */

interface GridBoxProps extends StyledComponentsProps {
  borderColor?: string;
  children: ReactNode[];
}

/** ul 형식의 box */
export const GridBox_ul: React.FC<GridBoxProps> = ({
  children,
  borderColor,
}) => {
  return <Styled_ul $borderColor={borderColor}>{children}</Styled_ul>;
};
