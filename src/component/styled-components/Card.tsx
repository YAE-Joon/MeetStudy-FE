"use client";

import styled from "styled-components";
import {
  StyledProps,
  StyledComponentsProps,
} from "@/component/styled-components/styledProps";

import dt from "@/lib/designToken/designTokens";
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface Styled_li_card_props extends StyledProps {}

interface li_cardProps extends StyledComponentsProps {
  image: string;
  content: string;
  key?: string | Number;
}

const Styled_li = styled.li`
  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  gap: 0.5rem;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;
export const Li_card: React.FC<li_cardProps> = ({ image, content }) => {
  return (
    <Styled_li>
      <div>{image}</div>
      <div>{content}</div>
    </Styled_li>
  );
};
