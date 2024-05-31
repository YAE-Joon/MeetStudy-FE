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
    console.log("👩‍💻 | isServer :", isServer);

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

        console.log("👩‍💻 | 디자인 토큰이 서버에서 로드되었어요.");

        const generateTsFile = () => {
          const jsonFileData = fs.readFileSync(jsonFilePath, "utf-8");
          const jsonData = JSON.parse(jsonFileData);
          const tsVarContents = jsonToTypescript(
            jsonData,
            "DesignTokenVarNames"
          );
          console.log("👩‍💻 : 서버에서 세팅에 필요한 문자열을 생성합니다.");
          const cssVarsString = setTokenintoStyle(jsonData);
          const tsContent = `${tsVarContents}\n\n${cssVarsString}`;
          console.log("👩‍💻 : 서버에서 세팅을 위한 파일을 생성합니다..");
          fs.writeFileSync(tsFilePath, tsContent);
        };

        generateTsFile();
        console.log("👩‍💻 :", "세팅이 완료되었습니다.");
      }
    }

    return config;
  },
};

export default nextConfig;
