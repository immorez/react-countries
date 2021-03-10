import { BASE_URL } from "../hooks/useHttp";

export const fetcher = async (url: string) =>
  await fetch(`${BASE_URL}${url}`)
    .then((response) => response.json())
    .catch((e) => console.log(e));
