import request from "../utils/request";

export const loginByPhone = (params: {
  phoneCode: string;
  loginCode: string;
}) => {
  return request.post("/login", params);
};
