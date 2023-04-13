import Taro from "@tarojs/taro";
import React from "react";
import { View, Button } from "@tarojs/components";
import { loginByPhone } from "../../services/index";
import "./index.less";

const LoginPage: React.FC = () => {
  const onLogin = (phoneCode) => {
    Taro.login()
      .then(({ code: loginCode }) => {
        console.log(phoneCode, loginCode);
        loginByPhone({
          phoneCode,
          loginCode,
        }).then((res) => {
          console.log(res);
          if (res.state === 200) {
            const { token, ...userInfo } = res.info;
            Taro.setStorageSync("token", res?.info?.token);
            Taro.setStorageSync("userInfo", JSON.stringify(userInfo));
            Taro.switchTab({
              url: "/pages/index/index",
            });
          }
        });
      })
      .catch(() => {
        Taro.showToast({
          title: "获取微信用户登录凭证失败",
          icon: "none",
        });
      });
  };

  const handleGetPhoneNumber = (e: any) => {
    if (e.detail.code) onLogin(e.detail.code);
  };

  return (
    <View
      className="login-page"
      style={{
        backgroundColor: "#1da1f2",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View className="logo"></View>
      <View
        className="title"
        style={{ color: "#ffffff", fontSize: "32px", marginTop: "20px" }}>
        Nice to see you
      </View>
      <Button
        className="login-button"
        openType="getPhoneNumber"
        onGetPhoneNumber={handleGetPhoneNumber}
        style={{
          width: "200px",
          marginTop: "50px",
          backgroundColor: "#ffffff",
          color: "#1da1f2",
          borderRadius: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}>
        微信用户一键登录
      </Button>
    </View>
  );
};

export default LoginPage;
