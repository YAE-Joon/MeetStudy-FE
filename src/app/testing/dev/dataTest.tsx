"use client";
import useFetch from "@/hooks/useFetch";
import getAPIendPoint from "@/lib/settingUrl";

const TESTDataFetching = () => {
  const apiUrl = "/api/user/mypage";
  const testTitle = "유저 데이터/마이페이지";

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
