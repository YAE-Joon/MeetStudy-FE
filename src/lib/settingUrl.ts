import { APIRequestConfig } from "@/lib/types";
// base url 만 세팅하는 함수
/**
 *
 * @param api : "/api/..."
 * @returns
 */
const buildBaseUrl = (isNextTest: boolean | null = null) => {
  let baseUrl;

  if (isNextTest) {
    //Next 웹서버로 테스트를 돌릴 때
    baseUrl = "http://localhost:3000";
    // console.log("[BaseURL/테스트]:", baseUrl, isNextTest);
    // return baseUrl;
  }

  if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    baseUrl = process.env.NEXT_DEV_API_URL || process.env.NEXT_PUBLIC_SITE_URL;
  }

  //console.log("[BaseURL/테스트]:", baseUrl, isNextTest);

  return baseUrl;
};

// endpoint를 세팅하는 함수

const buildEndPoint = (config: APIRequestConfig, params: string[]) => {
  if (!config.hasParam) {
    return config.url;
  }

  let url = config.url;

  params.forEach((param) => {
    url = url.replace(/{[^}]+}/, param);
  });

  return url;
};

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: Record<string, any>;
}
/**
 *
 * @param path
 * @param isNextTest (옵션: next.js 웹서버용)
 * @returns
 */
const getApiPath = (path: string, isNextTest: boolean | null = null) => {
  const baseUrl = buildBaseUrl(isNextTest);
  const endPoint = path;
  const res = `${baseUrl}${endPoint}`;
  //console.log("최종 API path:", res);
  return res;
};
export default getApiPath;
