"use client";
import { StudyRoom } from "@/types/StudyRoom";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { CategoriyOptions } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StudyRoomCard } from "@/component/styled-components/Card";

import { apiPaths } from "@/config/api";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import MovingCategories from "@/component/styled-components/MovingSideBars/MovingCategories";
const tokens = dt.DesignTokenVarNames;

const {
  InnerContainer,

  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
} = StyledStudyRoomIndex;
const SearchPageContainer = ({
  categories,
}: {
  categories: CategoriyOptions[];
}) => {
  console.log("[studyrooms] 가 랜더링되었습니다. categories? ", categories);

  const [searchQuery, setSearchQuery] = useState("");
  // categiry 의 id 로 카테고리별 스터디룸을 가져와야 함
  const [studyRooms, error] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {},
    false,
    false
  );

  if (!studyRooms) {
    return <div>로딩 중 - studyrooms loader</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <InnerContainer>
      <FlexBoxV>
        <SearchBarWarpper>
          <Title
            $htype={3}
            $align={"left"}
            $color={tokens.colors.simple.blackbasic}
            $fontSize={tokens.fontSize.web.large}
          >
            스터디룸 목록
          </Title>
        </SearchBarWarpper>
        <SearchResultContainer>
          {studyRooms.map((studyRoom, idx) => (
            <StudyRoomCard key={studyRoom.id} item={studyRoom} />
          ))}
        </SearchResultContainer>
      </FlexBoxV>
    </InnerContainer>
  );
};

export default SearchPageContainer;
