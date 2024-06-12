"use client";

import { useParams } from "next/navigation";

import { StudyRoom } from "@/types/StudyRoom";
import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";

import { OuterContainer } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import MovingMenu from "@/component/styled-components/MovingSideBars/MovingMenu";
import Loading from "@/component/Loading/Loading";

export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  //console.log("[id ]스터디룸의 레이아웃입니다.");
  const userEmail = "hayeong@elice.com"; //임시
  const params = useParams();
  const roomId = Number(params.id);
  //console.log("roomId", roomId);

  // 입장한 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {}
  );

  const userAccessControl = studyRoomData?.userStudyRooms?.map((member) => {
    const { id, joinDate, permission, user } = member;
    const memberInfo = {
      id,
      joinDate,
      permission,
      email: user.email,
    };
    return {
      isUserInStudyRooms: memberInfo.email === userEmail,
      isUserOwner: memberInfo.permission === "OWNER",
      //isUserOwner: true,
    };
  });

  const isMember =
    userAccessControl?.some((access) => access.isUserInStudyRooms) || false;
  const isOwner =
    userAccessControl?.some((access) => access.isUserOwner) || false;

  const userAccecssControl = {
    isAdmin: false,
    isOwner,
    isMember,
  };

  const studyRoomMenu = [
    { label: "홈", link: `/studyrooms/${roomId}` },
    { label: "채팅", link: `/studyrooms/${roomId}/chatRoom` },
    { label: "스터디룸_캘린더", link: `/studyrooms/${roomId}/calendar` },
    { label: "참가자_리스트", link: `/studyrooms/${roomId}/members` },
    { label: "게시판", link: `/studyrooms/${roomId}/board` },
  ];
  if (isOwner) {
    studyRoomMenu.push({
      label: "스터디룸 관리",
      link: `/studyrooms/${roomId}/admin`,
    });
  }

  return !studyRoomData ? (
    <Loading />
  ) : (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu
          menu={studyRoomMenu}
          title={studyRoomData.title}
          userAccecssControl={userAccecssControl}
        />
        <FlexBoxV $padding={"0.5rem 0 1rem 0.5rem"} $width={"100%"}>
          {children}
        </FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
