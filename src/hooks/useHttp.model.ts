export type SendRequest = (
  url: string,
  method?: "GET" | "DELETE" | "POST" | "PATCH",
  body?: BodyInit | null,
  headers?: Headers | {},
  isText?: boolean
) => {};

export type ClearError = () => void;
