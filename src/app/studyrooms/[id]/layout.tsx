"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import getTokenByClient from "@/util/getTokenByClient";
import { StudyRoom } from "@/types/StudyRoom";

import { OuterContainer } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { InnerContainer } from "@/app/studyrooms/[id]/StyledComponents";
import MovingMenu from "@/component/styled-components/MovingSideBars/MovingMenu";
import Loading from "@/component/Loading/Loading";
import { getUserInfoFromToken } from "@/util/getUserInfo";
import useFetchUserInfo from "@/hooks/useGetUserInfo";

export default function StudyRoomdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const roomId = Number(params.id);
  const initialValue = [
    { label: "홈", link: `/studyrooms/${roomId}` },
    { label: "채팅", link: `/studyrooms/${roomId}/chatRoom` },
    { label: "캘린더", link: `/studyrooms/${roomId}/calendar` },
    { label: "멤버란", link: `/studyrooms/${roomId}/members` },
    { label: "게시판", link: `/studyrooms/${roomId}/board` },
  ];

  const [studyRoomMenu, setStudyRoomMenu] = useState(initialValue);
  const [userAccessControl, setUserAccControl] = useState({
    isAdmin: false,
    isMember: false,
    isOwner: false,
  });

  // 입장한 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {}
  );

  // 유저 이메일을 불러옵니다.
  const [myEmail, setMyEmail] = useFetchUserInfo("email");

  // 스터디룸의 멤버리스트 중 중 나의 정보를 불러옵니다.
  // 동시에 권한을 확인합니다.
  useEffect(() => {
    let userRole = {
      isMember: false,
      isOwner: false,
      isAdmin: false,
    };

    // 입장과 동시에 어드민인지 확인
    if (myEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      userRole.isAdmin = true;
      console.log("관리자 계정으로 입장하였습니다.");
      setUserAccControl(userRole);
      return;
    }
    userRole.isAdmin = false;

    const myPermission =
      studyRoomData?.userStudyRooms?.find(
        (member) => member.user.email === myEmail
      )?.permission || false;
    userRole.isMember = myPermission ? true : false; //permission이 있다면 member가 맞음.
    userRole.isOwner = myPermission === "OWNER" ? true : false;

    console.log(
      "[🙆 개별 스터디룸에 들어왔습니다. 참가 자격을 확인합니다\n Admin?:",
      userRole.isAdmin,
      "member?",
      userRole.isMember,
      "owner?",
      userRole.isOwner
    );

    setUserAccControl(userRole);

    if (userRole.isOwner) {
      console.log("스터디룸 레이아웃 | 해당 스터디룸의 소유주입니다. ");
      setStudyRoomMenu((prev) => [
        ...prev,
        {
          label: "스터디룸 관리",
          link: `/studyrooms/${roomId}/admin`,
        },
      ]);
    }
  }, [studyRoomData, myEmail]);

  return !studyRoomData ? (
    <Loading />
  ) : (
    <OuterContainer>
      <InnerContainer>
        <MovingMenu
          menu={studyRoomMenu}
          title={studyRoomData.title}
          userAccecssControl={userAccessControl}
        />
        <FlexBoxV
          $padding={"0.5rem 0.5rem 0 0"}
          $width={"80%"}
          $justifyContent={"center"}
        >
          {children}
        </FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
