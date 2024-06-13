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
import ManageStudyRoom from "@/app/studyrooms/[id]/admin/ManageStudyRoom";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
const { SearchBarWarpperH } = StyledStudyRoomIndex;
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
const { PartContainerV } = StyledAccounts;

const tokens = dt.DesignTokenVarNames;
// studyrooms/{roomId}/chatRoom
// 특정 스터디룸에 속한 채팅방 리스트를 불러옵니다.
const AdminStudyRoom = () => {
  const roomId = getRoomId();

  // 해당 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {}
  );

  return (
    <>
      <SearchBarWarpperH>
        {/* <FlexBoxV $justifyContent={"center"}> */}

        <Title
          $htype={2}
          $align={"left"}
          $color={tokens.colors.simple.blackbasic}
          $fontSize={tokens.fontSize.web.large}
        >
          스터디룸 관리
        </Title>
      </SearchBarWarpperH>

      <FlexBoxV
        // $padding={"0.5rem 0.5rem 0 0"}
        $width={"100%"}
        $height={"70vh"}
      >
        {" "}
        <PartContainerV>
          {studyRoomData ? (
            <ManageStudyRoom initialData={studyRoomData} roomId={roomId} />
          ) : null}
        </PartContainerV>
      </FlexBoxV>
    </>
  );
};

export default AdminStudyRoom;
