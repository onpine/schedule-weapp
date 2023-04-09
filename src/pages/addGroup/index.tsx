import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Form } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./index.less";

function ScheduleForm() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content });
    Taro.switchTab({
      url: "/pages/group/index",
    });
  };

  return (
    <View className="addGroup">
      <Form onSubmit={handleSubmit}>
        <View className="form-item">
          <AtInput
            name="content"
            type="text"
            placeholder="请输入群组名称"
            value={content}
            onChange={(value: string) => {
              setContent(value);
            }}
          />
        </View>
        <View className="title">成员列表</View>
        <View className="members">
          <View className="member">@瘦成闪电</View>
          <View className="member">@瘦成闪电</View>
          <View className="member">@瘦成闪电</View>
        </View>
        <AtInput
          clear
          name="ss"
          type="text"
          maxLength={20}
          placeholder="请输入成员ID"
          value={name}
          onChange={(v: string) => {
            setName(v);
          }}>
          <View className="at-icon at-icon-add-circle"></View>
        </AtInput>

        <AtButton className="submit" type="primary" formType="submit">
          保存
        </AtButton>
      </Form>
    </View>
  );
}

export default ScheduleForm;
