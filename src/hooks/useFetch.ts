import getAPIendPoint from "@/lib/settingUrl";
import { useState, useEffect } from "react";

/**
 *
 * @param apiUrl [baseUrl]/api/v2...
 * @returns json 형식으로 파싱된 데이터 | Error
 */
const useFetch = <T>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetching(apiUrl);
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
  }, [apiUrl]);

  return [data, error] as const;
};

async function fetching(apiUrl: string) {
  const endpoint = getAPIendPoint(apiUrl); // 테스트용, 넥스트서버로
  const response = await fetch(endpoint); //fetch 함수의 응답 객체

  if (!response.ok) {
    throw new Error("❗데이터 패칭에 실패하였습니다!");
  }
  const fetchedData = await response.json(); // JSON으로 파싱된 응답 데이터
  //console.log("🙆‍♂️ 데이터를 가져왔습니다!", userData);
  return fetchedData;
}

export default useFetch;
