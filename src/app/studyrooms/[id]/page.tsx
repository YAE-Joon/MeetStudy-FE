"use client";
import Image from "next/image";
import { ImageWrapper } from "@/component/ImageConainer";
import titleImg from "../../../../public/images/1. landing-01.png";
import dt from "@/lib/designToken/designTokens";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";

const { SearchResultContainer } = StyledStudyRoomIndex;

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export default function Page({
  params,
}: {
  params: { id: number; slug: string };
}) {
  const roomId = params.id;

  return (
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
      </ImageWrapper>
      <SearchResultContainer>
        <div>홈 화면에 뭘 넣지?</div>
      </SearchResultContainer>
    </>
  );
}
