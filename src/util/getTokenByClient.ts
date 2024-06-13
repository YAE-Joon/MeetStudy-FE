"use client";
import Cookies from "js-cookie";
/**
 *
 * @returns token
 */
export default function getTokenByClient() {
  try {
    const token = Cookies.get("accessToken");
    //console.log("🍪: token | ", token);
    if (token === undefined || token === null) {
      throw new Error("액세스 토큰 쿠키가 undefined | null 입니다!");
    }

    //console.log("🍪🍪: token | ", token);

    return token;
  } catch (err) {
    if (err instanceof Error && err.message === "액세스 토큰 쿠키가 없습니다") {
      throw new Error("액세스 토큰을 가져오지 못했습니다: 쿠키가 없습니다");
    } else {
      throw new Error(
        `액세스 토큰을 가져오는 동안 예상치 못한 오류가 발생했습니다(2): ${
          (err as Error).message
        }`
      );
    }
  }
}

// 서버측에서 한번 그려질 때 useEffect밖에 있다면 에러를 일으킴. 주의
