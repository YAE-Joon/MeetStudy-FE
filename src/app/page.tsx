import {
  FirstSectionMain,
  SecondSectionMain,
} from "@/component/mainPage/MainPage";
import { MainNavBar } from "@/component/mainPage/mainClinentComponents";
import {
  Container,
  OuterContainer,
} from "@/component/styled-components/Container";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;

// '/' 로 접속하고 로그인 상태일 시 해당 페이지로 연결됩니다. 로그인 상태가 아닐 시 랜딩 페이지로 연결됩니다.
export default async function Main() {
  return (
    <OuterContainer>
      <MainNavBar mode={"mypage"} />

      <Container bgColor={`var(${tokens.colors.simple.primary})`}>
        <FirstSectionMain />
        <SecondSectionMain />
      </Container>
    </OuterContainer>
  );
}
