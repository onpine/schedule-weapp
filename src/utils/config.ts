const baseUrls = {
  development: "http://zinchon.com:334",
  production: "http://zinchon.com:334",
};

export const BASE_URL = baseUrls[process.env.NODE_ENV];
