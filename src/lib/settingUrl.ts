/**
 *
 * @param api : "/api/..."
 * @returns
 */
const getAPIendPoint = (api: string, isSWTest: boolean | null = null) => {
  let baseUrl;

  if (isSWTest) {
    //VM과 기본 연결 테스트
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    return `${baseUrl}${api}`;
  }

  if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    baseUrl = process.env.NEXT_DEV_API_URL || "http://localhost:3000";
  }

  console.log("요청 주소:", baseUrl, "| 최종", `${baseUrl}${api}`);

  return `${baseUrl}${api}`;
};

export default getAPIendPoint;
