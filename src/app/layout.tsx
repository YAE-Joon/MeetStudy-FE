import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NextLayout, NextProvider } from "./providers";
// import setTokenintoStyle from "@/lib/designToken/initializeTokens";
import { settingTokenIntoHTML } from "@/lib/designToken/designTokens";

// google font에서 가져와서 적용함
// next/font/google 에서 미리 정의된 모듈.
const inter = Inter({ subsets: ["latin"] });
// 메타데이터 설정
export const metadata: Metadata = {
  title: "밋스터디",
  description: "함께 공부하는 온라인 스터디룸, 밋스터디",
};

// 모든 페이지에서 공통적으로 적용되는 HTML 구조와 스타일을 설정하는 컴포넌트
// 하위 컴포넌트를 <body>태그 안에 삽입하며 랜더링한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{settingTokenIntoHTML}</style>
      </head>
      <body className={inter.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
