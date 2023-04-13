import request from "../utils/request";

export const loginByPhone = (params: { phoneCode: string; loginCode: string }) => {
  return request.post("/login", params);
};

export const getScheduleList = (params: { user_id?: string; date?: string }) => {
  return request.post(`/getschedule`, params);
};

export const postSchedule = (params: {
  schedule_id?: string;
  date?: string;
  describe?: string;
  start_time?: string;
  finish_time?: string;
  user_id?: string;
  group_id?: string;
}) => {
  return request.post(`/schedule`, params);
};

export const getListGroup = (params: { user_id?: string }) => {
  return request.post(`/listgroup`, params);
};

export const postGroup = (params: {
  group_id?: string;
  user_id?: string;
  name?: string;
  member_id?: string[];
}) => {
  return request.post(`/group`, params);
};
