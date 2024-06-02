import {
  MainNavBar,
  FirstSectionMain,
  DummyDiv,
} from "@/component/mainPage/MainComponents";
import {
  Container,
  OuterContainer,
} from "@/component/styled-components/Container";
import dt from "@/lib/designToken/designTokens";

import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import Wrapper from "@/component/styled-components/Wrapper";

const tokens = dt.DesignTokenVarNames;

// '/' 로 접속하고 로그인 상태일 시 해당 페이지로 연결됩니다. 로그인 상태가 아닐 시 랜딩 페이지로 연결됩니다.
export default function Main() {
  return (
    <OuterContainer>
      <MainNavBar />
      <Container bgColor={`var(${tokens.colors.simple.primary})`}>
        <FirstSectionMain />
      </Container>
      <Container bgColor={`var(${tokens.colors.simple.primary})`}>
        <h1>서버 컴포넌트입니다</h1>
        <Wrapper $bgColor={tokens.colors.simple.grayforText}>
          게시글 목록
          <FlexBoxV>
            <FlexBoxV>
              내가 스크렙한 게시글
              <DummyDiv />
            </FlexBoxV>
            <FlexBoxV>
              내가 작성한 게시글
              <DummyDiv />
            </FlexBoxV>
          </FlexBoxV>
        </Wrapper>
      </Container>
    </OuterContainer>
  );
}

// 내가 스크랩한 게시글/작성한 게시글은 서버 컴포넌트로서 처리합니다.
