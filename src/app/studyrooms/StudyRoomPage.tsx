"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useFetch from "@/hooks/useFetch";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import { apiPaths } from "@/config/api";

import { StudyRoom } from "@/types/StudyRoom";

import dt from "@/lib/designToken/designTokens";
import { Title } from "@/component/styled-components/TextBoxes";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { StudyRoomCard } from "@/component/styled-components/Cards/StudyRoomCard";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import Loading from "@/component/Loading/Loading";
import { GridContainerFull } from "@/component/styled-components/Container";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { getUserFromToken } from "@/util/getUserFromToken";
import getTokenByClient from "@/util/getTokenByClient";

import PackedStyledCards from "@/component/styled-components/Cards/StudyRoomCard/StyledCard";
const { StyledCardWrapper } = PackedStyledCards;

const { Announcement } = ChatStyled;
const tokens = dt.DesignTokenVarNames;

const {
  InnerContainer,

  SearchBarWarpperH,
} = StyledStudyRoomIndex;

const StudyRoomPage = ({}) => {
  const [isRedirecting, setIsRedirecting] = useState(false); //관리자 리다이렉트용
  console.log("[studyrooms] 가 랜더링되었습니다.");
  const router = useRouter();

  useEffect(() => {
    const token = getTokenByClient();
    const userInfo = getUserFromToken(token);
    if (userInfo && userInfo?.auth === "ADMIN") {
      setIsRedirecting(true);
      alert("관리자 페이지로 이동합니다.");
      router.push("/admin");
    }
  }, []);

  // 참가중 태그를 위해 유저 정보를 불러옴

  const [myEmail, mailError, loading] = useFetchUserInfo<string>("email");
  // 스터디룸 목록을 불러옵니다.
  const [studyRooms, error] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {}
  );

  console.log("[studyrooms] myEmail?", myEmail);

  const [visibleRooms, setVisibleRooms] = useState<StudyRoom[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [index, setIndex] = useState(0);
  const increment = 6;

  useEffect(() => {
    if (studyRooms) {
      setVisibleRooms(studyRooms.slice(0, increment));
      setIndex(increment);
    }
  }, [studyRooms]);

  const loadMoreRooms = () => {
    const newIndex = index + increment;
    if (!studyRooms || studyRooms.length === 0) {
      return;
    }
    const newVisibleRooms = studyRooms.slice(0, newIndex);
    setVisibleRooms(newVisibleRooms);
    setIndex(newIndex);
  };

  if (!studyRooms || !myEmail) {
    return <Loading />;
  }

  if (error) {
    return <div>에러</div>;
  }

  return (
    <InnerContainer>
      {!isRedirecting && (
        <>
          <FlexBoxV>
            <SearchBarWarpperH>
              <Title
                $htype={3}
                $align={"left"}
                $color={tokens.colors.simple.blackbasic}
                $fontSize={tokens.fontSize.web.large}
              >
                스터디룸 목록
              </Title>
              <span
                style={{
                  width: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                }}
              >
                <PrimaryButton
                  content={"스터디룸 생성"}
                  href={"studyrooms/new"}
                />
              </span>
            </SearchBarWarpperH>
            {/* <FlexContainerFull> */}
            <GridContainerFull>
              {visibleRooms.map((studyRoom, idx) => (
                <StyledCardWrapper key={studyRoom.id} $index={idx}>
                  <StudyRoomCard item={studyRoom} mail={myEmail} />
                </StyledCardWrapper>
              ))}
            </GridContainerFull>
            {/* </FlexContainerFull> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 0 1rem 0",
                width: "100%",
                paddingBottom: "1rem",
                backgroundColor: "transparent",
                //backgroundColor: "yellow",
              }}
            >
              {index < studyRooms.length ? (
                <span
                  style={{
                    width: "80px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "1rem",
                  }}
                >
                  <PrimaryButton onClick={loadMoreRooms} content={"더보기"} />
                </span>
              ) : (
                <Announcement>
                  <strong>마지막 목록입니다.</strong>
                  <p>더 이상 불러올 스터디룸이 없습니다.</p>
                </Announcement>
              )}
            </div>
          </FlexBoxV>
        </>
      )}
    </InnerContainer>
  );
};

export default StudyRoomPage;
