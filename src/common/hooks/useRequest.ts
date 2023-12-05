import { useState } from "react";

export function useRequest<T>(
  url: string,
  method: HttpMethod,
  onComplete: (result: T) => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const callback = async (options: Options) => {
    const requestUrl = `${process.env.REACT_APP_MAILLARD_API_BASE_URI}${url}`;
    const requestOptions: RequestInit = {
      method,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      }),
    };

    if (options.body) {
      requestOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(requestUrl, requestOptions);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error);
      }
      onComplete(json);
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

  return { callback, loading, error };
}

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface Options {
  body: object;
}
