"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { MdMenu } from "react-icons/md";

import dt from "@/lib/designToken/designTokens";

import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import StyledMenuComponent from "@/component/styled-components/MovingSideBars/StyledMenuComponent";
import {
  JoinStudyRoom,
  LeaveStudyRoom,
} from "@/app/studyrooms/[id]/UserComponents";
const {
  NavigationContainer,
  CategoryNavigation,
  CategoryHeaderContainer,
  CategoryList,
  HamburgerIcon,
  CategoryLinksContainer,
} = StyledMenuComponent;

const tokens = dt.DesignTokenVarNames;

interface AccessControl {
  isAdmin: boolean;
  isMember: boolean;
  isOwner: boolean;
}

const basicAccecssControl = {
  isAdmin: false,
  isMember: false,
  isOwner: false,
};

const MovingMenu = ({
  title,
  menu,
  userAccecssControl = basicAccecssControl,
  roomId,
  mainBgColor = `${tokens.colors.simple.secondary}`,
  txtColor = `${tokens.colors.simple.blackbasic}`,
}: {
  title: string;
  menu: { label: string; link: string }[];
  userAccecssControl: {
    isAdmin: boolean;
    isMember: boolean;
    isOwner: boolean;
  }; //admin은 없음
  roomId?: number;
  mainBgColor?: string;
  txtColor?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navTopPos, setNavTopPos] = useState<string>("10%");

  const { isAdmin, isMember, isOwner } = userAccecssControl;

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
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <NavigationContainer>
        <CategoryNavigation
          $navTopPos={navTopPos}
          $bgColor={`var(${mainBgColor})`}
          $txtColor={`var(${txtColor})`}
        >
          <CategoryList
            $isOpen={isOpen}
            $bgColor={`var(${tokens.colors.simple.secondary})`}
          >
            <CategoryHeaderContainer>
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
              {/* <HamburgerIcon onClick={toggleMenu}>
                <MdMenu />
              </HamburgerIcon> */}
            </CategoryHeaderContainer>
            <CategoryLinksContainer
              $bgColor={`var(${tokens.colors.simple.secondary})`}
            >
              {isMember ? (
                <>
                  {menu.map((menuItem, idx) => (
                    <Link key={idx} href={menuItem.link}>
                      {menuItem.label}
                    </Link>
                  ))}
                  {!isOwner ? <LeaveStudyRoom /> : <></>}
                </>
              ) : (
                menu[0] && (
                  <>
                    <Link href={menu[0].link}>{menu[0].label}</Link>
                    <JoinStudyRoom />
                  </>
                )
              )}
            </CategoryLinksContainer>
          </CategoryList>
        </CategoryNavigation>
      </NavigationContainer>
    </>
  );
};

export default MovingMenu;
