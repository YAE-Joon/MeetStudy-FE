"use client";
import useFetch from "@/hooks/useFetch";
import getAPIendPoint from "@/lib/settingUrl";

const TESTDataFetching = () => {
  const apiUrl = process.env.NEXT_PUBLIC_TEST_API;
  const testTitle = "유저 데이터/마이페이지";

  if (!apiUrl) {
    return (
      <div>
        {process.env.NEXT_PUBLIC_TEST_API} 로 API를 쏘아 {testTitle}를
        테스트하고 있습니다.
        <div>env에서 읽어오기 실패</div>;
      </div>
    );
  }

  const baseURL = getAPIendPoint(apiUrl, true);
  const [userData, error] = useFetch(apiUrl, true);

  console.log(`❗❗${testTitle}`, userData);

  if (error) {
    return (
      <div>
        {baseURL} 로 API를 쏘아 {testTitle}를 테스트하고 있습니다.
        <div>에러가 발생했습니다. {error.message}</div>;
      </div>
    );
  }

  return (
    <div>
      {baseURL} 로 API를 쏘아 {testTitle}를 테스트하고 있습니다.
    </div>
  );
};

export default TESTDataFetching;
