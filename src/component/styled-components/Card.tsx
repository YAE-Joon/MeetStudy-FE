"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { StudyRoom, StudyRoomMember } from "@/types/StudyRoom";
import { setDateStr, convertISOToYMD } from "@/util/dateUtils";
import { getRandomEmoji } from "@/util/getEmoji";

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

interface Styled_li_card_props extends StyledProps {
  $shadow?: "primary" | null;
  $effectType?: "hoverEffect" | null;
}

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

///////////// components /////////////////////

export const Li_card: React.FC<LiCardProps> = ({ item, styles = {} }) => {
  return (
    <Styled_li
      $effectType={styles.$effectType}
      $shadow={styles.$shadow}
      $bgColor={styles.$bgColor}
    >
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
    </Styled_li>
  );
};

///// cards for studyroom list
interface StudyRoomCardProps {
  item: StudyRoom;
  root?: string | null;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({ item, root }) => {
  let pathname;
  if (root === null) {
    pathname = usePathname();
  } else if ((root = "main")) {
    pathname = `studyrooms`;
  }

  return (
    <StyledLink href={`${pathname}/${item.id}`}>
      <CardContent>
        <CardUpper_ul>
          <Emoji>{getRandomEmoji()}</Emoji>

          <Title
            $htype={3}
            $fontSize={tokens.fontSize.web.medium}
            $color={tokens.colors.simple.blackbasic}
          >
            {item.title}
          </Title>

          <Span
            content={`생성일: ${setDateStr(convertISOToYMD(item.createdDate))}`}
          />
        </CardUpper_ul>

        <Description
          content={item.description}
          color={tokens.colors.simple.grayfortext}
        />
      </CardContent>
    </StyledLink>
  );
};

// card for studyRoom's member

export const MemberCard = (data: StudyRoomMember) => {
  return (
    <StudyRoomMemberCard>
      <ImageContainer>
        <Emoji>{getRandomEmoji()}</Emoji>
        <GradientOverlay></GradientOverlay>
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

/////////////// styled ///////////////////

const Styled_li = styled.li<Styled_li_card_props>`
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

const StyledLink = styled(Link)<Styled_li_card_props>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  //for same height
  align-items: center;
  // box-sizing: border-box;

  // flex: 1 1 calc(33.333% - 1rem); // 1 line 3 card
  gap: 0.5rem;

  max-width: 300px;

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

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 1rem;

  gap: 2rem;

  //box-sizing: border-box; //for calc height inlciude padding

  /* > span:nth-of-type(1) {
    // 첫 번째 Span (item.image)
    flex: 2;
  }

  > span:nth-of-type(2) {
    flex: 1;
  } */
`;

const CardUpper_ul = styled.ul<Styled_li_card_props>`
  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  //for same height
  align-items: center;
  // box-sizing: border-box;

  gap: 0.5rem;
`;

const StudyRoomMemberCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  //width: 300px;

  background-color: var(${tokens.colors.simple.whitebg});

  max-width: 300px;
  margin: 10px;
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
