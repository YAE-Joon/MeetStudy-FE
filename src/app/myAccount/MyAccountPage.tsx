"use client";
import { UserProfile } from "@/lib/types";
import useFetch from "@/hooks/useFetch";
import MyAccountLoading from "@/app/myAccount/loading";

import dt from "@/lib/designToken/designTokens";

import { Container } from "@/component/styled-components/Container";
import Wrapper from "@/component/styled-components/Wrapper";
import { Title } from "@/component/styled-components/TextBoxes";
import {
  PageWrapper,
  TitleWrapper,
} from "@/app/myAccount/myAccountClientComponents";
import EditSections from "./MyAccount";

const tokens = dt.DesignTokenVarNames;

export const Myaccount = () => {
  const [userProfileData, error] = useFetch<UserProfile>(`/api/myaccount`); //임시, next.js의 서버와 통신

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userProfileData) {
    return (
      <Wrapper $bgColor={tokens.colors.simple.whitebg}>
        {" "}
        <MyAccountLoading />;
      </Wrapper>
    );
  }
  return (
    <Container
      height={"100vh"}
      bgColor={tokens.colors.simple.whitebg}
      as="section"
    >
      <TitleWrapper>
        <Title
          content={"내 정보 수정하기"}
          fontSize={tokens.fontSize.web.large}
          color={tokens.colors.simple.blackbasic}
          htype={2}
        />
      </TitleWrapper>
      <PageWrapper>
        <EditSections UserProfile={userProfileData} />
      </PageWrapper>
    </Container>
  );
};
