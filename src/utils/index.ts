import Taro from "@tarojs/taro";

export const userId = JSON.parse(Taro.getStorageSync("userInfo" || "{}"))?.user_id;
