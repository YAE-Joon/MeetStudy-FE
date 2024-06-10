import LandingPage from "./LandingPage";

// '/' 으로 접속했을 때 로그인 상태가 아닐 시 이 페이지로 리다이렉트됩니다. 로그인 상태시 / 로 이동합니다.
// 스크롤 관련 기능을 위해 LandingPage에서 import합니다.
export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
