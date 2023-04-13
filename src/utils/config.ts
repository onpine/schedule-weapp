const baseUrls = {
  development: "http://zinchon.com:334",
  production: "http://127.0.0.1",
};

export const BASE_URL = baseUrls[process.env.NODE_ENV];
