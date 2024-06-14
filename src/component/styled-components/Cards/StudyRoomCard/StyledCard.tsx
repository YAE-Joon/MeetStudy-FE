"use client";
import Link from "next/link";

import styled, { keyframes } from "styled-components";
import { StyledProps } from "@/component/styled-components/styledProps";
import dt from "@/lib/designToken/designTokens";

const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

//// studyrooms 쪽 카드용 ////
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
interface CardWrapperProps {
  $index: number;
}

const StyledCardWrapper = styled.li<CardWrapperProps>`
  list-style: none;
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
  ${({ $index }) => `animation-delay: ${$index * 0.1}s;`}
`;

const StyledLinkContainer = styled(Link)<StyledProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  //justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;

  border-radius: 0.5rem;

  &:hover {
    background-color: var(${tokens.colors.simple.tertiarygray});
  }

  border: 3px solid #52c233;
  background-color: var(${tokens.colors.simple.whitebg});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;

    flex: 1 1 100%; // 1 line 1 card
  }
`;
const StyledLiWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  //justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;

  border-radius: 0.5rem;

  &:hover {
    background-color: var(${tokens.colors.simple.tertiarygray});
  }

  border: 3px solid #52c233;
  background-color: var(${tokens.colors.simple.whitebg});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;

    flex: 1 1 100%; // 1 line 1 card
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  padding-bottom: 1rem;
  background-color: #52c233;

  height: 30%;
  width: 100%;
`;

const CardTitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.75rem;
`;

const CardSubtitle = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: whitesmoke;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  height: 50%;
  font-size: 16px;
  flex-direction: column;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 20%;
`;

const MembersInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserIcon = styled.span`
  color: gray;
`;
const MembersCount = styled.span`
  font-size: 1.1rem;
  font-weight: 500;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
`;

const ParticipationStatus = styled.div`
  border-radius: 9999px;
  background-color: #d1fae5;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #065f46;
`;

const PackedStyledCards = {
  StyledCardWrapper,
  StyledLinkContainer,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardDescription,
  CardFooter,
  MembersInfo,
  MembersCount,
  ParticipationStatus,
  UserIcon,
  StyledLiWrapper,
};

export default PackedStyledCards;
