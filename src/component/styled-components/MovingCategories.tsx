"use client";
import styled from "styled-components";

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

const { StudyRoomCategories, HamburgerIcon } = StyledStudyRoomIndex;

const NaviContainerDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative; // 추가: CategoryNav의 위치를 상위 div 안에서 설정하기 위해 relative로 변경

  padding: 1rem 0 1rem 1rem;
`;

const CategoryNav = styled.nav<{ $navTopPos: string }>`
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

const MovingCategories = ({
  categories,
}: {
  categories: CategoriyOptions[];
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
            setNavTopPos("10%"); // 스크롤이 맨 위일 때 부모 div에 달라붙도록 설정
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
        <CategoryNav $navTopPos={navTopPos}>
          <StudyRoomCategories $isopen={isopen}>
            <CategoryTitleWrapper>
              <TitleWrapper>
                <Title
                  $htype={3}
                  $align={"left"}
                  $color={tokens.colors.simple.blackbasic}
                  $fontSize={tokens.fontSize.web.medium}
                >
                  카테고리
                </Title>
              </TitleWrapper>
              <HamburgerIcon onClick={toggleMenu}>
                <MdMenu />
              </HamburgerIcon>
            </CategoryTitleWrapper>
            <Link href={"/studyrooms/1"}>개발용 채팅방으로</Link>
            {categories.map((category) => {
              return (
                <li key={category.id} title={category.description}>
                  {category.name}
                </li>
              );
            })}
          </StudyRoomCategories>
        </CategoryNav>
      </NaviContainerDiv>
    </>
  );
};

export default MovingCategories;
