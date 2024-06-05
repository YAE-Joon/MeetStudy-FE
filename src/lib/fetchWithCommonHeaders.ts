export const fetchWithCommonHeaders = async (
  url: string,
  options: RequestInit
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const combinedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, combinedOptions);
  return response;
};
