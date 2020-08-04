export function showFail(failMessage) {
  wx.showToast({
    title: failMessage,
    duration: 3000,
    icon: "none",
  });
}

export function showSucc(succMessage) {
  wx.showToast({
    title: succMessage,
    duration: 3000,
    icon: "none",
  });
}
