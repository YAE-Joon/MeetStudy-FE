"use client";
import { StudyRoom } from "@/lib/types";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { CategoriyOptions } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StudyRoomCard } from "@/component/styled-components/Card";

import { apiPaths } from "@/config/api";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import MovingCategories from "@/component/styled-components/MovingCategories";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [studyRooms, error] = useFetch<StudyRoom[]>(
    apiPaths.studyrooms.all,
    {},
    false,
    false
  );

  if (!studyRooms) {
    return <div>로딩 중</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <InnerContainer>
      <MovingCategories categories={categories} />

      <FlexBoxV>
        <SearchBarWarpper>
          <Title
            $htype={3}
            $align={"left"}
            $color={tokens.colors.simple.blackbasic}
            $fontSize={tokens.fontSize.web.medium}
          >
            스터디룸 찾기
          </Title>

          <InputContainer value={searchQuery} onChange={handleInputChange} />
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
