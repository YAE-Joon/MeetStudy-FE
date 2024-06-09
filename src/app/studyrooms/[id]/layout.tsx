"use client";

import { useParams } from "next/navigation";

import { StudyRoom } from "@/lib/types";
import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";

import { StudyRoomDataProvider } from "@/context/StudyRoomDataContext";

import { OuterContainer } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import MovingMenu from "@/component/styled-components/MovingMenu";
import Loading from "@/component/Loading/Loading";

export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const roomId = Number(params.id);
  //console.log("roomId", roomId);

  // 입장한 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {},
    false,
    false
  );

  const studyRoomMenu = [
    { label: "홈", link: `/studyrooms/${roomId}` },
    { label: "채팅", link: `/studyrooms/${roomId}/chatRoom` },
    { label: "스터디룸_캘린더", link: `/studyrooms/${roomId}/calendar` },
    { label: "참가자_리스트", link: `/studyrooms/${roomId}/members` },
    { label: "게시판", link: `/studyrooms/${roomId}/board` },
  ];

  //  layout의 !studyroomData 의 로더가 더 laoder.tsx보다 우선한다?
  if (!studyRoomData) {
    return <Loading />;
  }

  //packing data

  const currentMembers = studyRoomData.userStudyRooms.length;
  const packedStudyRoomData = {
    ...studyRoomData,
    currentMembers,
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu
          menu={studyRoomMenu}
          roomId={roomId.toString()}
          title={studyRoomData.title}
        />
        <FlexBoxV $padding={"0 1rem 0 0.5rem"} $width={"100%"}>
          <StudyRoomDataProvider value={packedStudyRoomData}>
            {children}
          </StudyRoomDataProvider>
        </FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
