const BASE_URL = (
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN
) as string;

const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
const INCLUDES_FORWARD_SLASH_AT_START = (string: string) => {
  return INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);
};

const getUrl = (path: string) => {
  return `${BASE_URL}${
    !INCLUDES_FORWARD_SLASH_AT_START(path) ? "/" : ""
  }${path}`;
};

export { getUrl, BASE_URL };
