"use client";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import { StudyRoom } from "@/types/StudyRoom";
import { CategoriyOptions } from "@/lib/types";

import useFetchUserInfo from "@/hooks/useGetUserInfo";
import dt from "@/lib/designToken/designTokens";
import { Title } from "@/component/styled-components/TextBoxes";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { StudyRoomCard } from "@/component/StudyRoomCard";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import Loading from "@/component/Loading/Loading";
import {
  GridContainerFull,
  FlexContainerFull,
} from "@/component/styled-components/Container";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { getUserFromToken } from "@/util/getUserFromToken";
import getTokenByClient from "@/util/getTokenByClient";

const { Announcement } = ChatStyled;
const tokens = dt.DesignTokenVarNames;

const {
  InnerContainer,
  SearchBarWarpper,
  SearchBarWarpperH,
  SearchResultContainer,
} = StyledStudyRoomIndex;

const StudyRoomPage = ({ categories }: { categories: CategoriyOptions[] }) => {
  console.log("[studyrooms] 가 랜더링되었습니다.");

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

  return (
    <InnerContainer>
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
          <PrimaryButton content={"스터디룸 생성"} href={"studyrooms/new"} />
        </SearchBarWarpperH>
        <FlexContainerFull>
          <GridContainerFull>
            {visibleRooms.map((studyRoom, idx) => (
              <StudyRoomCard
                key={studyRoom.id}
                item={studyRoom}
                mail={myEmail}
              />
            ))}
          </GridContainerFull>
        </FlexContainerFull>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0 1rem 0",
            width: "100%",
            paddingBottom: "1rem",
            backgroundColor: "transparent",
          }}
        >
          {index < studyRooms.length ? (
            <PrimaryButton onClick={loadMoreRooms} content={"더보기"} />
          ) : (
            <Announcement>
              <strong>마지막 목록입니다.</strong>
              <p>더 이상 불러올 스터디룸이 없습니다.</p>
            </Announcement>
          )}
        </div>
      </FlexBoxV>
    </InnerContainer>
  );
};

export default StudyRoomPage;
