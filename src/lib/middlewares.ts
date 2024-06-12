import { NextRequest } from "next/server";

/** 미들웨어에서 사용되는 함수들 */

export const isLoggedIn = (req: NextRequest) => {
  //if (process.env.NODE_ENV === "development") {
  console.log("🙌 | accessToken 쿠키로 로그인 상태를 확인합니다.");
  const loginCookie = req.cookies.get("accessToken");
  return loginCookie;
};
