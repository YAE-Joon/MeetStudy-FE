"use client";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";
import { useStudyRoomData } from "@/context/StudyRoomDataContext";
import Image from "next/image";
import { ImageWrapper } from "@/component/ImageConainer";
import titleImg from "../../../../public/images/1. landing-01.png";
import dt from "@/lib/designToken/designTokens";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { Description } from "@/component/styled-components/TextBoxes";
import { StudyRoom } from "@/types/StudyRoom";
import { useState } from "react";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export default function Page({
  params,
}: {
  params: { id: number; slug: string };
}) {
  console.log("[id] 메인 페이지 컴포넌트입니다.");
  const userId = 1; //임시

  const roomId = params.id;
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {},
    false,
    false
  );

  const currentMemberNum = studyRoomData?.userStudyRooms.length;

  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const handleModalClose = () => setIsModalOpen(false);

  const handleLogin = (e: React.FormEvent) => {
    //e.preventDefault();
    handleModalClose();
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
        <Description
          content={studyRoomData?.description}
          color={tokens.colors.simple.blackbasic}
        />
        <Description
          content={`현재 인원: ${currentMemberNum}`}
          color={tokens.colors.simple.blackbasic}
        />
      </div>
    </>
  );
}
