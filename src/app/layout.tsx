import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import { NextLayout, NextProvider } from "./providers";
// import setTokenintoStyle from "@/lib/designToken/initializeTokens";
import { settingTokenIntoHTML } from "@/lib/designToken/designTokens";

// google font에서 가져와서 적용함
// next/font/google 에서 미리 정의된 모듈.
const noto_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--notoSans",
});
// 메타데이터 설정
export const metadata: Metadata = {
  title: { default: " 밋스터디", template: " 밋스터디 📗 %s" },
  description: "함께 공부하는 온라인 스터디룸, 밋스터디",
  keywords: ["스터디", "실시간 채팅", "스터디룸"],
  metadataBase: new URL("http://127.0.0.1:3000/"),
  robots: { index: true, follow: true },
  viewport: { width: "device-width", initialScale: 1 },
  creator: "Team09@EliceCloud-02",
  generator: "Next.js",
  applicationName: "MeetStudy",
  category: "동료학습",
  openGraph: {
    type: "website",
    url: "http://127.0.0.1:3000/",
    title: "밋스터디",
    description: "함께 공부하는 온라인 스터디룸, 밋스터디",
    images: [
      {
        url: "http://127.0.0.1:3000/images/logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: "http://127.0.0.1:3000/images/logo.png",
  },
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
        <meta charSet="UTF-8" />
        <style>{settingTokenIntoHTML}</style>
      </head>
      <body className={noto_kr.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
