"use client";
import styled from "styled-components";
import { css } from "styled-components";
import dt from "@/lib/designToken/designTokens";

import { Title } from "@/component/styled-components/TextBoxes";
import { MdMenu } from "react-icons/md";
import Link from "next/link";

import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import { useEffect, useState } from "react";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { CategoriyOptions } from "@/lib/types";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
import { FlexBoxUlV } from "@/component/styled-components/FlexBoxes";

const NaviContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative; // 추가: CategoryNav의 위치를 상위 div 안에서 설정하기 위해 relative로 변경

  padding: 1rem 0 1rem 1rem;
`;

interface CategoryNavProps {
  $bgColor?: string;
  $txtColor?: string;
}

const CategoryNav = styled.nav<{ $navTopPos: string } & CategoryNavProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  width: 250px;
  min-width: 100px;
  min-height: 100%;
  height: auto; // 자동으로 목록이 길어질 수 있도록!

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
  position: absolute; // 상위 div 안에서 위치 조정
  top: ${(props) => props.$navTopPos};
  transition: top 0.3s ease-in-out;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    min-width: 100%;
    height: auto;
    padding: 0.5rem;

    > *:first-child {
      padding-bottom: 1rem;
    }
  }
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
  }
`;

export const StudyRoomCategories = styled(FlexBoxUlV).attrs<{
  $isopen: boolean;
}>({
  $isopen: undefined, // DOM에 직접 전달되지 않도록 필터링
})<{ $isopen: boolean }>`
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
      props.$isopen &&
      css`
        > li {
          display: block;
        }
      `}
    ${(props) =>
      !props.$isopen &&
      css`
        > li {
          display: none;
        }
      `}
  }
`;
const MovingMenu = ({
  title,
  menu,
  roomId,
}: {
  title: string;
  menu: { label: string; link: string }[];
  roomId: string;
}) => {
  const [isopen, setIsopen] = useState(false);
  const [navTopPos, setNavTopPos] = useState<string>("10%");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (window.innerWidth > 600) {
          // 반응형 제외
          if (scrollTop === 0) {
            setNavTopPos("5%"); // 스크롤이 맨 위일 때 부모 div에 달라붙도록 설정
          } else {
            const newTop = `calc(50% + ${scrollTop * 0.1}px)`;
            setNavTopPos(newTop);
          }
        } else {
          setNavTopPos("50%"); // 반응형일 때는 고정 위치
        }
      }, 50); // 50ms 디바운스 적용
    };

    window.addEventListener("scroll", handleScroll);

    // unmount시 clean up
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  return (
    <>
      <NaviContainerDiv>
        <CategoryNav
          $navTopPos={navTopPos}
          $bgColor={`var(${tokens.colors.simple.secondary})`}
          $txtColor={`var(${tokens.colors.simple.blackbasic})`}
        >
          <StudyRoomCategories $isopen={isopen}>
            <CategoryTitleWrapper>
              <TitleWrapper>
                <Title
                  $htype={3}
                  $align={"left"}
                  $color={tokens.colors.simple.whitebg}
                  $fontSize={tokens.fontSize.web.medium}
                >
                  {title}
                </Title>
              </TitleWrapper>
            </CategoryTitleWrapper>
            {menu.map((menuItem, idx) => (
              <Link key={idx} href={menuItem.link}>
                {menuItem.label}
              </Link>
            ))}
          </StudyRoomCategories>
        </CategoryNav>
      </NaviContainerDiv>
    </>
  );
};

export default MovingMenu;
