import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import LoadingTextComponent from "@/component/Loading/LoadingText";
import Cookies from "js-cookie";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { data, status } = useSession();

  if (status === "loading") {
    //로딩 상태일 때에는 아무것도 보이지 않기
    return (
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          <img
            alt="로고 이미지"
            width={200}
            height={40}
            src="/images/logo.png"
          />
        </Link>
        <div className="navbar__list">
          <LoadingTextComponent />
        </div>
      </div>
    );
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setLoginError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://34.47.79.59:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      }

      // 여기에서 로그인에 성공한 경우 처리할 코드 작성
      // 성공 시 로그인 세션 등을 처리할 수 있습니다.
      //console.log("로그인 성공!");
      //console.log(response);
      const responseData = await response.json();

      // accessToken과 accessTokenExpireTime 값을 가져옵니다.
      const { accessToken, accessTokenExpireTime } = responseData.data;

      // accessTokenExpireTime을 JavaScript Date 객체로 변환합니다.
      const expires = new Date(accessTokenExpireTime);

      // 쿠키에 accessToken과 accessTokenExpireTime을 저장합니다.
      document.cookie = `accessToken=${accessToken}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `accessTokenExpireTime=${accessTokenExpireTime}; expires=${expires.toUTCString()}; path=/`;

      // 예시: NextAuth.js를 사용하여 세션을 설정하는 경우
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
      handleModalClose(); // 모달 닫기
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          <img
            alt="로고 이미지"
            width={200}
            height={40}
            src="/images/logo.png"
          />
        </Link>
        <div className="navbar__list">
          {status === "authenticated" ? (
            <>
              <Link href="/studyrooms" className="navbar__list--item">
                스터디룸
              </Link>
              <Link href="/community" className="navbar__list--item">
                커뮤니티
              </Link>
              <Link href="/calendar" className="navbar__list--item">
                캘린더
              </Link>
              <button
                type="button"
                onClick={() => {
                  Cookies.remove("accessToken");
                  signOut();
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="navbar__list--item"
              >
                로그인
              </button>
              <Link href="/users/login" className="navbar__list--item">
                회원가입
              </Link>
            </>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link
              href="/"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              스터디룸
            </Link>
            <Link
              href="/"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              커뮤니티
            </Link>
            <Link
              href="/"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              캘린더
            </Link>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="navbar__list--item--mobile text-left"
              >
                로그아웃
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="navbar__list--item--mobile text-left"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      )}
      <Modal isVisible={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col gap-3 items-center w-64 md:w-[30em]">
          <img
            alt="로고 이미지"
            width={200}
            height={40}
            src="/images/large-logo.svg"
            className="h-[50px] mt-10"
          />
          <h2 className="text-center font-semibold">로그인</h2>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mt-10 flex flex-col gap-3 w-full">
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn text-white mt-[20px] flex gap-2 bg-[#52C233] hover:bg-[#5abe3e]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
            >
              로그인
            </button>
          </form>
          <div className="w-full flex flex-col">
            <Link href="/users/login">
              <button
                type="button"
                className="btn text-[#52C233] flex gap-2 bg-[#fff] border-2 border-[#52C233] hover:border-[#52C233]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                onClick={handleModalClose}
              >
                회원가입
              </button>
            </Link>
          </div>

          <div className="flex items-center w-full">
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
            className="text-white flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg- w-full px-5 py-4 text-center items-center justify-center"
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
      </Modal>
    </>
  );
}
