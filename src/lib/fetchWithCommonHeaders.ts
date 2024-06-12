export const fetchWithCommonHeaders = async (
  url: string,
  options: RequestInit,
  token?: string
) => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const combinedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...authHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, combinedOptions);
  return response;
};
