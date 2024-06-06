"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FlexBoxH,
  FlexBoxUlV,
  FlexBoxV,
  StyledUl,
} from "@/component/styled-components/FlexBoxes";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
import { css } from "styled-components";

export const InnerContainer = styled(FlexBoxH)`
  align-items: flex-start;

  margin-top: 0.5rem;
  > *:first-child {
    flex-grow: 2;
    max-width: 20%;
  }

  > *:last-child {
    flex-grow: 8;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *:first-child {
      height: 10%;
    }

    > *:last-child {
      height: 90%;
    }
  }
`;
interface CategoryNavProps {
  $bgColor?: string;
  $txtColor?: string;
}
export const CategoryNav = styled.nav<CategoryNavProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding-left: 1rem;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  width: 20vw;
  min-width: 300px;
  background-color: ${({ $bgColor }) => $bgColor || "#fff"};
  color: ${({ $txtColor }) => $txtColor || "#000"};
  border-right: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  > *:first-child {
    padding-bottom: 1rem;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100vw;
    //min-width: 400px;
  }
`;

export const StudyRoomCategories = styled(FlexBoxUlV).attrs<{
  isopen: boolean;
}>({
  isopen: undefined, // DOM에 직접 전달되지 않도록 필터링
})<{ isopen: boolean }>`
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  > a {
    height: 40px;
    //background-color: red;
    flex: 1;
    font-size: var(${tokens.fontSize.web.small});
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    width: 100%;
    &:hover {
      background-color: var(${tokens.colors.simple.tertiarygray});
      font-weight: 700;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
    flex-direction: column;

    ${(props) =>
      props.isopen &&
      css`
        > li {
          display: block;
        }
      `}
    ${(props) =>
      !props.isopen &&
      css`
        > li {
          display: none;
        }
      `}
  }
`;
