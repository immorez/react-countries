import { useState, useRef, useCallback, useEffect } from "react";
import { SendRequest, ClearError } from "./useHttp.model";

export const BASE_URL = "https://restcountries.eu/rest/v2/";
export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const activeHttpRequest = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {},
      isText = false
    ): Promise<SendRequest> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current!.push(httpAbortCtrl);
      try {
        const response = await fetch(BASE_URL + url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });
        let responseData;
        if (!isText) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  const clearError: ClearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current!.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { sendRequest, error, isLoading, clearError };
};
