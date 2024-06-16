"use client";
import styled from "styled-components";
import { StyledProps } from "@/component/styled-components/styledProps";
import dt from "@/lib/designToken/designTokens";
import { Title, Description } from "@/component/styled-components/TextBoxes";
import { StudyRoomMember } from "@/types/StudyRoom";
import { getRandomEmoji } from "@/util/getEmoji";

export const mobileWidth = dt.DesignTokenExcept.media.mobile;
export const tokens = dt.DesignTokenVarNames;

export const StyledWrapper = styled.div<StyledProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 200px;
  max-height: 200px;
  border: 3px solid var(${tokens.colors.simple.tertiarygray});
  background-color: var(${tokens.colors.simple.whitebg});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(${tokens.colors.simple.tertiarygray});
  }

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
    flex: 1 1 100%;
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const JoinTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid green;
  color: green;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  width: 60px;
`;

// Styled Components for StudyRoomMemberCard
const StudyRoomMemberCard = styled.div`
  background-color: var(${tokens.colors.simple.whitebg});
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 10px;
  max-height: 400px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Emoji = styled.div`
  width: 100%;
  height: 192px;
  font-size: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(76, 170, 104, 0.7), transparent);
  padding: 16px;
`;
const Content = styled.div`
  padding: 16px;
`;

const Position = styled.p`
  color: gray;
  margin-bottom: 8px;
`;

// Card for StudyRoom's member
export const MemberCard = (data: StudyRoomMember) => {
  return (
    <StudyRoomMemberCard>
      <ImageContainer>
        <Emoji>{getRandomEmoji()}</Emoji>
        <GradientOverlay />
      </ImageContainer>
      <Title
        $htype={4}
        $fontSize={tokens.fontSize.web.medium}
        $color={tokens.colors.simple.primarydeeper}
      >
        {data.email}
      </Title>
      <Content>
        <Position>{data.permission}</Position>
        <Description content={data.joinDate} />
      </Content>
    </StudyRoomMemberCard>
  );
};
