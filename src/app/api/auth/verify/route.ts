import { NextRequest, NextResponse } from "next/server";
import { getOtp, deleteOtp } from "../../../../lib/otpStore";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { message: "유효한 요청입니다." },
      { status: 400 }
    );
  }

  const storedOtp = getOtp(email);

  if (storedOtp !== otp) {
    return NextResponse.json(
      { message: "인증 번호가 유효하지 않습니다." },
      { status: 400 }
    );
  }

  deleteOtp(email); // 인증 번호 사용 후 삭제

  // 인증 성공 처리 로직을 여기에 추가하세요 (예: 사용자 상태 업데이트)

  return NextResponse.json(
    { message: "이메일 인증에 성공했습니다." },
    { status: 200 }
  );
}
