"use client";
import { useState, useEffect } from "react";
import { FetchOptions } from "@/lib/types";
import fetchDataBE from "@/lib/fetch";
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
    const loadData = async () => {
      try {
        const data = await fetchDataBE(apiUrl, isTest, options);
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 에러가 발생했습니다."));
        }
      }
    };
    loadData();
  }, [apiUrl, isTest]);

  return [data, error] as const;
};

export default useFetch;
