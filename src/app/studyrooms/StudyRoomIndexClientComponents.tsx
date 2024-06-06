"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FlexBoxH,
  FlexBoxUlV,
  FlexBoxV,
  StyledUl,
} from "@/component/styled-components/FlexBoxes";
import { BasicInput } from "@/component/styled-components/Forms";
import { MdSearch } from "react-icons/md";
import { ChangeEvent } from "react";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;
import { css } from "styled-components";
// nav + results/categories
const InnerContainer = styled(FlexBoxH)`
  align-items: flex-start;
  padding: 4rem;
  margin-top: 0.5rem;
  > *:first-child {
    flex-grow: 2;
    max-width: 20%;
  }

  > *:last-child {
    flex-grow: 8;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    text-align: center;
    flex-direction: column;

    padding: 0 0 0 1rem;

    > *:first-child {
      height: 10%;
    }

    > *:last-child {
      height: 90%;
    }
  }
`;

const CategoryNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  justify-content: center;
  align-items: center;

  width: 20vw;

  min-width: 300px;
  height: 100%;

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  > *:first-child {
    padding-bottom: 2rem;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    //grid-template-columns: repeat(3, 1fr);
    min-width: 400;
  }
`;

const SearchResultSection = styled(FlexBoxV)`
  align-items: flex-start;

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

interface HamburgerProp {
  isopen: boolean;
}

interface StudyRoomCategoriesProps {
  isopen: boolean;
}

const StudyRoomCategories = styled(FlexBoxUlV).attrs<StudyRoomCategoriesProps>(
  ({ isopen }) => ({
    isopen: isopen ?? undefined, // DOM에 직접 전달되지 않도록 필터링
  })
)<StudyRoomCategoriesProps>`
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  height: 100%;

  > li {
    flex: 1;
    font-size: var(${tokens.fontSize.web.small});
    padding: 0.5rem 0 1rem 0.5rem;
    width: 100%;
    &:hover {
      background-color: var(${tokens.colors.simple.tertiarygray});
      font-weight: 700;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
    flex-direction: column;

    ${(props) =>
      props.isopen &&
      css`
        > li {
          display: block;
        }
      `}
    ${(props) =>
      !props.isopen &&
      css`
        > li {
          display: none;
        }
      `}
  }
`;
const HamburgerIcon = styled.div`
  display: none;
  @media only screen and (max-width: ${mobileWidth}) {
    display: flex;
    cursor: pointer;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
  }
`;

const HamburgerMenu = styled.div.attrs<{ isopen: boolean }>({
  isopen: undefined, // DOM에 직접 전달되지 않도록 필터링
})<{ isopen: boolean }>`
  @media only screen and (max-width: ${mobileWidth}) {
    padding-top: 1rem;
    display: ${(props) => (props.isopen ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 2rem;
  }
`;
const SearchResultContainer = styled(StyledUl)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-bottom: 2vh;

  > li {
    min-width: 300px;
    max-width: 450px;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
  }
`;

const StyledStudyRoomIndex = {
  InnerContainer,
  CategoryNav,
  CategoryTitleWrapper,
  StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  HamburgerMenu,
};
export default StyledStudyRoomIndex;
