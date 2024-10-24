Page({
  data: {
    userInfo: null
  },

  onLoad() {
    this.loadUserDetail();
  },

  loadUserDetail() {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    
    if (userInfo) {
      this.setData({ userInfo });
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
    }
  },

  makePhoneCall() {
    const { phone } = this.data.userInfo;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },

  copyEmail() {
    const { email } = this.data.userInfo;
    wx.setClipboardData({
      data: email,
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        });
      }
    });
  }
});