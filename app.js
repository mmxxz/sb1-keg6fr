App({
  globalData: {
    userInfo: null,
    projects: [],
    timeEntries: []
  },

  onLaunch() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 初始化示例数据
    this.initMockData()
  },

  initMockData() {
    this.globalData.projects = [
      {
        id: 'PRJ001',
        name: '系统升级',
        type: '技术开发',
        description: '系统升级项目',
        leader: '张三',
        approver: '李四',
        status: '进行中',
        plannedHours: 160
      },
      {
        id: 'PRJ002',
        name: '市场调研',
        type: '市场营销',
        description: '市场调研项目',
        leader: '王五',
        approver: '赵六',
        status: '待审批',
        plannedHours: 80
      }
    ]

    this.globalData.timeEntries = [
      {
        id: 1,
        date: '2024-01-15',
        projectId: 'PRJ001',
        projectName: '系统升级',
        taskName: '前端开发',
        normalHours: 8,
        overtimeHours: 2,
        description: '完成登录页面开发'
      }
    ]
  }
})