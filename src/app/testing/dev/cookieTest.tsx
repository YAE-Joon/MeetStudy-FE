import { cookies } from "next/headers";

export default function CookieSC() {
  const cookiestore = cookies();
  const test = cookiestore.get("test");
  const t = cookiestore.has("test");
  console.log("서버 컴포넌트 test", typeof test, "/", test);
  console.log("서버 컴포넌트 t", t);

  return (
    <div>
      <h1>쿠키 테스트 sc 입니다.</h1>
      <p>쿠키를 제대로 가져오는지 테스트합니다.</p>
      <p>현재 미들웨어에서는 다음과 같이 세팅되어 있습니다. </p>
      <p>res.cookies.set("test", "1")</p>
      <p>콘솔 로그를 확인해봅시다.</p>
    </div>
  );
}
