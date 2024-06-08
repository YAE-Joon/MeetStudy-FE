"use client";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import { UserCalendar } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";

import { DailyList } from "@/component/mainPage/mainClinentComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { MainSkleton } from "@/component/mainPage/mainStyledComponents";
import MainLoading from "@/app/loading";
const { PartContainerV } = MainStyledPack;
const tokens = dt.DesignTokenVarNames;

const MyCalendar = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  console.log(
    "[myCalender] API를 요청합니다: ",
    `${apiPaths.calendar.all}?year=${currentYear}&month=${currentMonth}`
  );

  // 현재 연도와 월로 요청합니다.

  const [userCalendarData, error, isLoading] = useFetch<UserCalendar[]>(
    //apiPaths.mypage.info,
    apiPaths.calendar.all,
    {
      headers: {
        year: currentYear,
        month: currentMonth,
      },
    },
    false,
    false
  );

  if (isLoading) {
    return <MainSkleton />;
  }

  console.log(
    "[myCalender]userCalendarData: ",
    userCalendarData,
    typeof userCalendarData
  );

  return (
    <>
      <Title
        $htype={3}
        $fontSize={tokens.fontSize.web.medium}
        $color={tokens.colors.simple.blackbasic}
      >
        {`${currentYear}년 ${currentMonth}월`}
      </Title>

      {userCalendarData ? (
        <DailyList userCalendars={userCalendarData} />
      ) : (
        <div>달력 정보가 존재하지 않습니다.</div>
      )}
    </>
  );
};

export default MyCalendar;
