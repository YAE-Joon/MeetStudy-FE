"use client";
import { getUserFromToken } from "@/util/getUserFromToken";
import Cookies from "js-cookie";
/**
 *
 * @returns token
 */
export default function getTokenByClient() {
  try {
    const token = Cookies.get("accessToken");
    //console.log("토큰이 뭐라고 찍혀?", token);

    //console.log("🍪: token | ", token);
    if (token === undefined || token === null) {
      //console.log("토큰이 여기서는 뭐라고 찍혀?", token);
      //문제가 없는데 여기서 오류가 나면 serverside에서 랜더링(1차)될 때 되어서 그럼
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
