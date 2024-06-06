"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { MdMenu } from "react-icons/md";
import dt from "@/lib/designToken/designTokens";

import { OuterContainer } from "@/component/styled-components/Container";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import MovingMenu from "@/component/styled-components/MovingMenu";

const tokens = dt.DesignTokenVarNames;

export default function StudyRoomdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  //const roomId = params.id;

  //const roomId = 1;

  const params = useParams();
  const roomId = params.id?.toString();
  console.log("roomId", roomId);

  const studyRoomMenu = [
    { label: "회원 관리", link: `/admin` },
    { label: "카테고리 관리", link: `/admin/category` },
    { label: "게시판 관리", link: `/admin/boards` },
    { label: "스터디룸 관리", link: `/admin/studyRooms` },
    { label: "채팅방 관리", link: `/admin/chatRooms` },
  ];
  return (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu menu={studyRoomMenu} roomId={roomId} title={"Admin Page"} />
        <FlexBoxV>{children}</FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
