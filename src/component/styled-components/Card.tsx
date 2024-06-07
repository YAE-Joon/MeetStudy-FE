"use client";

import styled from "styled-components";
import {
  StyledProps,
  StyledComponentsProps,
} from "@/component/styled-components/styledProps";

import dt from "@/lib/designToken/designTokens";
import { Span, Description } from "@/component/styled-components/TextBoxes";
import { StudyRoom } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

interface Styled_li_card_props extends StyledProps {
  $shadow?: "primary" | null;
  $effectType?: "hoverEffect" | null;
}

interface ItemProps extends StudyRoom {
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

export const StudyRoomCard: React.FC<LiCardProps> = ({ item, styles = {} }) => {
  const pathname = usePathname();
  return (
    <StyledLink
      href={`${pathname}/${item.id}`}
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
          {item.title && <Span content={item.title} isBold={true} />}

          {item.author && <Span content={item.author} isBold={true} />}
        </CardUpper_ul>
        {item.comment && <Span content={item.comment} />}
        {item.content && (
          <Description
            content={item.content}
            color={tokens.colors.simple.grayfortext}
          />
        )}

        {item.description && (
          <Description
            content={item.description}
            color={tokens.colors.simple.grayfortext}
          />
        )}
        {item.maxCapacity && (
          <Span
            content={item.maxCapacity}
            color={tokens.colors.simple.grayfortext}
          />
        )}
      </CardContent>
    </StyledLink>
  );
};
