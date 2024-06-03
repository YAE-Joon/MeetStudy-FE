"use client";
import Link from "next/link";
import routeLinks from "@/lib/routeLinks";

import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";

import Wrapper from "@/component/styled-components/Wrapper";
import { FlexBoxH, FlexBoxV } from "@/component/styled-components/FlexBoxes";
import {
  SettingSection,
  MySettingUl,
  FlexBar,
} from "@/component/mainPage/mainSubComponents";

import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

// 첫번째 구역 : 일정과 참여중인 스터디룸
export const FirstSectionMain = () => {
  return (
    <Wrapper $bgColor={tokens.colors.simple.whitebg}>
      <FlexBoxH>
        <FlexBoxV>
          일정
          <DummyDiv />
        </FlexBoxV>
        <FlexBoxV>
          내가 참여중인 스터디룸
          <DummyDiv />
        </FlexBoxV>
      </FlexBoxH>
    </Wrapper>
  );
};

// 구현 완료
export const MainNavBar = ({ mode }: { mode?: string }) => {
  return (
    <FlexBar>
      <SettingSection>
        <MySettingUl>
          {mode === "mypage" ? (
            <>
              <li>
                <IoMdSettings
                  style={{ color: `var(${tokens.colors.simple.primary})` }}
                />
              </li>
              <li>
                <Link href={routeLinks.myAccountSetting}>계정 관리</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <RiUserFill
                  style={{ color: `var(${tokens.colors.simple.primary})` }}
                />
              </li>
              <li>
                <Link href={routeLinks.main}>메인으로</Link>
              </li>
            </>
          )}
        </MySettingUl>
      </SettingSection>
    </FlexBar>
  );
};

// 서브 컴포넌트(디자인적)

const ExtendedFlexBoxV = styled(FlexBoxV)`
  > div,
  > section {
    flex: 1 1;
  }
`;
export const DummyDiv = styled.div`
  width: 150px;
  height: 150px;
  background-color: yellow;
`;
