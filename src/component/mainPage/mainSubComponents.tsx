import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
export const SettingSection = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const MySettingUl = styled.ul<{ gap?: string }>`
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

export const FlexBar = styled.nav`
  display: flex;
  flex-direction: row;
  height: 3rem;
  width: 100%;
  margin: 0;
  padding: 0 1rem 0 0;

  background-color: var(${tokens.colors.simple.tertiarygray});
`;
