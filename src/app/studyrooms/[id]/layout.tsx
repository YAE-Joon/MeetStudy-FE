"use client";

import { useParams } from "next/navigation";
import { OuterContainer } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import MovingMenu from "@/component/styled-components/MovingMenu";

export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const roomId = params.id?.toString();
  //console.log("roomId", roomId);
  const studyRoomMenu = [
    { label: "홈", link: `/studyrooms/${roomId}` },
    { label: "채팅", link: `/studyrooms/${roomId}/chatRoom` },
    { label: "스터디룸_캘린더", link: `/studyrooms/${roomId}/calendar` },
    { label: "참가자_리스트", link: `/studyrooms/${roomId}/members` },
  ];

  return (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu
          menu={studyRoomMenu}
          roomId={roomId}
          title={"스터디룸 이름 넣기"}
        />

        <FlexBoxV $padding={"0 1rem 0 0.5rem"}>{children}</FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
