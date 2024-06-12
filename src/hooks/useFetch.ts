"use client";
import { useState, useEffect } from "react";
import { FetchOptions } from "@/lib/types";
import fetchDataBE from "@/lib/fetch";
import getTokenByClient from "@/util/getTokenByClient";

/**
 *
 * @param apiUrl
 * @param options
 * @returns [data, error, loading]
 */
const useFetch = <T>(apiUrl: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = getTokenByClient();
        console.log(
          "useFetch에서 데이터를 호출합니다: apiUrl, options,token",
          apiUrl,
          options,
          token
        );
        const data = await fetchDataBE(apiUrl, options, token);
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 에러가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [apiUrl]);

  //console.log("[useFetch.ts] data?", data);

  return [data, error, loading] as const;
};

export default useFetch;
