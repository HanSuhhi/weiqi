export class Router {
  // 每个页面初始化时都需判断用户是否登陆
  pageInit() {
    var page = Page;
    Page = (options) => {
      // let onLoad = options.onLoad;
      console.log(2222);
      options.onLoad = () => {
        const app = getApp();
        const userInfo = app.globalData.userInfo;
        const routeName = getCurrentPages()[0].route;
        if (
          userInfo.toString() === {}.toString() &&
          routeName !== "pages/index/index"
        ) {
          wx.reLaunch({
            url: "/pages/index/index",
            success: () => {
              wx.showToast({
                title: "请先登陆",
                duration: 3000,
                icon: "none",
              });
            },
          });
        }
      };
      page(options);
    };
  }
}
