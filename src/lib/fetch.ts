import getApiPath from "@/lib/settingUrl";
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
  isTest: boolean | null = null,
  userNickname: string | null = null
) {
  const apiPath = getApiPath(apiUrl, isTest);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  // Authorization
  //const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  const adminToken = process.env.NEXT_PUBLIC_TEST_ADMIN;

  const testerToken = process.env.NEXT_PUBLIC_TEST2_TOKEN;

  const token = process.env.NEXT_PUBLIC_TEST_TOKEN_OTHER;

  // 일반유저 토큰이 존재할 때 Authorization 헤더 추가

  if (token) {
    //(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  // 어드민일 때 덮어씌움
  if (isAdmin) {
    (headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${adminToken}`;
  }

  // console.log(userNickname);
  // if (userNickname === "하영") {
  //   (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  // }

  // if (userNickname === "학습냥이") {
  //   (headers as Record<string, string>)[
  //     "Authorization"
  //   ] = `Bearer ${testerToken}`;
  // }

  // 헤더 체크
  if ("Authorization" in headers) {
    console.log(
      `🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재합니다: ${headers["Authorization"]}`
    );
  } else {
    console.log("🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재하지 않습니다.");
  }

  console.log(
    `🙆‍♂️ [fetchDataBE] fetch를 시작합니다. 요청받은 옵션: apiUrl:${apiUrl} | options:${options} | isAdmin:${isAdmin} | isTest:${isTest}`
  );

  try {
    const response = await fetch(apiPath, {
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : null,
      headers: headers,
    });

    console.log(
      "🙆‍♂️ [fetchDataBE] fetch가 종료되었습니다. 상태: ",
      response.status
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`❗response is not OK: ${errorMessage}`);
    }

    //check response body
    const contentLength = response.headers.get("Content-Length");
    const contentType = response.headers.get("Content-Type");

    if (
      contentLength !== "0" &&
      contentType &&
      contentType.includes("application/json")
    ) {
      const fetchedData = await response.json();
      // console.log("🙆‍♂️ [fetchDataBE] 최종 데이터 ", fetchedData);
      return fetchedData;
    }
    console.log(
      "🙆‍♂️ [fetchDataBE] req.body가 비어있습니다! 빈 객체를 반환합니다."
    );
    return {};
  } catch (error) {
    console.error("❗데이터 패칭 중 오류가 발생했습니다:", error);
    throw error;
  }
}

export default fetchDataBE;
