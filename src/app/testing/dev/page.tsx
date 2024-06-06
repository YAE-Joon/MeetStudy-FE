import TESTDataFetching from "@/app/testing/dev/dataTest";
import CookieSC from "./cookieTest";
import { cookies } from "next/headers";
export default function TestPage() {
  return (
    <div>
      <h1>개발 중인 페이지입니다.</h1>
      <CookieSC />
      <TESTDataFetching />
    </div>
  );
}
