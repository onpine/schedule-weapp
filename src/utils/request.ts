import Taro from "@tarojs/taro";
import { BASE_URL } from "../utils/config";
type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestParams {
  url: string;
  method?: Method;
  data?: object;
  header?: object;
}

const request = {
  get(url: string, data?: object, header?: object) {
    return this.request({ url, method: "GET", data, header });
  },
  post(url: string, data?: object, header?: object) {
    return this.request({ url, method: "POST", data, header });
  },
  put(url: string, data?: object, header?: object) {
    return this.request({ url, method: "PUT", data, header });
  },
  delete(url: string, data?: object, header?: object) {
    return this.request({ url, method: "DELETE", data, header });
  },
  request({ url, method = "GET", data = {}, header = {} }: RequestParams) {
    return Taro.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        ...header,
        "content-type": "application/json",
      },
    })
      .then((res) => {
        // 处理请求成功后的逻辑，例如检查登录状态等
        return res.data;
      })
      .catch((err) => {
        // 处理请求失败后的逻辑，例如提示用户等
        console.error("request error:", err);
        throw err;
      });
  },
};

export default request;
