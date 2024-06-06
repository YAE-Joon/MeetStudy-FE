"use client";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { UserData } from "@/lib/types";

import { Container } from "@/component/styled-components/Container";
import Wrapper from "@/component/styled-components/Wrapper";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import {
  DailyList,
  MainNavBar,
} from "@/component/mainPage/mainClinentComponents";
import MainSubLoading from "@/component/mainPage/loading";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;

const { SectionContainerH, SectionContainerV, PartContainerV, PartContainerH } =
  MainStyledPack;
// 첫번째 구역 : 일정과 참여중인 스터디룸(미완성)
const FirstSectionMain = () => {
  const [userData, error] = useFetch<UserData>("/api/mypage", {}, false, false);
  console.log("클라이언트, userData 보입니까?", userData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return (
      <Wrapper $bgColor={tokens.colors.simple.whitebg}>
        {" "}
        <MainSubLoading />
      </Wrapper>
    );
  }

  return (
    <Wrapper $bgColor={tokens.colors.simple.whitebg}>
      <SectionContainerH>
        <PartContainerV>
          <Title
            $htype={3}
            $fontSize={tokens.fontSize.web.medium}
            $color={tokens.colors.simple.blackbasic}
          >
            일정
          </Title>
          <DailyList userCalendars={userData.userCalendars} />
        </PartContainerV>
        <PartContainerV>
          <FlexBoxV>
            <Title
              $htype={3}
              $fontSize={tokens.fontSize.web.medium}
              $color={tokens.colors.simple.blackbasic}
            >
              내가 참여중인 스터디들
            </Title>
            {/* {userStudyRooms && (
            <ul>
              {userStudyRooms.map((userStudyRoom, idx) => {
                return <li key={idx}>{userStudyRoom.studyRoomId}</li>;
              })}
            </ul>
          )} */}
          </FlexBoxV>
        </PartContainerV>
      </SectionContainerH>
    </Wrapper>
  );
};

// 게시글 섹션(미완성, 향후 게시판 컴포넌트 재활용 예정)
const SecondSectionMain = () => {
  const [userData, error] = useFetch<UserData>("/api/mypage", {}, false, false);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return (
      <Wrapper $bgColor={tokens.colors.simple.whitebg}>
        {" "}
        <MainSubLoading />;
      </Wrapper>
    );
  }

  return (
    <Wrapper $bgColor={tokens.colors.simple.whitebg}>
      <SectionContainerV>
        <PartContainerH>
          <Title
            $htype={3}
            $fontSize={tokens.fontSize.web.medium}
            $color={tokens.colors.simple.blackbasic}
          >
            내가 스크렙한 게시글
          </Title>
          <DailyList userCalendars={userData.userCalendars} />
        </PartContainerH>
        <PartContainerH>
          <FlexBoxV>
            <Title
              $htype={3}
              $fontSize={tokens.fontSize.web.medium}
              $color={tokens.colors.simple.blackbasic}
            >
              내가 작성한 게시글
            </Title>
            {/* {userStudyRooms && (
            <ul>
              {userStudyRooms.map((userStudyRoom, idx) => {
                return <li key={idx}>{userStudyRoom.studyRoomId}</li>;
              })}
            </ul>
          )} */}
          </FlexBoxV>
        </PartContainerH>
      </SectionContainerV>
    </Wrapper>
  );
};

const MainPage = () => {
  return (
    <>
      <MainNavBar mode={"mypage"} />
      <Link href={"/admin"}>관리자 페이지(개발용)</Link>
      <Container $bgColor={`var(${tokens.colors.simple.primary})`}>
        <FirstSectionMain />
        <SecondSectionMain />
      </Container>
    </>
  );
};

export default MainPage;
