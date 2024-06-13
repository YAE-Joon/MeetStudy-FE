"use client";
import { useState, useEffect } from "react";
import { FetchOptions } from "@/lib/types";
import fetchDataBE from "@/lib/fetch";
import getTokenByClient from "@/util/getTokenByClient";
import { useRouter } from "next/navigation";

interface FetchError extends Error {
  status?: number;
}

interface RemoveStudyRoomError {
  code: string;
  description: string;
}
/**
 *
 * @param apiUrl
 * @param options
 * @returns [data, error, loading]
 */
const useFetch = <T>(apiUrl: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = getTokenByClient();
        console.log(
          "useFetch에서 데이터를 호출합니다: apiUrl,options",
          apiUrl,
          options
        );
        const data = await fetchDataBE(apiUrl, options, token);
        setData(data);
      } catch (err) {
        // if (err instanceof Error) {
        //   setError(err);
        // } else {
        //   setError(new Error("알 수 없는 에러가 발생했습니다."));
        // }
        console.error("❗데이터 패칭 중 오류가 발생했습니다:", err);

        if (err instanceof Error) {
          const fetchError = err as FetchError;
          fetchError.status = (err as any).status;
          setError(fetchError);
        }
        // @ts-ignore
        else if (isRemoveStudyRoommError(err)) {
          if (
            err.code === "404" &&
            err.description === "해당 id의 StudyRoom을 찾을 수 없습니다"
          ) {
            alert(`${err.description} | 메인으로 이동합니다.`);

            router.push("/");
          }
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

  return [data, error, loading, setData] as const;
};

export default useFetch;

const isRemoveStudyRoommError = (err: unknown): err is RemoveStudyRoomError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    "description" in err
  );
};
