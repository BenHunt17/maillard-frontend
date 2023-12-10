import { useState } from "react";

export function useRequest<T>(
  url: string,
  method: HttpMethod,
  onComplete: (result: T) => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const callback = async (options?: Options) => {
    const requestUrl = `${process.env.REACT_APP_MAILLARD_API_BASE_URI}${url}`;
    const requestOptions: RequestInit = {
      method,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        ...(!options?.formData
          ? { "Content-Type": "application/json;charset=utf-8" }
          : {}),
      }),
    };

    if (options?.body) {
      requestOptions.body = JSON.stringify(options.body);
    }
    if (options?.formData) {
      requestOptions.body = options.formData;
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

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Options {
  body?: object;
  formData?: FormData;
}
