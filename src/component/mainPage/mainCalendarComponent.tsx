"use client";
import { useEffect, useState } from "react";

import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";
import { UserPersonalCaledar } from "@/types/Calendar";
import { processDateTime } from "@/util/dateUtilsFinal";
import { nullChecker } from "@/util/unllChecker";
import dt from "@/lib/designToken/designTokens";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

import { MainSkleton } from "@/component/mainPage/mainStyledComponents";
import getTokenByClient from "@/util/getTokenByClient";
import StyledMainCal from "@/component/mainPage/styledMainCalendarsComponents";
import { Title } from "@/component/styled-components/TextBoxes";
const {
  StyledDetails,
  MainTitleWrapper,
  CalDate,
  CalTitle,
  StyledDescription,
  GhostButton,
  IconWrapper,
} = StyledMainCal;
const tokens = dt.DesignTokenVarNames;

import PackedStyledEmpty from "@/component/styled-components/EmptyContent";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
const { EmptyStyledLink, EmptyText, EmptyTitle, EmptyCard, EmptyContainer } =
  PackedStyledEmpty;

const MyCalendar = () => {
  //for api params
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  //data fetching
  const [userCalendarData, setUserCalendarData] = useState<
    UserPersonalCaledar[] | null
  >(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  //for pagination
  const itemsPerPage = 5;
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "[client][myCalendar] API를 요청합니다: ",
        `${apiPaths.calendar.all}?year=${currentYear}&month=${currentMonth}`
      );

      const fetchCalendarData = async () => {
        try {
          const token = getTokenByClient();
          const calendarData = await fetchDataBE(
            apiPaths.calendar.all,
            {
              headers: {
                year: currentYear,
                month: currentMonth,
              },
            },
            token
          );
          const filteredHoliyDay = calendarData?.filter(
            (data: UserPersonalCaledar) => data.holiday === false
          );
          setUserCalendarData(filteredHoliyDay);
        } catch (err) {
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error("알 수 없는 에러가 발생했습니다."));
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchCalendarData();
    }
  }, [currentYear, currentMonth]);

  const paginatedData = userCalendarData?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // for toggle
  const toggleDescription = (id: number) => {
    if (typeof id !== "number") {
      console.log("[MyCalendar] id가 숫자가 아닙니다.");
      return;
    }
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  //// handlers for pagiation /////
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    if (
      userCalendarData &&
      (currentPage + 1) * itemsPerPage < userCalendarData.length
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return <MainSkleton />;
  }

  const EmptyNoticeBox = () => {
    return (
      <EmptyContainer>
        <EmptyCard>
          <EmptyText>개인 일정이 없습니다. 일정을 추가해보세요</EmptyText>
          {/* <CreateChatRoom roomId={roomId} /> */}
          <span>
            <PrimaryButton content={"캘린더 바로가기"} href={"/calendar"} />
          </span>
        </EmptyCard>
      </EmptyContainer>
    );
  };

  return (
    <div>
      {!userCalendarData || !paginatedData || paginatedData === undefined ? (
        <div>로딩중</div>
      ) : (
        <>
          <Title
            $color={tokens.colors.simple.blackbasic}
            $htype={3}
          >{`${currentMonth}월`}</Title>
          {userCalendarData.length === 0 ? (
            <>
              <EmptyNoticeBox />
            </>
          ) : (
            <>
              <div
                style={{ width: "100%", maxWidth: "1024px", margin: "0 auto" }}
              >
                <div
                  style={{ display: "inline-grid", gap: "16px", width: "100%" }}
                >
                  {paginatedData.map((userCalendar, idx) => {
                    const startDateStr = nullChecker(
                      userCalendar.startDate,
                      "string",
                      (value) => processDateTime(value).formattedDate
                    );
                    const endDateStr = nullChecker(
                      userCalendar.endDate,
                      "string",
                      (value) => processDateTime(value).formattedDate
                    );

                    return (
                      <StyledDetails key={userCalendar.id}>
                        <MainTitleWrapper>
                          <CalTitle $color={"#1a202c"}>
                            {userCalendar.title}
                          </CalTitle>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <p>{startDateStr}</p>
                              <p>{endDateStr}</p>
                            </div>
                            <GhostButton
                              onClick={() => toggleDescription(userCalendar.id)}
                            >
                              <IconWrapper
                                rotate={`${expandedId === userCalendar.id}`}
                              >
                                <IoIosArrowDown />
                              </IconWrapper>
                            </GhostButton>
                          </div>
                        </MainTitleWrapper>
                        <StyledDescription
                          $expanded={expandedId === userCalendar.id}
                        >
                          {userCalendar.content}
                        </StyledDescription>
                      </StyledDetails>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={handlePrevPage} disabled={currentPage === 0}>
                    <IoIosArrowBack size={24} />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={
                      !userCalendarData ||
                      (currentPage + 1) * itemsPerPage >=
                        userCalendarData.length
                    }
                  >
                    <IoIosArrowForward size={24} />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyCalendar;
