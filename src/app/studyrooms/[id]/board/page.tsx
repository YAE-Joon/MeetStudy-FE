"use client";

import React, { useState, useEffect } from "react";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { Title } from "@/component/styled-components/TextBoxes";
import Board from "@/component/Board";

const {
  // InnerContainer,
  // CategoryNav,
  //StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  CategoryTitleWrapper,
} = StyledStudyRoomIndex;

import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;
const board = () => {
  const popularPosts = ["test", "test", "tes"];
  const test = [
    {
      id: 1,
      category: "2",
      nickname: "test",
      title: "test",
      content: "test",
      hit: 0,
      createdAt: "2024.06.06 09:15",
    },
    {
      id: 1,
      category: "2",
      nickname: "test",
      title: "test",
      content: "test",
      hit: 0,
      createdAt: "2024.06.06 09:15",
    },
  ];

  const testcategories = [
    {
      id: 0,
      name: "test",
      description: "test",
    },
    {
      id: 0,
      name: "test",
      description: "test",
    },
  ];
  return (
    <>
      <SearchBarWarpper>
        <Title
          htype={3}
          align={"left"}
          content={"게시판입니다"}
          color={tokens.colors.simple.blackbasic}
          fontSize={tokens.fontSize.web.medium}
        />
      </SearchBarWarpper>
      <div className="w-full">
        <Board
          title="정보공유 게시판"
          posts={test}
          popularPosts={popularPosts}
          categories={testcategories}
        />
      </div>
    </>
  );
};

export default board;
