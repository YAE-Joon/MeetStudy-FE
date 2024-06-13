"use client";
import { useState } from "react";
import Image from "next/image";

import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";

import { StudyRoomTableData } from "@/types/StudyRoom";

import { ImageWrapper } from "@/component/ImageConainer";
import { StudyRoom } from "@/types/StudyRoom";
import { Description } from "@/component/styled-components/TextBoxes";

import titleImg from "../../../../public/images/1. landing-01.png";
import dt from "@/lib/designToken/designTokens";
import { TableComponent } from "@/app/studyrooms/[id]/tables";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export default function Page({
  params,
}: {
  params: { id: number; slug: string };
}) {
  console.log("[id] 메인 페이지 컴포넌트입니다.");
  const roomId = params.id;
  // fetch
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {}
  );

  const currentMemberNum = studyRoomData?.userStudyRooms?.length;

  // category가 string이 아닌 경우 문자열로 변환
  const category = studyRoomData?.category
    ? `${studyRoomData.category.name} | ${studyRoomData.category.description}`
    : "카테고리가 기입되지 않았습니다.";

  const propData: StudyRoomTableData = {
    category: category,
    description: studyRoomData?.description ?? "한줄설명이 없습니다.",
    memberNum: currentMemberNum ?? 0,
  };

  return !studyRoomData ? (
    <div>목록 로딩중</div>
  ) : (
    <>
      <ImageWrapper position="relative" width="500px" height="500px">
        <Image
          src={titleImg}
          alt="컴퓨터로 공부하는 이미지"
          fill={true}
          sizes={`(max-width: ${mobileWidth}) 50vw, (max-width: 1200px) 50vw, 33vw`}
          placeholder="blur"
          blurDataURL={"../../../../public/images/1. landing-01.png"}
        />
        <div style={{ backgroundColor: "yellow" }}>테스트 </div>
      </ImageWrapper>
      <div style={{ height: "100%" }}>
        {/* <Description
          content={studyRoomData?.description}
          color={tokens.colors.simple.blackbasic}
        />
        <Description
          content={`현재 인원: ${currentMemberNum}`}
          color={tokens.colors.simple.blackbasic}
        /> */}
        {propData ? <TableComponent data={propData} /> : <div>출력안됨</div>}
      </div>
    </>
  );
}
