"use client";
import React, { RefObject } from "react";

import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import { StudyRoom } from "@/types/StudyRoom";

import dt from "@/lib/designToken/designTokens";

import { Container } from "@/component/styled-components/Container";
import { Title } from "@/component/styled-components/TextBoxes";
import { MovingButton } from "@/component/styled-components/Button/Buttons";
import { GridContainerMini } from "@/component/styled-components/Container";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import Loading from "@/component/Loading/Loading";
import { StudyRoomCard } from "@/component/StudyRoomCard";
import { StyledButtonLink } from "@/component/styled-components/Button/buttonsComponents";

export const tokens = dt.DesignTokenVarNames;
export const mobileWidth = dt.DesignTokenExcept.media.mobile;

export interface LandingProps {
  ref: RefObject<HTMLDivElement>;
  mover: () => void;
}

// 스터디룸 섹션
export const ForthSectionLanding = React.forwardRef<
  HTMLDivElement,
  LandingProps
>(({ mover }, ref) => {
  const [studyRoomsData, error, loading] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {}
  );

  const totalStudyRooms =
    studyRoomsData?.map((studyRoom: StudyRoom) => {
      const currMembers = studyRoom.userStudyRooms?.length;

      return { ...studyRoom, currMembers };
    }) || [];

  const currStudyRoomsNum = totalStudyRooms.length || 10;
  const studyRooms = totalStudyRooms.slice(0, 5);

  return (
    <Container
      $bgColor={tokens.colors.simple.whitebg}
      $padding={"2rem 0 2rem 0"}
      $gap={"3px"}
      $height={"100vh"}
      ref={ref}
    >
      <FlexBoxV type={"center"} $justifyContent={"center"}>
        {studyRooms.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <Title
              $htype={2}
              $color={tokens.colors.simple.blackbasic}
            >{`지금 ${currStudyRoomsNum}개의 스터디룸이 함께하고 있어요`}</Title>

            <GridContainerMini>
              {studyRooms.map((item, idx) => (
                <StudyRoomCard key={item.id} item={item} />
              ))}
            </GridContainerMini>
          </>
        )}
        <StyledButtonLink href={"/studyrooms"}>지금 합류하기</StyledButtonLink>
      </FlexBoxV>
      <MovingButton onClick={mover} $arrow={"up"} type={"primary"} />
    </Container>
  );
});
