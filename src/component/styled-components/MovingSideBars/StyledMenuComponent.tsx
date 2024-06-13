"use client";
import styled from "styled-components";
import { css } from "styled-components";

import dt from "@/lib/designToken/designTokens";
import { FlexBoxUlV } from "@/component/styled-components/FlexBoxes";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const NavigationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* position: relative; // 추가: CategoryNavigation의 위치를 상위 div 안에서 설정하기 위해 relative로 변경 */

  padding: 1rem 0 1rem 1rem;

  @media only screen and (max-width: ${mobileWidth}) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;
  }
`;

const CategoryNavigation = styled.nav<
  { $navTopPos: string } & CategoryNavigationProps
>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  width: 250px;
  min-width: 100px;
  max-height: 70%;
  height: auto; // 자동으로 목록이 길어질 수 있도록!
  overflow-y: auto; // 내용물이 넘칠때 스크롤이 생기게 하기

  // 스크롤 커스텀
  &::-webkit-scrollbar {
    width: 20px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 6px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 6px;
  }

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  > *:first-child {
    padding-bottom: 2rem;
  }

  background-color: ${({ $bgColor }) => $bgColor || "#fff"};
  color: ${({ $txtColor }) => $txtColor || "#000"};

  //동적 움직임 위해서
  //position: absolute; // 상위 div 안에서 위치 조정

  top: ${(props) => props.$navTopPos};
  transition: top 0.3s ease-in-out;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 0.5rem;

    > *:first-child {
      padding-bottom: 1rem;
    }
  }
`;

const CategoryHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
  }
`;
const CategoryList = styled(FlexBoxUlV).attrs<{
  $isOpen: boolean;
}>({
  $isOpen: undefined, // DOM에 직접 전달되지 않도록 필터링
})<{ $isOpen: boolean }>`
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
    flex-direction: column;

    ${(props) =>
      props.$isOpen &&
      css`
        > li {
          display: block;
        }
      `}
    ${(props) =>
      !props.$isOpen &&
      css`
        > li {
          display: none;
        }
      `}
  }
`;

const CategoryLinksContainer = styled(FlexBoxUlV)`
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  > a {
    height: 40px;
    flex: 1;
    font-size: var(${tokens.fontSize.web.small});
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    width: 100%;
    &:hover {
      background-color: var(${tokens.colors.simple.tertiarygray});
      font-weight: 700;
      cursor: pointer;
      color: var(${tokens.colors.simple.secondary});
      border-radius: 15px;
    }
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;

    flex-direction: row;
    white-space: nowrap;

    overflow-x: auto;
    > * {
      flex-shrink: 0;
      min-width: fit-content;
    }

    > a {
      &:hover {
        background-color: transparent;
        color: ${({ $bgColor }) => $bgColor || "black"};
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  @media only screen and (max-width: ${mobileWidth}) {
    display: flex;
    cursor: pointer;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
  }
`;

const HamburgerMenu = styled.div.attrs<{ $isopen: boolean }>({
  $isopen: undefined, // DOM에 직접 전달되지 않도록 필터링
})<{ $isopen: boolean }>`
  @media only screen and (max-width: ${mobileWidth}) {
    padding-top: 1rem;
    display: ${(props) => (props.$isopen ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 2rem;
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color || "black"};
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
`;

interface CategoryNavigationProps {
  $bgColor?: string;
  $txtColor?: string;
}

interface HamburgerProp {
  $isOpen: boolean;
}

interface CategoryListProps {
  $isOpen: boolean;
}

const StyledMenuComponent = {
  NavigationContainer,
  CategoryNavigation,
  CategoryHeaderContainer,
  CategoryList,
  CategoryLinksContainer,
  HamburgerIcon,
  HamburgerMenu,
  Underline,
};
export default StyledMenuComponent;
