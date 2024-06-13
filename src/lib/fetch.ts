import getApiPath from "@/lib/settingUrl";
import { FetchOptions } from "@/lib/types";

/**
 *
 * @param apiUrl
 * @param options
 * @param token
 * @returns
 */
async function fetchDataBE(
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

  try {
    // console.log(
    //   `🙆‍♂️ [fetchDataBE] fetch를 시작합니다. 요청받은 옵션: \napiUrl: ${apiUrl} \nmethod: ${
    //     options.method || "GET"
    //   } \nheaders: ${JSON.stringify(headersWithToken, null, 2)} \nbody: ${
    //     typeof options.body === "object"
    //       ? JSON.stringify(options.body, null, 2)
    //       : options.body
    //   }`
    // );
    console.log(
      `🙆‍♂️ [fetchDataBE] fetch를 시작합니다. 요청받은 옵션: \napiUrl: ${apiUrl}`
    );

    const response = await fetch(apiPath, {
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : null,
      headers: headersWithToken,
    });

    console.log(
      "🙆‍♂️ [fetchDataBE] fetch가 종료되었습니다. 상태: ",
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
      //console.log("🙆‍♂️ [fetchDataBE] 최종 데이터 ", fetchedData);
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
    console.log(
      `🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재합니다: ${headers["Authorization"]}`
    );
  } else {
    console.log("🙆‍♂️ [fetchDataBE] Authorization 헤더가 존재하지 않습니다.");
  }

  return headers;
}
