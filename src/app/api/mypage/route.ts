import { NextRequest, NextResponse } from "next/server";
import { UserCalendar, UserProfile } from "@/lib/types";
// fetching from backend or
// user login info from server
import { UserData } from "@/lib/types";

const getUserData = async () => {
  console.log(
    "👩‍💻 서버에서 mypage에 데이터 요청을 받아서 데이터를 가져옵니다.."
  );
  let userData: UserData = {
    userProfile: null,
    userCalendars: [],
    userScrappedPosts: null,
    userPosts: null,
  };

  const dummyUserProfile: UserProfile = {
    email: "더미이메일@gggg",
    username: "김토끼",
    nickname: "레이서",
    password: "1234",
    interests: ["백엔드", "인프라", "네트워크"],
  };

  const dummyUserCalendar: UserCalendar[] = [
    {
      id: 0,
      title: "스터디 그룹 미팅",
      content: "한국사 스터디 그룹 첫 모임",
      startDay: "20240610",
      endDay: "20240610",
      startTime: "00:19:00",
      endTime: "00:21:00",
      isHoliday: false,
    },
    {
      id: 1,
      title: "한국어 문법 강의",
      content: "한국어 문법 심화 학습",
      startDay: "20240612",
      endDay: "20240612",
      startTime: "18:00:00",
      endTime: "20:00:00",
      isHoliday: false,
    },
    {
      id: 2,
      title: "한국사 시험 준비",
      content: "다음 주 한국사 시험 대비 모의고사",
      startDay: "20240614",
      endDay: "20240614",
      startTime: "14:00:00",
      endTime: "17:00:00",
      isHoliday: false,
    },
    {
      id: 3,
      title: "한국어 회화 연습",
      content: "친구들과 한국어로 자유롭게 대화하기",
      startDay: "20240617",
      endDay: "20240617",
      startTime: "16:00:00",
      endTime: "18:00:00",
      isHoliday: false,
    },
    {
      id: 4,
      title: "한국 문화 체험",
      content: "전통 음식 만들기 체험",
      startDay: "20240620",
      endDay: "20240620",
      startTime: "10:00:00",
      endTime: "12:00:00",
      isHoliday: false,
    },
    {
      id: 5,
      title: "스터디 그룹 미팅",
      content: "한국사 스터디 그룹 두 번째 모임",
      startDay: "20240624",
      endDay: "20240624",
      startTime: "19:00:00",
      endTime: "21:00:00",
      isHoliday: false,
    },
  ];
  userData.userCalendars = dummyUserCalendar;
  userData.userProfile = dummyUserProfile;

  console.log(
    "넥스트 웹서버에서 유저데이터를 요청받았습니다: ",
    userData.userCalendars
  );
  return userData;
};

export async function GET(request: NextRequest) {
  console.log("👩‍💻 Mypage | GET요청을 받았습니다..");
  const userData = await getUserData();
  return NextResponse.json(userData);
}
