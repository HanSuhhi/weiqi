const { Router } = require("./config/routerConfig");

//app.js
App({
  onLaunch: function () {
    // 使用云数据库;
    this.useCloud();
    // 使用promise
    this.usePromise();
    // 路由守卫
    const routerFighter = new Router();
    routerFighter.pageInit();
  },
  globalData: {
    /**
     * 用户信息
     */
    userInfo: {},
  },

  /**
   * 使用云开发
   */
  useCloud() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "hanlaoshi-weiqi-2ol81",
        traceUser: true,
      });
    }
  },
  /**
   * 使用promise
   */
  usePromise() {
    const wxp = {};
    // promisify all wx's api
    promisifyAll(wx, wxp);
    console.log(wxp.getSystemInfoSync());
    wxp.getSystemInfo().then(console.log);
    wxp.showModal().then(wxp.openSetting());

    // compatible usage
    wxp.getSystemInfo({
      success(res) {
        console.log(res);
      },
    });

    // promisify single api
    promisify(wx.getSystemInfo)().then(console.log);
  },
});
