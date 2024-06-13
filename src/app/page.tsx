import MainPage from "@/component/mainPage/MainPage";
import { OuterContainer } from "@/component/styled-components/Container";

// '/' 로 접속하고 로그인 상태일 시 해당 페이지로 연결됩니다. 로그인 상태가 아닐 시 랜딩 페이지로 연결됩니다.
export default async function Main() {
  return (
    <OuterContainer>
      <MainPage />
    </OuterContainer>
  );
}
