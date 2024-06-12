"use client";

import { useParams } from "next/navigation";
import dt from "@/lib/designToken/designTokens";
import { OuterContainer } from "@/component/styled-components/Container";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import MovingMenu from "@/component/styled-components/MovingSideBars/MovingMenu";

const tokens = dt.DesignTokenVarNames;
export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  //const roomId = params.id;
  //const roomId = 1;

  // 카테고리와 채팅방은 나중에.
  const studyRoomMenu = [
    { label: "회원 관리", link: `/admin` },
    // { label: "카테고리 관리", link: `/admin/category` },
    { label: "게시판 관리", link: `/admin/boards` },
    { label: "스터디룸 관리", link: `/admin/studyRooms` },
    //{ label: "채팅방 관리", link: `/admin/chatRooms` },
  ];
  interface AccessControl {
    isAdmin: boolean;
    isMember: boolean;
    isOwner: boolean;
  }
  const userAccessControl: AccessControl = {
    isAdmin: true,
    isMember: true,
    isOwner: true,
  };
  return (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu
          menu={studyRoomMenu}
          roomId={0}
          title={"관리자 페이지"}
          userAccecssControl={userAccessControl}
          mainBgColor={tokens.colors.simple.blackbasic}
          txtColor={tokens.colors.simple.whitebg}
        />
        <FlexBoxV>{children}</FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
