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

const tokens = dt.DesignTokenVarNames;

const { SectionContainerH, SectionContainerV, PartContainerV, PartContainerH } =
  MainStyledPack;

const MainPage = () => {
  //일정과 내가 참가한 스터디룸 목록
  //내가 스크렙한 게시글들 같은 거
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
      <Wrapper>
        <SectionContainerH>
          <PartContainerV>
            <MyCalendar />
          </PartContainerV>
          <PartContainerV>
            <MyStudyRooms />
          </PartContainerV>
        </SectionContainerH>
      </Wrapper>
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
