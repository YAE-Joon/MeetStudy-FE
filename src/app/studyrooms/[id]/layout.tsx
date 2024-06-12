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

  useEffect(() => {
    const userAccessControl = studyRoomData?.userStudyRooms?.map((member) => {
      const { id, joinDate, permission, user } = member;
      const memberInfo = {
        id,
        joinDate,
        permission,
        email: user.email,
      };
      return {
        isUserInStudyRooms: memberInfo.email === myEmail,
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

    console.log(
      "[🙆 개별 스터디룸에 들어왔습니다. 참가 자격을 확인합니다\n Admin?:",
      userAccecssControl.isAdmin,
      "member?",
      userAccecssControl.isMember,
      "owner?",
      userAccecssControl.isOwner
    );

    setUserAccControl(userAccecssControl);

    if (isOwner) {
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
        <FlexBoxV $padding={"0.5rem 0 1rem 0.2rem"} $width={"80%"}>
          {children}
        </FlexBoxV>
      </InnerContainer>
    </OuterContainer>
  );
}
