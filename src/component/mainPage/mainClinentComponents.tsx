"use client";
import React from "react";
import Link from "next/link";

import { UserCalendar } from "@/lib/types";
import routeLinks from "@/lib/routeLinks";

import { IoMdSettings } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";

import dt from "@/lib/designToken/designTokens";
import { Title, Description } from "@/component/styled-components/TextBoxes";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";

const tokens = dt.DesignTokenVarNames;

// styleds components
const {
  SettingSection,
  MySettingUl,
  FlexBar,
  StyledList,
  StyledDetails,
  MainTitleWrapper,
  ErrorBox,
  StyledDescription,
} = MainStyledPack;

export const MainNavBar = ({ mode }: { mode?: string }) => {
  return (
    <FlexBar>
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
  userCalendars: UserCalendar[] | null;
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
      <StyledList>
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
                    <Title
                      htype={4}
                      fontSize={tokens.fontSize.web.small}
                      color={tokens.colors.simple.blackbasic}
                      content={userCalendar.title}
                      align={"left"}
                    />
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
      </StyledList>
    </>
  );
};

function standardizeDate(userCalendar: UserCalendar) {
  const { startDay, endDay, startTime, endTime } = userCalendar;

  //set Data
  const startDateStr = `${setDateStr(startDay)}`;
  const endDateStr = `${setDateStr(endDay)}`;
  //set time
  const startTimeStr = `${setTimeSTr(startTime)}`;
  const endTimeStr = `${setTimeSTr(endTime)}`;

  return { startDateStr, endDateStr, startTimeStr, endTimeStr };

  function setTimeSTr(time: string) {
    let h, m;
    let [oriH, oriM, oriS] = time.split(":").map((t) => Number(t));
    let timeStr = "";

    if (isNaN(oriH) || isNaN(oriM) || isNaN(oriS)) {
      console.error("시간 형식 오류입니다.");
      return "";
    }

    if (oriH > 12 && oriH <= 24) {
      h = `오후 ${oriH - 12}시`;
    } else {
      h = `오전 ${oriH}시`;
    }

    if (oriM === 0) {
      m = "";
    } else {
      m = `${oriM}분`;
    }

    timeStr = `${h} ${m}`;

    return timeStr;
  }

  function setDateStr(date: string) {
    //let [y, m, d] = date.split("-").map((d) => Number(d));

    // 연, 월, 일 추출
    const yearStr = date.substring(2, 4);
    const monthStr = date.substring(4, 6);
    const dayStr = date.substring(6);

    const y = Number(yearStr);
    const m = Number(monthStr);
    const d = Number(dayStr);

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      throw new Error("숫자 변환 실패");
    }

    if (m < 1 || m > 12) {
      throw new Error("유효하지 않은 월 값입니다");
    }

    if (d < 1 || d > 31) {
      throw new Error("유효하지 않은 일 값입니다");
    }

    return `${y}년 ${m}월 ${d}일`;
  }
}
