"use client";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import { StudyRoom } from "@/types/StudyRoom";

import dt from "@/lib/designToken/designTokens";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";

import { DailyList } from "@/component/mainPage/mainClinentComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { MainSkleton } from "@/component/mainPage/mainStyledComponents";

import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { StudyRoomCard } from "@/component/styled-components/Card";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { StyledStudyRoomsPack } from "@/component/mainPage/mainStyledComponents";
const {
  InnerContainer,

  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
} = StyledStudyRoomIndex;

const { MyStudyRoomsContainer } = StyledStudyRoomsPack;

const tokens = dt.DesignTokenVarNames;

const MyStudyRooms = () => {
  const userEmail = "hayeong@elice.com"; // 인증 최종구현후 수정
  console.log("[myStudyrooms] 호출합니다: 현재 user eamil:", userEmail);

  const [myStudyRoomsData, error, isLoading] = useFetch<StudyRoom[]>(
    //apiPaths.mypage.info,
    apiPaths.studyrooms.byUser(userEmail),
    {},
    false,
    false
  );

  if (isLoading) {
    return <MainSkleton />;
  }

  return (
    <>
      <Title
        $htype={3}
        $fontSize={tokens.fontSize.web.medium}
        $color={tokens.colors.simple.blackbasic}
      >
        내가 참여중인 스터디들
      </Title>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {myStudyRoomsData?.length === 0 ? (
          <MyStudyRoomsContainer>
            {myStudyRoomsData.map((studyRoom, idx) => (
              <StudyRoomCard
                key={studyRoom.id}
                item={studyRoom}
                root={"main"}
              />
            ))}
          </MyStudyRoomsContainer>
        ) : (
          <div>참가한 스터디룸 정보가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default MyStudyRooms;
