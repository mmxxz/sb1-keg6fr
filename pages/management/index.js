Page({
  data: {
    menuItems: [
      {
        icon: 'time-log',
        text: '工时日志',
        url: '/pages/timeEntry/log'
      },
      {
        icon: 'project',
        text: '项目创建',
        url: '/pages/project/create'
      },
      {
        icon: 'approval',
        text: '审批',
        url: '/pages/approval/index'
      },
      {
        icon: 'team',
        text: '我的项目组',
        url: '/pages/team/index'
      }
    ],
    teamTimeEntries: []
  },

  onLoad() {
    this.loadTeamTimeEntries();
  },

  loadTeamTimeEntries() {
    // 模拟加载团队工时数据
    const entries = [
      {
        id: 1,
        name: '张三',
        avatar: '/assets/images/avatar1.png',
        time: 8,
        project: '系统升级'
      },
      {
        id: 2,
        name: '李四',
        avatar: '/assets/images/avatar2.png',
        time: 7.5,
        project: '市场调研'
      }
    ];
    
    this.setData({
      teamTimeEntries: entries
    });
  },

  navigateTo(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  }
});