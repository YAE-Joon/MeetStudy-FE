import getAPIendPoint from "@/lib/settingUrl";
import { FetchOptions } from "@/lib/types";

/**
 *
 * @param apiUrl
 * @param options
 * @param isAdmin
 * @param isTest
 * @returns
 * 
 * interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}
 */
async function fetchDataBE(
  apiUrl: string,
  options: FetchOptions = {},
  isAdmin: boolean | null = null,
  isTest: boolean | null = null
) {
  const endpoint = getAPIendPoint(apiUrl, isTest);
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  // Authorization
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  const adminToken = process.env.NEXT_PUBLIC_TEST_ADMIN;
  if (token) {
    //(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    (headers as Record<string, string>)["Authorization"] = `${token}`;
  }
  if (isAdmin) {
    (headers as Record<string, string>)["Authorization"] = `${adminToken}`;
  }

  console.log(
    "🙆‍♂️ [fetchDataBE] fetch를 시작합니다. 요청받은 옵션: apiUrl, options, isAdmin, isTest/",
    apiUrl,
    options,
    isAdmin,
    isTest
  );

  const response = await fetch(endpoint, {
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : null,
  }); //fetch 함수의 응답 객체

  console.log(
    "🙆‍♂️ [fetchDataBE] fetch가 종료되었습니다. 상태: ",
    response.status
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`❗데이터 패칭에 실패하였습니다: ${errorMessage}`);
  }
  const fetchedData = await response.json(); // JSON으로 파싱된 응답 데이터
  console.log("🙆‍♂️ 데이터를 가져왔습니다!", endpoint, "/", fetchedData);

  // console.log(
  //   `👩‍💻| endpoint : ${endpoint} 에서 다음 response를 받았습니다 | status:`,
  //   response.status,
  //   "body",
  //   fetchedData
  // );

  return fetchedData;
}

export default fetchDataBE;
