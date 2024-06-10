"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(300); // 5분(300초) 타이머
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValidEmail && value.length > 0);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/request", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "서버 요청에 실패함");
      }

      setStep(2);
      setStatus("인증 번호가 전송되었습니다.");
      setTimer(300); // 타이머를 5분으로 리셋
    } catch (error) {
      console.error("인증 요청 실패:", error);
      setStatus("인증 요청에 실패했습니다.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "서버 요청에 실패함");
      }

      setStatus("이메일 인증에 성공했습니다.");
      router.push(`/users/signup?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("인증 실패:", error);
      setStatus("인증에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setStatus("인증 번호가 만료되었습니다. 다시 시도하세요.");
      setStep(1);
    }
  }, [step, timer]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[90vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-bold text-gray-600">
          회원가입
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          회원가입 방식을 선택해주세요
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <div>
            {step === 1 && (
              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      emailError ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="이메일 주소를 입력하세요"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">
                      이메일 형식이 다릅니다
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white flex gap-2 bg-[#52C233] hover:bg-[#5abe3e]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                >
                  인증 메일 발송하기
                </button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-700"
                  >
                    인증 번호
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="인증번호를 입력하세요"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white flex gap-2 bg-[#52C233] hover:bg-[#5abe3e]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                >
                  인증
                </button>
                <div>
                  <p>
                    남은 시간: {Math.floor(timer / 60)}:
                    {("0" + (timer % 60)).slice(-2)}
                  </p>
                </div>
              </form>
            )}
            {status && <p>{status}</p>}
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-600">또는</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button
            type="button"
            className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <AiOutlineGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
          <button
            type="button"
            className="text-white flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
          >
            <SiNaver className="w-4 h-4" />
            Sign in with Naver
          </button>
          <button
            type="button"
            className="text-black flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
          >
            <RiKakaoTalkFill className="w-6 h-6" />
            Sign in with Kakao
          </button>
        </div>
      </div>
    </div>
  );
}
