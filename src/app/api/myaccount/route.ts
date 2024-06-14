// //테스트용, 임시
// import { NextRequest, NextResponse } from "next/server";
// import { UserProfile } from "@/types/User";
// // fetching from backend or
// // user login info from server

// const getUserProfile = async () => {
//   // axios? 뭘 쓸까/
//   // 혹은 로그인한 유저의 정보를 캐싱하고 있다면 그것을 가져옴
//   console.log(
//     "👩‍💻 서버에서 myaccount에 데이터 요청을 받아서 데이터를 가져옵니다.."
//   );

//   const dummyUserProfile: UserProfile = {
//     email: "더미이메일@gggg",
//     username: "김토끼",
//     nickname: "레이서",
//     password: "1234",
//     interests: ["백엔드", "인프라", "네트워크"],
//   };

//   const userProfile = dummyUserProfile;
//   return userProfile;
// };

// export async function GET(request: NextRequest) {
//   console.log("👩‍💻 Myaccount | GET요청을 받았습니다..");
//   const userProfile = await getUserProfile();
//   console.log(
//     "👩‍💻 Next서버에서 myaccount|GET요청을 받았습니다..userInfo 받기 성공.",
//     userProfile
//   );
//   return NextResponse.json(userProfile);
// }

// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   const { username, nickname, password, interests } = body;
//   const updateUserProfile = { username, nickname, password, interests };

//   console.log(
//     "👩‍💻 Next서버에서 myaccount|PUT요청을 받았습니다.. editedUserInfo 받기 성공.",
//     updateUserProfile
//   );

//   return NextResponse.json({ message: "User Info 업데이트 성공" });
// }

// const updateUserInfoToBack = async (editedUserInfo: UserProfile) => {};
