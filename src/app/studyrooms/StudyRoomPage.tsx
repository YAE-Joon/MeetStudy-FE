"use client";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { CategoriyOptions } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StudyRoomCard } from "@/component/styled-components/Card";

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
  const [studyRooms, error] = useFetch("/api/studyrooms", {}, false, false);

  const dummy_list_sect3 = [
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "개발",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
    {
      category: "공무원",
      desc: "스터디룸 소개",
      profilePic: "👩‍💻",
      author: "스터디룸 이름",
    },
  ];

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
          {dummy_list_sect3.map((item, idx) => (
            <StudyRoomCard
              key={idx}
              item={{
                emoji: item.profilePic,
                comment: item.desc,
                author: item.author,
              }}
            />
          ))}
        </SearchResultContainer>
      </FlexBoxV>
    </InnerContainer>
  );
};

export default SearchPageContainer;
