/** @type {import('next').NextConfig} */

import fs from "fs";
import path from "path";
import { jsonToTypescript, setTokenintoStyle } from "./generateToken.mjs";

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    //console.log("👩‍💻 | isServer :", isServer);

    if (isServer) {
      if (!process.env.TS_FILE_GENERATED) {
        process.env.TS_FILE_GENERATED = "true";
        // window, mac 방어용 수정 코드 (join->resolve)
        const jsonFilePath = path.resolve(
          process.cwd(),
          "public",
          "token.json"
        );
        const tsFilePath = path.resolve(
          process.cwd(),
          "src",
          "lib",
          "designToken",
          "designTokens.ts"
        );

        //console.log("👩‍💻 | 디자인 토큰이 서버에서 로드되었어요.");

        const generateTsFile = () => {
          const jsonFileData = fs.readFileSync(jsonFilePath, "utf-8");
          const jsonData = JSON.parse(jsonFileData);
          const tsVarContents = jsonToTypescript(
            jsonData,
            "DesignTokenVarNames"
          );
          //console.log("👩‍💻 : 서버에서 세팅에 필요한 문자열을 생성합니다.");
          const cssVarsString = setTokenintoStyle(jsonData);
          const tsContent = `${tsVarContents}\n\n${cssVarsString}`;
          //console.log("👩‍💻 : 서버에서 세팅을 위한 파일을 생성합니다..");
          fs.writeFileSync(tsFilePath, tsContent);
        };

        generateTsFile();
        console.log("👩‍💻 :", "세팅이 완료되었습니다.");
      }
    }

    return config;
  },
  //next.js 의 cors 에러 방지용
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path",
  //       destination: `${process.env.NEXT_PUBLIC_SITE_URL}:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
