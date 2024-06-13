import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";
import getApiPath from "@/lib/settingUrl";

import { FetchOptions } from "@/lib/types";
import { UserProfile } from "@/types/User";
import { getUserFromToken } from "@/util/getUserFromToken";

import { fetchExternalImage } from "next/dist/server/image-optimizer";

/**
 *
 * @param token
 * @param requiredFields string | [email, username, nickname, password, interests]
 * @returns
 *
 */
export async function getUserInfoFromToken(
  token: string | null,
  requiredFields: string[] | string,
  isServer: boolean | null = null //미들웨어용
) {
  if (token === null || token === undefined) {
    return "토큰이 올바르지 않습니다.";
  }

  const isAdmin = getUserFromToken(token);
  if (isAdmin && isAdmin.auth === "ADMIN") {
    console.log("[getUserInfoFromToken] ADMIN 상태에서 호춣");
    return "ADMIN";
  }

  const data = isServer
    ? await fetchDataBE(apiPaths.mypage.info, {}, token)
    : await fetchDataBE(apiPaths.mypage.info, {}, token);

  if (Array.isArray(requiredFields)) {
    const userInfo: Partial<UserProfile> = {};
    requiredFields.forEach((field) => {
      if (field in data) {
        userInfo[field as keyof UserProfile] = data[field];
      }
    });
    return userInfo;
  }
  console.log("data[requiredFields]", data[requiredFields]);
  return data[requiredFields];
}

// 단순 함수, fetchDataBE를 나중에 싹 바꿀 거임.
/**
 *
 * @param apiUrl
 * @param options
 * @param token
 * @returns
 */
export default async function WillfetchDataBE(
  apiUrl: string,
  options: FetchOptions = {},
  token: string
) {
  const apiPath = getApiPath(apiUrl);
  const initialHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  const headersWithToken = setTokenIntoHeader(initialHeaders, token);
  console.log(
    `🙆‍♂️ [fetchDataBE] fetch를 시작합니다. 요청받은 옵션: \napiUrl:${apiUrl} | options:${options}`
  );

  try {
    const response = await fetch(apiPath, {
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : null,
      headers: headersWithToken,
    });

    console.log(
      "🙆‍♂️ [WillfetchDataBE] fetch가 종료되었습니다. 상태: ",
      response.status
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`❗response is not OK: ${errorMessage}`);
    }

    // Check response body
    const contentLength = response.headers.get("Content-Length");
    const contentType = response.headers.get("Content-Type");

    if (
      contentLength !== "0" &&
      contentType &&
      contentType.includes("application/json")
    ) {
      const fetchedData = await response.json();
      console.log("🙆‍♂️ [WillfetchDataBE] 최종 데이터 ", fetchedData);
      return fetchedData;
    }
    console.log(
      "🙆‍♂️ [WillfetchDataBE] req.body가 비어있습니다! 빈 객체를 반환합니다."
    );
    return {};
  } catch (error) {
    console.error("❗데이터 패칭 중 오류가 발생했습니다:", error);
    throw error;
  }
}

function setTokenIntoHeader(
  headers: Record<string, string>,
  token: string
): Record<string, string> {
  // token setting
  if (token === null || token === undefined) {
    throw new Error(`Token 을 확인해주세요 | token: ${token}`);
  }

  headers["Authorization"] = `Bearer ${token}`;

  // 헤더 체크
  if ("Authorization" in headers) {
    //console.log(
    //   `🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재합니다: ${headers["Authorization"]}`
    // );
    console.log(`🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재합니다`);
  } else {
    console.log("🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재하지 않습니다.");
  }

  return headers;
}
