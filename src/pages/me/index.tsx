// import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.less";

export default function ProfilePage() {
  // const handleLogout = () => {
  //   // 处理退出登录逻辑
  // };

  return (
    <View className="profile-page">
      <View className="header">
        <Image
          className="avatar"
          src="https://n.sinaimg.cn/sinakd20210815ac/448/w1024h1024/20210815/aa5e-8f81c276417a5eac1f76d6cf8b0e4a29.jpg"
        />
        <Text className="name">Elon Musk</Text>
      </View>
      <View className="content">
        <View className="item">
          <Text className="label">手机号</Text>
          <Text className="value">+1 650-681-5100</Text>
        </View>
        <View className="item">
          <Text className="label">地址</Text>
          <Text className="value">Los Angeles, CA</Text>
        </View>
        <View className="item">
          <Text className="label" style={{ color: "red" }}>
            退出登录
          </Text>
          <View className="at-icon at-icon-trash"></View>
        </View>
      </View>
    </View>
  );
}
