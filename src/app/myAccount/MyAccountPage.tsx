"use client";
import { Title } from "@/component/styled-components/TextBoxes";
import dt from "@/lib/designToken/designTokens";
import { Container } from "@/component/styled-components/Container";
import { PageWrapper, TitleWrapper } from "@/app/myAccount/myAccountComponents";
import EditSections from "./MyAccount";
import { MyaccountProps, UserData } from "@/lib/types";

const tokens = dt.DesignTokenVarNames;

export const Myaccount: React.FC<MyaccountProps> = ({ userData }) => {
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
        <EditSections userData={userData} />
      </PageWrapper>
    </Container>
  );
};
