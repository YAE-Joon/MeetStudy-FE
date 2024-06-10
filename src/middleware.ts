import { isLoggedIn, setLoginStateforDev } from "@/lib/middlewares";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(
    "🤠 미들웨어의 코드가 실행되었습니다 | 요청 받은 경로: ",
    req.nextUrl.pathname
  );

  console.log(
    "🤠 미들웨어의 코드가 실행되었습니다 | 요청 받은 경로: ",
    req.nextUrl.pathname
  );

  const matchedPath = req.nextUrl.pathname;
  const response = NextResponse.next();
  setLoginStateforDev(req); // 임시, 항상 로그인 상태가 됨.

  if (matchedPath.startsWith("/")) {
    console.log("🤠 / url로 들어왔습니다.");
    if (!isLoggedIn(req)) {
      // 로그인 상태가 아니라면
      console.log("🤠 로그인 상태가 아닙니다! 랜딩 페이지로 이동합니다... ");

      return NextResponse.redirect(new URL("/landing", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/testing/dev")) {
    console.log("🤠 테스트 url로 들어왔습니다.");
  }

  return response;
}

export const config = {
  // / 와 /testing 으로 오는 오는 요청에서만 미들웨어를 실행합니다.
  matcher: ["/", "/testing/:path*"],
};
