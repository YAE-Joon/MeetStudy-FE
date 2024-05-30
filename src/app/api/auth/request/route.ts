import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveOtp } from "../../../../lib/otpStore";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { message: "유효한 이메일을 입력하세요." },
      { status: 400 }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 OTP 생성
  saveOtp(email, otp);

  try {
    await sendOtpEmail(email, otp);

    return NextResponse.json(
      { message: "인증 번호가 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}

async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  const mailData = {
    to: email,
    subject: "인증 번호",
    html: `
      <h1>인증 번호</h1>
      <p>다음 인증 번호를 입력하세요: <strong>${otp}</strong></p>
    `,
  };

  return transporter.sendMail(mailData);
}
