import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import { getListGroup } from "../../services/index";
import "./index.less";
import { userId } from "../../utils";

function Group() {
  const [groups, setGroups] = useState<any[]>([]);

  // const follows = [
  //   {
  //     avatar: "https://picsum.photos/48/48",
  //     name: "前端小组",
  //     handle: "@xiaoming",
  //     followed: false,
  //   },
  //   {
  //     avatar: "https://picsum.photos/48/48",
  //     name: "测试小组",
  //     handle: "@xiaohong",
  //     followed: false,
  //   },
  // ];

  useEffect(() => {
    getListGroup({ user_id: userId }).then((res) => {
      console.log(res);
      if (res?.state == 200) {
        setGroups(res?.groups);
      }
    });
  }, []);

  return (
    <View className="Group">
      <View className="add-group">
        <View
          className="at-icon at-icon-add"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/addGroup/index",
            });
          }}></View>
      </View>
      <View className="title">我的群组</View>
      <View className="group-list">
        {groups.map((group, index) => (
          <View
            key={index}
            className="group-item"
            onClick={() => {
              if (group?.isadmin === 0) return;
              Taro.navigateTo({
                url: `/pages/addGroup/index?id=${group?.group_id}&name=${group?.name}&members=[]`,
              });
            }}>
            <Text className="group-name">{group.name}</Text>
            <View className="at-icon at-icon-chevron-right"></View>
          </View>
        ))}
      </View>
      {/* <View className="title">加入群组</View>
      <View className="follow-list">
        {follows.map((follow, index) => (
          <View key={index} className="follow-item">
            <View className="follow-info">
              <Text className="follow-name">{follow.name}</Text>
              <Text className="follow-handle">{follow.handle}</Text>
            </View>
            <View className="follow-button">
              <Text className="follow-button-text">
                {follow.followed ? "已关注" : "同意"}
              </Text>
            </View>
          </View>
        ))}
      </View> */}
    </View>
  );
}

export default Group;
