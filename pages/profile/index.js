Page({
  data: {
    userInfo: null,
    needTimeEntry: false,
    todayHours: 0
  },

  onLoad() {
    this.loadUserInfo();
    this.checkTimeEntry();
  },

  onShow() {
    this.checkTimeEntry();
  },

  loadUserInfo() {
    // 模拟加载用户信息
    const userInfo = {
      id: 'EMP001',
      name: '张三',
      avatar: '/assets/images/avatar1.png',
      department: '技术部',
      position: '高级开发工程师',
      joinDate: '2020-01-15',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      supervisor: '李四',
      workYears: 5
    };

    this.setData({ userInfo });
  },

  checkTimeEntry() {
    const app = getApp();
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = app.globalData.timeEntries.filter(
      entry => entry.date === today
    );

    const todayHours = todayEntries.reduce(
      (total, entry) => total + entry.normalHours + entry.overtimeHours,
      0
    );

    this.setData({
      needTimeEntry: todayHours === 0,
      todayHours
    });

    if (todayHours === 0) {
      wx.showToast({
        title: '请及时填写今日工时',
        icon: 'none',
        duration: 3000
      });
    }
  },

  goToTimeEntry() {
    wx.switchTab({
      url: '/pages/timeEntry/index'
    });
  },

  showUserDetail() {
    wx.navigateTo({
      url: '/pages/profile/detail'
    });
  },

  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息和登录状态
          const app = getApp();
          app.globalData.userInfo = null;
          
          wx.reLaunch({
            url: '/pages/login/index'
          });
        }
      }
    });
  }
});