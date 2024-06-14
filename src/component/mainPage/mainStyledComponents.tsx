"use client";
import styled, { keyframes } from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FlexBoxH,
  FlexBoxUlV,
  FlexBoxV,
  StyledUl,
} from "@/component/styled-components/FlexBoxes";
import { StyledProps } from "@/component/styled-components/styledProps";
import { Description } from "@/component/styled-components/TextBoxes";
import { Container } from "@/component/styled-components/Container";
import Link from "next/link";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const MainPageContainer = styled(Container)`
  gap: 20px;
`;

const SettingSection = styled.section`
  position: relative;
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SectionContainerH = styled(FlexBoxH)`
  width: 80vw;

  > * {
    flex: 1;
  }
`;

const SectionContainerV = styled(FlexBoxV)`
  width: 80vw;

  > * {
    flex: 1;
  }
`;

const PartContainerV = styled(FlexBoxV)`
  padding: 1rem;
  background-color: var(${tokens.colors.simple.whitebg});
  border-radius: 20px;
  border: thick double var(${tokens.colors.simple.tertiarygray});

  gap: 1rem;

  min-height: 200px;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
  }

  // background-color: red;
`;

const PartContainerH = styled(FlexBoxH)`
  padding: 3rem;
  background-color: var(${tokens.colors.simple.whitebg});
  border-radius: 20px;
  border: thick double var(${tokens.colors.simple.tertiarygray});

  gap: 1rem;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;

    height: auto;
  }
`;

const MySettingUl = styled.ul<{ gap?: string }>`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;

  list-style: none;

  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap || "0rem"};

  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    margin: 0;
    padding: 0;
  }

  > li:first-child {
    width: 3rem;
    height: 3rem;

    svg {
      font-size: 2rem;
    }
  }

  > li:nth-child(2) {
    &:hover {
      color: green;
    }
  }

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    > li:first-child {
      width: 3rem;
      height: 3rem;

      svg {
        font-size: 0.5;
      }
    }

    > li:nth-child(2) {
      display: none;
    }
  }
`;

const FlexBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  width: 100%;
  margin: 0;
  padding: 1rem;

  background-color: var(${tokens.colors.simple.whitebg});

  position: fixed;
`;
interface StyledListProps {
  gap?: string;
  height?: string;
  width?: string;
}

const StyledList = styled(FlexBoxUlV)<StyledListProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: ${({ gap }) => gap || "1rem"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};

  > li {
    flex: 1;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
  }
`;

const StyledDetails = styled.li<StyledListProps>`
  flex: 1;
  list-style: none;

  font-size: var(${tokens.fontSize.web.small});

  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};

  > li {
    flex: 1;
  }

  > div {
    font-size: var(${tokens.fontSize.web.xsmall});
  }

  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface StyledTitleProps {
  gap?: string;
  height?: string;
  width?: string;
  padding?: string;
}

const MainTitleWrapper = styled(FlexBoxH)<StyledTitleProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  flex-direction: row;

  border-bottom: 1px solid var(${tokens.colors.simple.tertiarylightgray});
  padding: ${({ padding }) => padding || "0.5rem 0 0.5rem 0"};

  > div,
  span {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 1rem;

    > p {
      display: flex;
      flex-direction: row;
    }
  }

  > *:nth-child(1) {
    flex: 0.5;
  }

  > *:nth-child(2) {
    flex: 7;
  }

  > *:nth-child(3) {
    flex: 2.5;
  }
`;

const ErrorBox = styled(FlexBoxV)`
  width: 50%;
  height: 25%;

  padding: 2rem;

  background-color: var(${tokens.colors.simple.tertiarygray});

  border-radius: 20px;

  border: thick double var(${tokens.colors.simple.tertiarygray});
`;

const StyledDescription = styled(Description)`
  padding: 1rem 1rem 1rem 1rem;
`;

////// skeleton /////

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const SkeletonBar = styled.div`
  width: 100%;
  height: 20px;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #eeeeee 0%,
    #dddddd 50%,
    #eeeeee 100%
  );
  background-repeat: no-repeat;
  background-size: 1000px 100%;
  display: inline-block;
  position: relative;
  animation: ${pulse} 2s infinite linear;
  border-radius: 4px;
`;

export const MainSkleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonBar />
      <SkeletonBar />
      <SkeletonBar />
    </SkeletonContainer>
  );
};

//////// calendar ////////////

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  min-height: 400px;

  width: 100%;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const Date = styled.span`
  font-weight: 500;
  color: var(${tokens.colors.simple.blackbasic});
`;

const EventDetails = styled.div`
  flex: 1;
  align-items: center;
  gap: 0.5rem;
`;

const EventTitle = styled.div`
  font-weight: 500;
`;

const EventTime = styled.div`
  font-size: var(${tokens.fontSize.web.xsmall});
  color: var(${tokens.colors.simple.grayfortext});
`;
const EventTimeWrapper = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
`;

/////// studyrooms ////

const MyStudyRoomsContainer = styled(StyledUl)`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  gap: 1rem;
  padding-bottom: 10px;
  justify-content: start;

  > li {
    flex: 0 0 auto;
  }

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const MainTableWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 200;
  overflow: auto;
`;

export const MainWrapper = styled.section`
  display: flex;
  flex-direction: "column";
  justify-content: space-between;
  align-items: center;

  /* min-height: 100%; */
  width: 80%;
  min-width: var(${tokens.boxSizes.width.wrapperMax});
  padding: 1.5rem;

  & > * {
    flex: 1 1 50%;
    max-width: 50%;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    min-width: var(${tokens.boxSizes.width.wrapperMinMobile});
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s, font-weight 0.3s;

  width: 300px;
  height: 300px;

  &:hover {
    color: green;
    font-weight: bold;
  }
`;

export const StyledStudyRoomsPack = {
  MyStudyRoomsContainer,
  MainTableWrapper,
  StyledLink,
};

export const StyledCalendarPack = {
  Grid,
  Card,
  CardContent,
  Date,
  EventDetails,
  EventTitle,
  EventTime,
  EventTimeWrapper,
};

const MainStyledPack = {
  MainPageContainer,
  SettingSection,
  SectionContainerH,
  SectionContainerV,
  PartContainerV,
  PartContainerH,
  MySettingUl,
  FlexBar,
  StyledList,
  StyledDetails,
  MainTitleWrapper,
  ErrorBox,
  StyledDescription,
  MainWrapper,
};
export default MainStyledPack;
