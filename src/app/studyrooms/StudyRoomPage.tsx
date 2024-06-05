"use client";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { TitleWrapper } from "@/component/styled-components/TextBoxes";
import { Title } from "@/component/styled-components/TextBoxes";
import { CategoriyOptions } from "@/lib/types";

import dt from "@/lib/designToken/designTokens";
import { ChangeEvent, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { StudyRoomCard } from "@/component/styled-components/Card";
import { MdMenu } from "react-icons/md";

const tokens = dt.DesignTokenVarNames;
const {
  InnerContainer,
  CategoryNav,
  StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  CategoryTitleWrapper,
} = StyledStudyRoomIndex;
const SearchPageContainer = ({
  categories,
}: {
  categories: CategoriyOptions[];
}) => {
  const [isopen, setIsopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [studyRooms, error] = useFetch("/api/studyrooms", true);

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
  ];

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <InnerContainer>
      <CategoryNav>
        <StudyRoomCategories isopen={isopen}>
          <CategoryTitleWrapper>
            <TitleWrapper>
              <Title
                htype={3}
                align={"left"}
                content={"카테고리"}
                color={tokens.colors.simple.blackbasic}
                fontSize={tokens.fontSize.web.medium}
              />
            </TitleWrapper>
            <HamburgerIcon onClick={toggleMenu}>
              <MdMenu />
            </HamburgerIcon>
          </CategoryTitleWrapper>
          {categories.map((category, idx) => {
            return (
              <li key={category.id} title={category.description}>
                {category.name}
              </li>
            );
          })}
        </StudyRoomCategories>
      </CategoryNav>
      <SearchResultSection>
        <SearchBarWarpper>
          <Title
            htype={3}
            align={"left"}
            content={"스터디룸 찾기"}
            color={tokens.colors.simple.blackbasic}
            fontSize={tokens.fontSize.web.medium}
          />

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
      </SearchResultSection>
    </InnerContainer>
  );
};

export default SearchPageContainer;
