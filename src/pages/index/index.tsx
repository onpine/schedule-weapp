// import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import { userId } from "../../utils";
import { TimePicker } from "../../components/TimePicker";
import { getScheduleList, postSchedule } from "../../services/index";
import "./index.less";

function Home() {
  const [isOpened, setIsOpen] = useState<any>("");
  const [schedules, setSchedules] = useState<any>([]);
  const [info, setInfo] = useState<any>({});
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const onSetting = (id, obj) => {
    setIsOpen(id);
    setInfo(obj);
  };

  const handleDelete = () => {
    postSchedule({ schedule_id: isOpened }).then((res) => {
      if (res?.state === 200) {
        setIsOpen("");
        setInfo({});
        Taro.showToast({
          title: "删除成功",
        });
        setTimeout(() => {
          getData();
        }, 1000);
      }
    });
  };

  const handleEdit = () => {
    setIsOpen("");
    setInfo({});
    Taro.navigateTo({
      url: `/pages/addSchedule/index?id=${isOpened}&info=${JSON.stringify(info)}`,
    });
  };

  const getData = useCallback(() => {
    getScheduleList({ user_id: userId, date: date }).then((res) => {
      if (res.state === 200) {
        setSchedules(res?.schedules);
      }
    });
  }, [date]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View className="home">
      <View className="topTime">
        <TimePicker
          onChange={(d: any) => {
            setDate(dayjs(d.toLocaleDateString()).format("YYYY-MM-DD"));
          }}
        />
      </View>

      <View className="add-schedule">
        <View
          className="at-icon at-icon-add"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/addSchedule/index",
            });
          }}></View>
      </View>
      <View className="content">
        {schedules?.map((el) => (
          <ScheduleCard
            key={el?.schedule_id}
            id={el?.schedule_id}
            description={el?.describe}
            startDate={el?.date}
            startTime={dayjs(el?.start_time).format("HH:mm")}
            endTime={dayjs(el?.finish_time).format("HH:mm")}
            source={`@${el?.group_id}`}
            item={el}
            onSetting={onSetting}
          />
        ))}
      </View>

      <AtActionSheet
        isOpened={!!isOpened}
        cancelText="取消"
        title={info?.description}
        onClose={() => {
          setIsOpen("");
          setInfo({});
        }}>
        <AtActionSheetItem onClick={handleEdit}>修改</AtActionSheetItem>
        <AtActionSheetItem onClick={handleDelete}>
          <Text style={{ color: "#FF5353" }}>删除</Text>
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
}

const ScheduleCard = ({
  id,
  description,
  startDate,
  startTime,
  endTime,
  source,
  onSetting,
  item,
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
            onSetting(id, item);
          }}></View>
      </View>
    </View>
  </View>
);

export default Home;
