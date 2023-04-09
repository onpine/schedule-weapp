import { useState } from "react";
import { View, Form, Picker } from "@tarojs/components";
import { AtInput, AtList, AtListItem, AtButton } from "taro-ui";
import "./index.less";

function ScheduleForm() {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("2023-04-08");
  const [startTime, setStartTime] = useState("12:01");
  const [endTime, setEndTime] = useState("12:01");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content, date, startTime, endTime });
  };

  return (
    <View className="addSchedule">
      <Form onSubmit={handleSubmit}>
        <View className="form-item">
          <AtInput
            name="content"
            type="text"
            placeholder="请输入日程主题"
            value={content}
            onChange={(value: string) => {
              setContent(value);
            }}
          />
        </View>
        <View className="form-item">
          <Picker
            mode="date"
            value={date}
            onChange={(e) => {
              setDate(e.detail.value);
            }}>
            <AtList>
              <AtListItem title="日程日期" extraText={date} />
            </AtList>
          </Picker>
        </View>
        <View className="form-item">
          <Picker
            mode="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.detail.value);
            }}>
            <AtList>
              <AtListItem title="开始时间" extraText={startTime} />
            </AtList>
          </Picker>
        </View>
        <View className="form-item">
          <Picker
            mode="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.detail.value);
            }}>
            <AtList>
              <AtListItem title="结束时间" extraText={endTime} />
            </AtList>
          </Picker>
        </View>
        <AtButton className="submit" type="primary" formType="submit">
          提交
        </AtButton>
      </Form>
    </View>
  );
}

export default ScheduleForm;
