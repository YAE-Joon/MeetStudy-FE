import { readFileSync } from "fs";
import path from "path";

/**
 * 디자인 토큰(json)을 가져와서 파싱한다.
 * @returns 파싱된 JSON 데이터
 */
function getDesignToken() {
  const filepath = path.join(process.cwd(), "public", "token.json");
  const fileContents = readFileSync(filepath, "utf-8");
  return JSON.parse(fileContents);
}

/**
 * json 파일의 내용을 문자열로 변환해주는 함수
 * @param jsonObj : Object
 * @returns string
 */
function jsonToCssVars(jsonObj: Object): string {
  const result: string[] = [];

  function processObj(obj: any, prefix: string) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        processObj(obj[key], `${prefix}-${key}`);
      } else {
        //객체가 아닐 경우
        //앞서 존재할 접두사와 현재 key값을 연결
        const varName = `${prefix}-${key}`
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase();
        result.push(`-${varName}:${obj[key]};`);
      }
    }
  }

  processObj(jsonObj, "");
  return result.join("\n");
}

/**
 * 읽어온 토큰에서 <style>태그에 세팅할 문자열을 반환하는 함수
 * @returns string
 */
function setTokenintoStyle() {
  console.log("🦧토큰이 로드되고 변경되었어요");
  const tokens = getDesignToken();
  const cssVars = jsonToCssVars(tokens);
  const connectedStrings = `
  :root{
    ${cssVars}
  }`;

  return connectedStrings;
}

export default setTokenintoStyle;
