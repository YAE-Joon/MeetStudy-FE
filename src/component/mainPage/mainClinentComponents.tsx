"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { UserCalendar } from "@/types/Calendar";
import routeLinks from "@/lib/routeLinks";

import { standardizeDate } from "@/util/dateUtils";

import { IoMdSettings } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";

import dt from "@/lib/designToken/designTokens";
import {
  Title,
  Description,
  TitleWrapper,
} from "@/component/styled-components/TextBoxes";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";
import { StyledCalendarPack } from "@/component/mainPage/mainStyledComponents";
import { fetchUserInfo } from "./fetchUserInfo";
import { useSession } from "next-auth/react";
const tokens = dt.DesignTokenVarNames;

// styleds components
const {
  SettingSection,
  MySettingUl,
  FlexBar,
  StyledDetails,
  MainTitleWrapper,
  ErrorBox,
  StyledDescription,
} = MainStyledPack;

const { Date } = StyledCalendarPack;
export const MainNavBar = ({ mode }: { mode?: string }) => {
  const { data: session, status } = useSession();
  console.log(session);
  const isLoggedIn = status === "authenticated";
  const [userNickName, setUserNickName] =
    useState("밋스터디에 오신걸 환영합니다.");

  useEffect(() => {
    const fetchAndSetUserInfo = async () => {
      const nickname = await fetchUserInfo();
      if (nickname) {
        setUserNickName(nickname);
      }
    };

    fetchAndSetUserInfo();
  }, []);
  return (
    <FlexBar>
      <Title
        $htype={1}
        $fontSize={tokens.fontSize.web.large}
        $color={tokens.colors.simple.blackbasic}
        $padding={"0"}
      >
        {isLoggedIn
          ? `어서오세요, ${userNickName} 님!`
          : "밋스터디에 오신걸 환영합니다"}
      </Title>

      <SettingSection>
        <MySettingUl>
          {mode === "mypage" ? (
            <>
              <li>
                <IoMdSettings
                  style={{ color: `var(${tokens.colors.simple.primary})` }}
                />
              </li>
              <li>
                <Link href={routeLinks.myAccountSetting}>계정 관리</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <RiUserFill
                  style={{ color: `var(${tokens.colors.simple.primary})` }}
                />
              </li>
              <li>
                <Link href={routeLinks.main}>메인으로</Link>
              </li>
            </>
          )}
        </MySettingUl>
      </SettingSection>
    </FlexBar>
  );
};

export const DailyList = ({
  userCalendars,
}: {
  userCalendars: UserCalendar[];
}) => {
  if (!userCalendars) {
    return (
      <ErrorBox>
        <MdErrorOutline
          style={{ color: `var(${tokens.colors.simple.invalidred})` }}
        />
        <Description
          color={tokens.colors.simple.invalidred}
          content={"Null 오류가 발생했습니다. 관리자에게 문의해주세요."}
        />
      </ErrorBox>
    );
  }

  return (
    <>
      {userCalendars?.length === 0 ? (
        <p>일정이 존재하지 않습니다.</p>
      ) : (
        <>
          {userCalendars.map((userCalendar, idx) => {
            const { startDateStr, endDateStr, startTimeStr, endTimeStr } =
              standardizeDate(userCalendar);
            return (
              <StyledDetails key={userCalendar.id}>
                <MainTitleWrapper>
                  <Date>{idx + 1}</Date>
                  <Title
                    $htype={4}
                    $color={tokens.colors.simple.blackbasic}
                    $fontSize={tokens.fontSize.web.small}
                    $align={"left"}
                  >
                    {userCalendar.title}
                  </Title>
                  <div>
                    <p>
                      {startDateStr} {startTimeStr}
                    </p>
                    <p>
                      {endDateStr} {endTimeStr}
                    </p>
                  </div>
                </MainTitleWrapper>
                <StyledDescription
                  content={userCalendar.content}
                  fontSize={tokens.fontSize.web.xsmall}
                />
              </StyledDetails>
            );
          })}
        </>
      )}
    </>
  );
};
