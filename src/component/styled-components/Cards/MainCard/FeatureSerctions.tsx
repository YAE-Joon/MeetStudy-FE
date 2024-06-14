"use client";
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  SectionSection,
  SectionContainer,
  SectionGrid,
  SectionCard,
  SectionCardHeader,
  SectionTitle,
  SectionDescription,
} from "./StyledCardComponent";

const slideShow = keyframes`
  0% { transform: translateX(0); }
  45% { transform: translateX(0); }
  50% { transform: translateX(-50%); }
  95% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  width: 200%;
  animation: ${slideShow} 10s infinite;
`;

const SectionData = {
  features: [
    {
      name: "실시간 채팅",
      description: "채팅을 통해 더욱 생생하게 소통합니다.",
    },
    {
      name: "스터디룸",
      description: "카테고리 별로 스터디룸을 검색하고 생성할 수 있습니다.",
    },
    {
      name: "캘린더",
      description: "개인 및 스터디별 일정을 관리할 수 있습니다.",
    },
    {
      name: "개인 프로필 관리",
      description:
        "마이페이지에서 프로필 설정, 스터디룸 기록 조회, 닉네임 설정 등 다양한 기능을 제공합니다.",
    },
    {
      name: "철저한 인증",
      description: "이메일 인증 방식으로 안전하게 회원가입할 수 있습니다.",
    },
    {
      name: "자유게시판",
      description:
        "다양한 주제로 소통할 수 있는 자유게시판을 통해 정보를 공유하고, 질문과 답변을 나눌 수 있습니다.",
    },
    {
      name: "게시판, 게시글 스크랩",
      description: "유용한 정보를 스크랩하여 언제든지 쉽게 접근할 수 있습니다.",
    },
    {
      name: "관리자 도구",
      description:
        "관리자 기능을 통해 회원, 채팅방, 게시판을 효율적으로 관리하고 모니터링합니다.",
    },
  ],
};

const FeaturesSection = () => {
  return (
    <SectionSection>
      <SectionContainer>
        <SliderContainer>
          <SlidesWrapper>
            {[0, 1].map((slideIndex) => (
              <SectionGrid key={slideIndex}>
                {SectionData.features
                  .slice(slideIndex * 4, slideIndex * 4 + 4)
                  .map((feature, index) => (
                    <SectionCard key={index}>
                      <SectionCardHeader>
                        <SectionTitle>{feature.name}</SectionTitle>
                      </SectionCardHeader>
                      <SectionDescription>
                        {feature.description}
                      </SectionDescription>
                    </SectionCard>
                  ))}
              </SectionGrid>
            ))}
          </SlidesWrapper>
        </SliderContainer>
      </SectionContainer>
    </SectionSection>
  );
};

export default FeaturesSection;
