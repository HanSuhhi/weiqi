const { showFail } = require("../../common/message");

//index.js
const app = getApp();

Page({
  data: {
    avatarUrl: "./user-unlogin.png",
    userInfo: {},
    logged: false,
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/chooseLib",
      });
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              });
            },
          });
        }
      },
    });
  },

  onGetUserInfo(e) {
    return new Promise(() => {
      if (!this.data.logged && e.detail.userInfo) {
        const userInfo = e.detail.userInfo;
        const form = {
          logged: true,
          avatarUrl: userInfo.avatarUrl,
          city: userInfo.city,
          gender: userInfo.gender,
          nickName: userInfo.nickName,
        };
        return Promise.resolve(form);
      }
    });
  },

  onLogin(e) {
    console.log(3);
    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success: (res) => {
        const openid = res.result.openid;
        return this.onGetUserInfo(e).then((res) => {
          res._openid = openid;
          console.log(res, "rree");
        });
      },
      fail: () => {
        showFail("登陆失败，请重试～");
      },
    });
  },
});
