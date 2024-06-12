"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { CategoriyOptions } from "@/lib/types";
import dt from "@/lib/designToken/designTokens";

import { MdMenu } from "react-icons/md";

import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import StyledMenuComponent from "@/component/styled-components/MovingSideBars/StyledMenuComponent";
const {
  NavigationContainer,
  CategoryNavigation,
  CategoryHeaderContainer,
  CategoryList,
  HamburgerIcon,
  CategoryLinksContainer,
} = StyledMenuComponent;
const tokens = dt.DesignTokenVarNames;

const MovingCategories = ({
  categories,
}: {
  categories: CategoriyOptions[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavigationContainer>
        <CategoryNavigation $navTopPos={navTopPos}>
          <CategoryList $isOpen={isOpen}>
            <CategoryHeaderContainer>
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
              {/* <HamburgerIcon onClick={toggleMenu}>
                <MdMenu />
              </HamburgerIcon> */}
            </CategoryHeaderContainer>
            <CategoryLinksContainer>
              <Link href={"/studyrooms/1"}>개발용 채팅방으로</Link>
              {categories.map((category) => {
                return (
                  <li key={category.id} title={category.description}>
                    {category.name}
                  </li>
                );
              })}
            </CategoryLinksContainer>
          </CategoryList>
        </CategoryNavigation>
      </NavigationContainer>
    </>
  );
};

export default MovingCategories;
