import getAPIendPoint from "@/lib/settingUrl";
import { FetchOptions } from "@/lib/types";

// 다른 서버사이드 fetching에서도 재활용.
/**
 * Backend에서 데이터를 fetch 하는 함수입니다. 
 * @param apiUrl :필수, string, '/api/...'
 * @param isTest :선택, boolean, 기본 null
 * @param options : 선택, 기본 {}, FetchOptions type
 * 기본 메서드는 GET
 * 
 * interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}
 * @returns Promise
 */
async function fetchDataBE(
  apiUrl: string,
  isTest: boolean | null = null,
  options: FetchOptions = {}
) {
  const endpoint = getAPIendPoint(apiUrl, isTest);

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  // Authorization
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    //(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    (headers as Record<string, string>)["Authorization"] = `${token}`;
  }
  const response = await fetch(endpoint, {
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : null,
  }); //fetch 함수의 응답 객체

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`❗데이터 패칭에 실패하였습니다: ${errorMessage}`);
  }
  const fetchedData = await response.json(); // JSON으로 파싱된 응답 데이터
  //console.log("🙆‍♂️ 데이터를 가져왔습니다!", userData);
  return fetchedData;
}

export default fetchDataBE;
