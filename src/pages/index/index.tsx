// import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import "./index.less";

function Home() {
  const [isOpened, setIsOpen] = useState(false);
  const onSetting = () => {
    setIsOpen(true);
  };
  return (
    <View className="home">
      <View className="add-schedule">
        <View
          className="at-icon at-icon-add"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/addSchedule/index",
            });
          }}></View>
      </View>
      <ScheduleCard
        description="参加会议"
        startDate="2021/10/01"
        startTime="8:00"
        endTime="12:00"
        source="公司安排"
        onSetting={onSetting}
      />
      <AtActionSheet
        isOpened={isOpened}
        cancelText="取消"
        title="日程名称"
        onClose={() => {
          setIsOpen(false);
        }}>
        <AtActionSheetItem>修改</AtActionSheetItem>
        <AtActionSheetItem>
          <Text style={{ color: "#FF5353" }}>删除</Text>
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
}

const ScheduleCard = ({
  description,
  startDate,
  startTime,
  endTime,
  source,
  onSetting,
}) => (
  <View className="schedule-card">
    <View className="schedule-header">
      <Text className="schedule-description">{description}</Text>
    </View>
    <View className="schedule-body">
      <View className="schedule-dates">
        <Text className="schedule-start-date">日程时间：{startDate}</Text>
        <Text className="schedule-end-date">
          （ {startTime}-{endTime}）
        </Text>
      </View>
      <View className="schedule-source">
        <View>
          <Text className="schedule-source-label">群组：</Text>
          <Text className="schedule-source-value">{source}</Text>
        </View>
        <View
          className="at-icon at-icon-menu"
          onClick={() => {
            onSetting("id");
          }}></View>
      </View>
    </View>
  </View>
);

export default Home;
