"use client";

import { Container } from "@/component/styled-components/Container";
import Wrapper from "@/component/styled-components/Wrapper";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import { MainNavBar } from "@/component/mainPage/mainClinentComponents";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";
import dt from "@/lib/designToken/designTokens";
import { apiPaths } from "@/config/api";
import MyCalendar from "@/component/mainPage/mainCalendarComponent";
import MyStudyRooms from "@/component/mainPage/mainMyStudyRoomsComponent";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const tokens = dt.DesignTokenVarNames;

const {
  SectionContainerH,
  SectionContainerV,
  PartContainerV,
  PartContainerH,
  MainWrapper,
} = MainStyledPack;

const MainPage = () => {
  //일정과 내가 참가한 스터디룸 목록
  //내가 스크렙한 게시글들 같은 거

  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    // @ts-ignore //id 있음
    if (data !== undefined && data !== null && data?.user?.id === adminEmail) {
      alert("관리자 페이지로 이동합니다.");
      router.push("/admin");
    }
    const alertMessage = Cookies.get("alertMessage");
    console.log("alertMessage?", alertMessage);
    if (alertMessage !== undefined) {
      alert(alertMessage);
      Cookies.remove("alertMessage");
    }
  }, []);
  return (
    <>
      <MainNavBar mode={"mypage"} />
      <Container $bgColor={`${tokens.colors.simple.primary}`} $height={"100vh"}>
        <FirstSectionMain />
      </Container>
    </>
  );
};

// 첫번째 구역 : 일정과 참여중인 스터디룸(미완성)
function FirstSectionMain() {
  return (
    <>
      <MainWrapper>
        <PartContainerV>
          <MyCalendar />
        </PartContainerV>
        <PartContainerV>
          <MyStudyRooms />
        </PartContainerV>
      </MainWrapper>
    </>
  );
}

// 게시글 섹션(미완성, 향후 게시판 컴포넌트 재활용 예정)
// 완성가능?
function SecondSectionMain() {
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
          {/* <DailyList userCalendars={userData.userCalendars} /> */}
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
}

export default MainPage;
