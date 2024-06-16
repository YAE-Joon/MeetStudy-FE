import { cookies } from "next/headers";

/**
 * @returns token
 */
export default function getTokenByServer() {
  const cookieStore = cookies();
  try {
    if (!cookieStore.has("accessToken")) {
      throw new Error("액세스 토큰 쿠키가 없습니다");
    }
    const tokenCookie = cookieStore.get("accessToken");
    if (!tokenCookie || !tokenCookie.value) {
      throw new Error(
        `액세스 토큰 쿠키가 undefined | null 입니다! token: ${tokenCookie}`
      );
    }
    return tokenCookie.value;
  } catch (err) {
    if (err instanceof Error && err.message === "액세스 토큰 쿠키가 없습니다") {
      throw new Error("액세스 토큰을 가져오지 못했습니다: 쿠키가 없습니다");
    } else {
      throw new Error(
        `액세스 토큰을 가져오는 동안 예상치 못한 오류가 발생했습니다(1): ${
          (err as Error).message
        }`
      );
    }
  }
}
