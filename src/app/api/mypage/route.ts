import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/lib/types";
// fetching from backend or
// user login info from server

let currentUserdata = null;

const getUserInfo = async () => {
  // axios? 뭘 쓸까/
  // 혹은 로그인한 유저의 정보를 캐싱하고 있다면 그것을 가져옴
  console.log("👩‍💻 서버에서 mypage/getUserInfo에 들어왔습니다.");
  const dummyUserData: UserData = {
    email: "더미이메일@gggg",
    username: "김토끼",
    nickname: "레이서",
    password: "1234",
    interests: ["백엔드", "인프라", "네트워크"],
  };

  return dummyUserData;
};

export async function GET(request: NextRequest) {
  console.log("👩‍💻 웹서버에서 mypage, GET요청을 받았습니다..");
  const userInfo = await getUserInfo();
  console.log(
    "👩‍💻 웹서버에서 mypage, GET요청을 받았습니다..userInfo 받기 성공.",
    userInfo
  );
  return NextResponse.json(userInfo);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { username, nickname, password, interests } = body;
  const updateUserData = { username, nickname, password, interests };

  console.log(
    "👩‍💻 next 웹서버에서 mypage, PUT요청을 받았습니다.. editedUserInfo 받기 성공.",
    updateUserData
  );

  return NextResponse.json({ message: "User Info 업데이트 성공" });
}

const updateUserInfoToBack = async (editedUserInfo: UserData) => {};
