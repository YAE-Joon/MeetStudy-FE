"use client";
import Link from "next/link";

import styled, { keyframes } from "styled-components";
import {
  StyledProps,
  StyledComponentsProps,
} from "@/component/styled-components/styledProps";
import {
  Span,
  Description,
  Title,
} from "@/component/styled-components/TextBoxes";
import dt from "@/lib/designToken/designTokens";

const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

//// main 쪽 카드용 ////
interface Styled_li_card_props extends StyledProps {
  $shadow?: "primary" | null;
  $effectType?: "hoverEffect" | null;
}
//styled_li
const StyledLiContainer = styled.li<StyledProps>`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  //for same height
  align-items: center;
  // box-sizing: border-box;
  padding: 1rem;

  // flex: 1 1 calc(33.333% - 1rem); // 1 line 3 card
  gap: 0.5rem;

  &:hover {
    background-color: var(${tokens.colors.simple.tertiarygray});
  }

  border: 3px solid var(${tokens.colors.simple.tertiarygray});
  background-color: var(${tokens.colors.simple.whitebg});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;

    flex: 1 1 100%; // 1 line 1 card
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

const CardUpper_ul = styled.ul<StyledProps>`
  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  //for same height
  align-items: center;
  // box-sizing: border-box;

  gap: 0.5rem;
`;

interface ItemProps {
  image?: string;
  emoji?: string;
  author?: string;
  content?: string;
  comment?: string;
}

interface LiCardProps extends StyledComponentsProps {
  item: ItemProps;
  key?: string | number;
  styles?: Styled_li_card_props;
  link?: string;
}

export const Li_card: React.FC<LiCardProps> = ({ item, styles = {} }) => {
  return (
    <StyledLiContainer>
      <CardContent>
        <CardUpper_ul>
          {(item.image || item.emoji) && (
            <figure>
              {item.image && <img src={item.image} alt="Image description" />}
              {item.emoji && <figcaption>{item.emoji}</figcaption>}
            </figure>
          )}

          {item.author && <Span content={item.author} isBold={true} />}
        </CardUpper_ul>
        {item.comment && <Span content={item.comment} />}
        {item.content && (
          <Description
            content={item.content}
            color={tokens.colors.simple.grayfortext}
          />
        )}
      </CardContent>
    </StyledLiContainer>
  );
};

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
  //flex-grow: 1;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1rem;



  gap: 2rem; */

  display: flex;
  justify-content: center;
  width: 80%;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  height: 50%;
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

export const JoinTag = styled.div`
  display: inline-block;
  padding: 4px 8px 4px 8px;
  border: 1px solid green;
  color: green;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;

  width: 60px;
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
