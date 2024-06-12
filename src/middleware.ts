import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";
import { isLoggedIn } from "@/lib/middlewares";
import { getUserInfoFromToken } from "@/util/getUserInfo";
import { NextRequest, NextResponse } from "next/server";
import { StudyRoom } from "@/types/StudyRoom";
export async function middleware(req: NextRequest) {
  const matchedPath = req.nextUrl.pathname;
  const response = NextResponse.next();

  /** 로그인 여부에 따라 메인화면/랜딩화면으로 */
  if (matchedPath.startsWith("/")) {
    if (!isLoggedIn(req)) {
      // 로그인 상태가 아니라면
      console.log("🤠 로그인 상태가 아닙니다! 랜딩 페이지로 이동합니다... ");
      return NextResponse.redirect(new URL("/landing", req.url));
    }
  }

  /** 스터디룸 하위 페이지 진입 금지 */
  if (req.nextUrl.pathname.startsWith("/studyrooms/")) {
    // 로그인 상태를 확인한다.
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      //로그인 상태가 아니라면(토큰이 없다면)
      console.log("🤠 로그인 상태가 아닙니다! 랜딩 페이지로 이동합니다.");
      return NextResponse.redirect(new URL("/landing", req.url));
    }

    // 접근한 경로가 유효한지 확인한다.
    const studyRoomIdMatch = req.nextUrl.pathname.match(/^\/studyrooms\/(\d+)/);
    if (!studyRoomIdMatch) {
      const alretMessage =
        "유효하지 않은 스터디룸 ID입니다. 메인 페이지로 이동합니다.";
      console.error(alretMessage);
      response.cookies.set("alertMessage", alretMessage, { path: "/" });
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 해당 스터디룸의 멤버인지 확인한다.
    const userEmail = await getUserInfoFromToken(token, "email", true);
    const studyRoomId = studyRoomIdMatch[1];
    const studyRoomList: StudyRoom[] = await fetchDataBE(
      apiPaths.studyrooms.byUser(userEmail),
      {},
      token
    );
    const isMember = studyRoomList.some(
      (room) => room.id === parseInt(studyRoomId, 10)
    );
    if (!isMember) {
      const alretMessage =
        " [❗] 접근 권한이 없습니다. 메인 페이지로 이동합니다.";
      console.error(alretMessage);
      // client에게 알리기 위해 쿠키에 넣는다.
      const newResponse = NextResponse.redirect(new URL("/", req.url));
      newResponse.cookies.set("alertMessage", alretMessage, { path: "/" });
      return newResponse;
    }
  }
  return response;
}

export const config = {
  // 메인(/)과 studyrooms 하위 주소들을 제한한다.
  matcher: ["/", "/studyrooms/:id(\\d+)/:path*"],
};
