import { useEffect, useState } from "react";
import { useAuth } from "../../core/auth/AuthProvider";

export function useFetch<T>(
  url: string,
  method: HttpMethod,
  options?: {
    queryParams?: Record<string, string>;
    body?: object;
  }
) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { bearerToken } = useAuth();

  const searchParams = options?.queryParams
    ? new URLSearchParams(options.queryParams).toString()
    : undefined;
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  useEffect(() => {
    const request = async () => {
      let requestUrl = `${process.env.REACT_APP_MAILLARD_API_BASE_URI}${url}`;
      const requestOptions: RequestInit = {
        method,
        credentials: "include",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          ...(bearerToken ? { authorization: `Bearer ${bearerToken}` } : {}),
        }),
      };

      if (searchParams) {
        requestUrl += `?${searchParams}`;
      }
      if (body) {
        requestOptions.body = body;
      }

      setLoading(true);

      try {
        const response = await fetch(requestUrl, requestOptions);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error);
        }

        setData(json);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error(JSON.stringify(e)));
        }
      } finally {
        setLoading(false);
      }
    };

    request();
  }, [url, method, body, searchParams, bearerToken]);

  return { data, loading, error, updateResult: setData };
}

type HttpMethod = "GET" | "POST";
