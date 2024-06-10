"use client";
// 스터디룸 관리자 페이지
import useFetch from "@/hooks/useFetch";
import { StudyRoom } from "@/types/StudyRoom";

import dt from "@/lib/designToken/designTokens";
import { apiPaths } from "@/config/api";
import { getRoomId } from "@/app/studyrooms/studyroomSub";

import { Container } from "@/component/styled-components/Container";
import { Title } from "@/component/styled-components/TextBoxes";
import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import StyledAccounts from "@/app/myAccount/myAccountClientComponents";
import ManageStudyRoom from "@/app/studyrooms/[id]/admin/EditSection";

const { PartContainerV } = StyledAccounts;

const tokens = dt.DesignTokenVarNames;
// studyrooms/{roomId}/chatRoom
// 특정 스터디룸에 속한 채팅방 리스트를 불러옵니다.
const AdminStudyRoom = () => {
  const roomId = getRoomId();

  // 해당 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {},
    false,
    false
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!studyRoomData) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <Container $width={"100%"} $minWidth={"600px"}>
        {/* <FlexBoxV $justifyContent={"center"}> */}
        <TitleWrapper>
          <Title
            $htype={2}
            $align={"left"}
            $color={tokens.colors.simple.blackbasic}
            $fontSize={tokens.fontSize.web.large}
          >
            스터디룸 관리
          </Title>
        </TitleWrapper>
        <PartContainerV>
          <ManageStudyRoom initialData={studyRoomData} roomId={roomId} />
        </PartContainerV>
        {/* </FlexBoxV> */}
      </Container>
    </>
  );
};

export default AdminStudyRoom;
