import getAPIendPoint from "@/lib/settingUrl";
import { useState, useEffect } from "react";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

/**
 *
 * @param apiUrl [baseUrl]/api/v2...
 * @returns json 형식으로 파싱된 데이터 | Error
 */
const useFetch = <T>(
  apiUrl: string,
  isTest: boolean | null = null,
  options: FetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetching(apiUrl, isTest, options);
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 에러가 발생했습니다."));
        }
      }
    };
    fetchData();
  }, [apiUrl, isTest]);

  return [data, error] as const;
};

async function fetching(
  apiUrl: string,
  isTest: boolean | null = null,
  options: FetchOptions
) {
  const endpoint = getAPIendPoint(apiUrl, isTest);

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  // Authorization
  const token = process.env.NEXT_PUBLIC_TEST_TOKEN;
  if (token) {
    //(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    (headers as Record<string, string>)["Authorization"] = `${token}`;
  }
  const response = await fetch(endpoint, {
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : null,
  }); //fetch 함수의 응답 객체

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`❗데이터 패칭에 실패하였습니다: ${errorMessage}`);
  }
  const fetchedData = await response.json(); // JSON으로 파싱된 응답 데이터
  //console.log("🙆‍♂️ 데이터를 가져왔습니다!", userData);
  return fetchedData;
}

export default useFetch;
