import { useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Form } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import { postGroup } from "../../services/index";
import "./index.less";
import { userId } from "../../utils";

function ScheduleForm() {
  const { params = { id: "", name: "" } } = useRouter();
  const [content, setContent] = useState(params?.name);
  const [name, setName] = useState("");
  const [members, setMembers] = useState<any>([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content });
    postGroup({
      name: content,
      member_id: members?.map((el) => Number(el)),
      user_id: userId,
      group_id: params.id,
    }).then((res) => {
      if (res?.state == 200) {
        Taro.reLaunch({
          url: "/pages/group/index",
        });
      }
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
          {members?.map((el) => (
            <View key={el?.group_id} className="member">
              @{el}
            </View>
          ))}
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
          <View
            className="at-icon at-icon-add-circle"
            onClick={() => {
              setMembers((old: any[]) => {
                return [...old, name];
              });
              setName("");
            }}></View>
        </AtInput>

        <AtButton className="submit" type="primary" formType="submit">
          保存
        </AtButton>
      </Form>
    </View>
  );
}

export default ScheduleForm;
