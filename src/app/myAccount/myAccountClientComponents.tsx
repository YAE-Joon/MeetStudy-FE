"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

import { FlexBoxV, FlexBoxUlV } from "@/component/styled-components/FlexBoxes";
import { BasicButton } from "@/component/styled-components/Button/Buttons";
import { Container } from "@/component/styled-components/Container";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
const MyAccContainer = styled(Container)``;

const PartContainerV = styled(FlexBoxV)`
  width: 80%;
  height: 100%;
  padding: 3rem;

  background-color: var(${tokens.colors.simple.whitebg});
  border-radius: 20px;
  border: thick double var(${tokens.colors.simple.tertiarygray});

  justify-content: center;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
    grid-template-columns: 1fr;
  }

  > *:first-child {
    flex-grow: 1;
  }

  > *:last-child {
    flex-grow: 9;
  }
`;
// 이 페이지에서 사용되는 공통되는 wrapper
// 왼쪽 정렬, 너비 80
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 80%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    text-align: center;
  }
`;
const TitleWrapper1 = styled(PageWrapper)`
  @media only screen and (max-width: ${mobileWidth}) {
    height: 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 2px;
`;

const FristSectionContainer = styled(FlexBoxV)`
  width: 100%;
  height: 100%;

  overflow: auto;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
  }
`;

const FirstSectionUl = styled(FlexBoxUlV)`
  height: 100%;
  width: 100%;
  max-width: var(${tokens.boxSizes.width.wrapperMax});
  gap: 3rem;
  align-items: flex-start;
  padding: 2rem;

  font-size: var(${tokens.fontSize.web.small});

  > form {
    display: flex;
    // width: 100%;
    gap: 1rem;
    justify-content: center;
  }

  > li {
    display: flex;
    width: 100%;
    gap: 5rem;

    > span {
      flex: 1;
      flex-basis: 0;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      gap: 1rem;

      &:nth-child(2) {
        position: relative;
        justify-content: center;

        &::after {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(${tokens.colors.simple.primary});
        }
      }
    }
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    font-size: var(${tokens.fontSize.mobile.small});

    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  flex-direction: row;

  margin-top: 2rem;
  gap: 1rem;

  //max-width: var(${tokens.boxSizes.width.wrapperMinMobile});
`;

const DeleteThisUser = styled(BasicButton)`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100%;
  padding: 0.5rem;
  margin: auto 0;

  background-color: var(${tokens.colors.simple.tertiarygray});
  border: 0.5px solid var(${tokens.colors.simple.primary});
  border-radius: 3px;

  &:hover {
    background-color: var(${tokens.colors.simple.invalidred});
    color: white;
    border: black;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${tokens.fontSize.mobile.small});
    padding: 0.5rem 2rem 0.5rem 2rem;
  }
`;

const StyledAccounts = {
  PartContainerV,
  PageWrapper,
  TitleWrapper,
  FristSectionContainer,
  FirstSectionUl,
  ButtonWrapper,
  DeleteThisUser,
};
export default StyledAccounts;
