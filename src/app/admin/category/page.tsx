"use client";
import useFetch from "@/hooks/useFetch";

import dt from "@/lib/designToken/designTokens";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { Title } from "@/component/styled-components/TextBoxes";
import { FlexBoxUlV } from "@/component/styled-components/FlexBoxes";
const {
  InnerContainer,
  CategoryNav,
  StudyRoomCategories,
  SearchResultSection,
  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
  HamburgerIcon,
  CategoryTitleWrapper,
} = StyledStudyRoomIndex;
const tokens = dt.DesignTokenVarNames;

import MainStyledPack from "@/component/mainPage/mainStyledComponents";
import { CategoriyOptions } from "@/lib/types";
import { Container } from "@/component/styled-components/Container";
import Wrapper from "@/component/styled-components/Wrapper";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
const {
  SettingSection,
  MySettingUl,
  FlexBar,
  StyledList,
  StyledDetails,
  MainTitleWrapper,
  ErrorBox,
  StyledDescription,
} = MainStyledPack;

//클라이언트에서 요청 보냄
const AdminCategoryPage = () => {
  const [categories, error] = useFetch<CategoriyOptions[]>(
    "/api/admin/categories",
    // "/api/post/public",  // 테스트용, 공개된 api
    {},
    false,
    true
  );

  if (!categories) {
    return <div>로딩 중</div>;
  }

  console.log("categories", categories);

  return (
    <>
      <Wrapper flexDirection="row" $padding="1rem">
        <Title
          htype={3}
          align={"left"}
          content={"카테고리 관리 페이지"}
          color={tokens.colors.simple.blackbasic}
          fontSize={tokens.fontSize.web.medium}
        />
        <span style={{ width: "15%", minWidth: "100px" }}>
          <PrimaryButton content={"추가"} />
        </span>
      </Wrapper>
      <Container as="main" minWidth={tokens.boxSizes.width.containerMin}>
        <StyledList gap={"5px"} height={"20%"} width={"100%"}>
          {categories.map((category, idx) => {
            return (
              <StyledDetails key={category.id}>
                <MainTitleWrapper padding={"0"}>
                  <Title
                    htype={4}
                    fontSize={tokens.fontSize.web.small}
                    color={tokens.colors.simple.blackbasic}
                    content={category.name}
                    align={"left"}
                  />
                  <button>수정</button>
                  <button>삭제</button>
                </MainTitleWrapper>
                <StyledDescription
                  content={category.description}
                  fontSize={tokens.fontSize.web.xsmall}
                />
              </StyledDetails>
            );
          })}
        </StyledList>
      </Container>
    </>
  );
};

export default AdminCategoryPage;
