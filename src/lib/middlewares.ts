import { NextRequest } from "next/server";

/** 미들웨어에서 사용되는 함수들 */

// 개발용: 임시로 로그인 상태로 세팅합니다.
export const setLoginStateforDev = (req: NextRequest) => {
  console.log("🙌 | Dev mode : 일시적으로 로그인 상태로 세팅합니다(by 쿠키)");
  req.cookies.set("login", "true");
  console.log("🙌 | Dev mode : 쿠키가 세팅되었습니다.");
  return req;
};

export const isLoggedIn = (req: NextRequest) => {
  if (process.env.NODE_ENV === "development") {
    console.log("🙌 | 임시 : 쿠키로 로그인 상태를 확인합니다.");
    const loginCookie = req.cookies.get("login");
    return loginCookie && loginCookie.value === "true";
  } else {
    console.log(
      "🙌 | 개발 : 아직 로그인 상태 체크 여부가 설정되지 않았습니다."
    );
    return false;
  }
};
