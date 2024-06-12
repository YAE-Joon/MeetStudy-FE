"use client";

import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import { StudyRoom } from "@/types/StudyRoom";
import { CategoriyOptions } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import { Title } from "@/component/styled-components/TextBoxes";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { StudyRoomCard } from "@/component/StudyRoomCard";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import Loading from "@/component/Loading/Loading";
const tokens = dt.DesignTokenVarNames;

const {
  InnerContainer,
  SearchBarWarpper,
  SearchBarWarpperH,
  SearchResultContainer,
} = StyledStudyRoomIndex;

const StudyRoomPage = ({ categories }: { categories: CategoriyOptions[] }) => {
  console.log("[studyrooms] 가 랜더링되었습니다. categories? ", categories);

  const [studyRooms, error] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {}
  );

  if (!studyRooms) {
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
        <SearchResultContainer>
          {studyRooms.map((studyRoom, idx) => (
            <StudyRoomCard key={studyRoom.id} item={studyRoom} />
          ))}
        </SearchResultContainer>
      </FlexBoxV>
    </InnerContainer>
  );
};

export default StudyRoomPage;
