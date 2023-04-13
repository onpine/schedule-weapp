import { useEffect, useState } from "react";
import { View, Form, Picker } from "@tarojs/components";
import { AtInput, AtList, AtListItem, AtButton } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import dayjs from "dayjs";
import { postSchedule, getListGroup } from "../../services/index";
import { userId } from "../../utils/index";
import "./index.less";

function ScheduleForm() {
  const { params = { id: "", info: "{}" } } = useRouter();
  const info = JSON.parse(params.info || "{}");

  const [content, setContent] = useState(info?.describe || "");
  const [date, setDate] = useState(info?.date);
  const [startTime, setStartTime] = useState(dayjs(info?.start_time).format("HH:mm"));
  const [endTime, setEndTime] = useState(dayjs(info?.finish_time).format("HH:mm"));
  const [groups, setGroups] = useState<any[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(info?.group_id);

  useEffect(() => {
    getListGroup({ user_id: userId }).then((res) => {
      console.log(res);
      if (res?.state == 200) {
        setGroups(res?.groups);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content, date, startTime, endTime });
    if (!groupId || !content) {
      Taro.showToast({ title: "请填写完整信息" });
      return;
    }
    postSchedule({
      describe: content,
      date: date,
      start_time: `${date} ${startTime}:00`,
      finish_time: `${date} ${endTime}:00`,
      user_id: userId,
      group_id: groupId,
      schedule_id: params?.id,
    }).then((res) => {
      if (res?.state === 200) {
        Taro.showToast({
          title: "提交成功",
        });
        Taro.reLaunch({
          url: "/pages/index/index",
        });
      }
    });
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
            mode="selector"
            range={groups?.map((el) => el?.name)}
            onChange={(e) => {
              setGroupName(groups[e.detail.value]?.name);
              setGroupId(groups[e.detail.value]?.group_id);
            }}>
            <AtList>
              <AtListItem title="群组" extraText={groupName || "请选择"} />
            </AtList>
          </Picker>
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
