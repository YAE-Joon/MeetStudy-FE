"use client";

import {
  Container,
  OuterContainer,
} from "@/component/styled-components/Container";
import {
  FlexBoxH,
  FlexBoxV,
  FlexBox_H_ul,
} from "@/component/styled-components/FlexBoxes";
import Wrapper from "@/component/styled-components/Wrapper";
import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";

import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

import {
  SettingSection,
  MySettingUl,
  FlexBar,
} from "@/app/main/mainSubComponents";
import Link from "next/link";
import routeLinks from "@/lib/routeLinks";

const ExtendedFlexBoxV = styled(FlexBoxV)`
  > div,
  > section {
    flex: 1 1;
  }
`;

const MainPage = () => {
  return (
    <OuterContainer>
      <FlexBar>
        <SettingSection>
          <MySettingUl>
            <li>
              <IoMdSettings
                style={{ color: `var(${tokens.colors.simple.primary})` }}
              />
            </li>
            <li>
              <Link href={routeLinks.myAccountSetting}>계정 관리</Link>
            </li>
          </MySettingUl>
        </SettingSection>
      </FlexBar>
      <Container bgColor={`var(${tokens.colors.simple.primary})`}>
        <Wrapper $bgColor={tokens.colors.simple.primary}>테스트</Wrapper>
        <Wrapper $bgColor={tokens.colors.simple.grayforText}>테스트</Wrapper>
        <Wrapper $bgColor={tokens.colors.simple.tertiarygray}>테스트</Wrapper>
      </Container>
    </OuterContainer>
  );
};

export default MainPage;
