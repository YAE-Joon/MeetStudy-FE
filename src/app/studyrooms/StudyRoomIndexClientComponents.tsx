"use client";
import { ChangeEvent } from "react";

import styled from "styled-components";
import { MdSearch } from "react-icons/md";

import dt from "@/lib/designToken/designTokens";
import {
  FlexBoxH,
  FlexBoxUlV,
  FlexBoxV,
  StyledUl,
} from "@/component/styled-components/FlexBoxes";
import { BasicInput } from "@/component/styled-components/Forms";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

// nav + results/categories
const InnerContainer = styled(FlexBoxH)`
  align-items: flex-start;

  margin-top: 0.5rem;
  > *:first-child {
    flex: 2 1 0;
  }

  > *:last-child {
    flex: 8 1 0;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    text-align: center;
    flex-direction: column;

    padding: 0 0 0 1rem;

    width: 100vw;

    > *:first-child {
      height: 10%;
    }

    > *:last-child {
      height: 90%;
    }

    overflow-y: auto;
  }
`;

const SearchResultSection = styled(FlexBoxV)`
  align-items: flex-start;
  height: 100%;

  //min-width: 500px;

  padding: 0 0.5rem 1rem 1rem;

  gap: 1rem;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    flex-direction: column;
    align-items: center;

    min-width: 400px;

    padding: 0;
  }
`;

const SearchBarWarpper = styled(FlexBoxUlV)`
  align-items: flex-start;
  height: 10vh;
  min-height: 30px;
  width: 90%;

  padding: 0.5rem 0 1rem 1rem;
  margin-bottom: 1rem;

  gap: 2rem;

  > *:first-child {
    height: 60%;
  }

  > *:last-child {
    height: 40%;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    flex-direction: column;
    align-items: center;

    min-width: 400px;
  }
`;

const SearchBarWarpperH = styled(FlexBoxH)`
  height: 10vh;
  min-height: 30px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 0 1rem 1rem;
  margin-bottom: 1rem;

  gap: 200px;

  /* background-color: red;

  > *:first-child {
    flex: 8 1 0;
  }

  > *:nth-child(2) {
    flex: 2 1 0;
  } */

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    flex-direction: column;
    align-items: center;

    min-width: 400px;
  }
`;

const StyledInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
  }
`;

const SearchBarInput = styled(BasicInput)`
  width: 110%;

  padding: 1rem 1rem 1rem 2.5rem;

  @media only screen and (max-width: ${mobileWidth}) {
  }
`;

const InputContainer = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <StyledInputContainer>
      <SearchIcon />
      <SearchBarInput
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="검색어를 입력하세요"
      />
    </StyledInputContainer>
  );
};

const SearchIcon = styled(MdSearch)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: ${tokens.colors.simple.tertiarygray};
  font-size: 20px;
  pointer-events: none;
`;

const SearchResultContainer = styled(StyledUl)`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding-bottom: 2vh;
  justify-content: start;

  > li {
    min-width: 300px;
    max-width: 450px;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const StyledStudyRoomIndex = {
  InnerContainer,
  //tudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  SearchBarWarpperH,
  InputContainer,
  SearchResultContainer,
};
export default StyledStudyRoomIndex;
