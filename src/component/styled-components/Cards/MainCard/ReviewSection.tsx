"use client";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  SectionSection,
  SectionContainer,
  SectionReviewCard,
  SectionReviewCardHeader,
  SectionProfilePic,
  SectionReviewTitle,
  SectionReviewCategory,
  SectionReviewDescription,
  SectionReviewAuthor,
  SectionReviewTitleContainer,
} from "./StyledCardComponent";

const fadeinout = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const FadeInOut = styled.div`
  /* animation: ${fadeinout} 3s ease-in-out infinite; */
`;
interface SliderWrapperProps {
  totalSlides: number;
}
const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
`;

const SliderWrapper = styled.div`
  display: flex;
  animation: ${slide} 20s linear infinite;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  max-width: 25%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  padding: 0 10px;
`;

const EqualHeightCard = styled(SectionReviewCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
`;
const reviewData = [
  {
    category: "개발",
    desc: "모각코하기 딱 좋아요^^",
    profilePic: "👩‍💻",
    author: "클라우드 레이서",
  },
  {
    category: "공무원",
    desc: "실시간으로 채팅하기 좋아요",
    profilePic: "👩‍💻",
    author: "합격맨",
  },
  {
    category: "어학",
    desc: "스터디룸에서 스페인어 공부중입니다. 넘 좋아요!",
    profilePic: "🧑‍🎓",
    author: "언어천재",
  },
  {
    category: "자격증",
    desc: "캘린더로 일정관리 하니까 합격이 눈앞이네요!",
    profilePic: "📚",
    author: "취득왕",
  },
  {
    category: "취업",
    desc: "자소서 첨삭받으러 자주 와요~",
    profilePic: "🧑‍💼",
    author: "취준생",
  },
  {
    category: "취미",
    desc: "기타 배우기 모임 만들었어요~",
    profilePic: "🎸",
    author: "기타리스트",
  },
  {
    category: "운동",
    desc: "홈트 스터디룸 최고에요!",
    profilePic: "💪",
    author: "홈트챔피언",
  },
  {
    category: "대학생활",
    desc: "자유게시판에서 동아리 정보 찾았어요~",
    profilePic: "🎓",
    author: "캠퍼스라이프",
  },
  {
    category: "여행",
    desc: "여행 스터디룸에서 정보 공유 많이 해요~",
    profilePic: "🌍",
    author: "세계여행자",
  },
  {
    category: "독서",
    desc: "책 읽고 토론하는 스터디룸 좋아요!",
    profilePic: "📖",
    author: "독서왕",
  },
];

const ReviewSection = () => {
  return (
    <SectionSection>
      <SectionContainer>
        <SliderContainer>
          <SliderWrapper>
            {reviewData.map((review, index) => (
              <Slide key={index}>
                <FadeInOut>
                  <EqualHeightCard>
                    <SectionReviewCardHeader>
                      <SectionProfilePic>{review.profilePic}</SectionProfilePic>
                      <SectionReviewTitleContainer>
                        <SectionReviewTitle>{review.desc}</SectionReviewTitle>
                        <SectionReviewCategory>
                          {review.category}
                        </SectionReviewCategory>
                      </SectionReviewTitleContainer>
                    </SectionReviewCardHeader>
                    <SectionReviewDescription>
                      {review.desc}
                    </SectionReviewDescription>
                    <SectionReviewAuthor>{review.author}</SectionReviewAuthor>
                  </EqualHeightCard>
                </FadeInOut>
              </Slide>
            ))}
          </SliderWrapper>
        </SliderContainer>
      </SectionContainer>
    </SectionSection>
  );
};

export default ReviewSection;
