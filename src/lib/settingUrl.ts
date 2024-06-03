/**
 *
 * @param api : "/api/..."
 * @returns
 */
const getAPIendPoint = (api: string) => {
  let baseUrl;

  if (process.env.NODE_ENV === "production") {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    baseUrl = process.env.NEXT_DEV_API_URL || "http://localhost:3000";
  }

  return `${baseUrl}${api}`;
};

export default getAPIendPoint;
