import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

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
            <button type="button">
              {/* onClick={() => signOut()} */}
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
          <Link href="/users/login" className="navbar__list--item">
            회원가입
          </Link>
        </div>
        {/* mobile button */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* mobile button */}
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
              className="navbar__list--item"
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
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
