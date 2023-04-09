export default {
  pages: [
    "pages/index/index",
    "pages/addGroup/index",
    "pages/addSchedule/index",
    "pages/group/index",
    "pages/login/index",
    "pages/me/index",
  ],
  tabBar: {
    color: "#999999",
    selectedColor: "#333333",
    backgroundColor: "#f5f5f5",
    list: [
      {
        pagePath: "pages/index/index",
        text: "日程",
        iconPath: "./assets/首页.png",
        selectedIconPath: "./assets/首页-fill.png",
      },
      {
        pagePath: "pages/group/index",
        text: "群组",
        iconPath: "./assets/朋友.png",
        selectedIconPath: "./assets/朋友-fill.png",
      },
      {
        pagePath: "pages/me/index",
        text: "我的",
        iconPath: "./assets/我的.png",
        selectedIconPath: "./assets/我的-fill.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
