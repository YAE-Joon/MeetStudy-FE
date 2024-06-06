"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FlexBoxH,
  FlexBoxUlV,
  FlexBoxV,
} from "@/component/styled-components/FlexBoxes";
import { StyledProps } from "@/component/styled-components/styledProps";
import { Description } from "@/component/styled-components/TextBoxes";
import { Container } from "@/component/styled-components/Container";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const MainPageContainer = styled(Container)`
  gap: 20px;
`;

const SettingSection = styled.section`
  position: relative;
  width: 100%;
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
  height: 3rem;
  width: 100%;
  margin: 0;
  padding: 0 1rem 0 0;

  background-color: var(${tokens.colors.simple.whitebg});
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
  padding: ${({ padding }) => padding || "1rem 0 1rem 0"};

  > div {
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
    flex: 6;
  }

  > *:nth-child(2) {
    flex: 4;
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
};
export default MainStyledPack;
