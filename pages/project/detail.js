Page({
  data: {
    project: null,
    teamMembers: [],
    timeEntries: []
  },

  onLoad(options) {
    const { id } = options;
    this.loadProjectDetails(id);
    this.loadTeamMembers(id);
    this.loadTimeEntries(id);
  },

  loadProjectDetails(projectId) {
    const app = getApp();
    const project = app.globalData.projects.find(p => p.id === projectId);
    
    if (project) {
      this.setData({ project });
    } else {
      wx.showToast({
        title: '项目不存在',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
    }
  },

  loadTeamMembers(projectId) {
    // 模拟加载项目成员数据
    const teamMembers = [
      {
        id: 'EMP001',
        name: '张三',
        role: '前端开发',
        avatar: '/assets/images/avatar1.png'
      },
      {
        id: 'EMP002',
        name: '李四',
        role: '后端开发',
        avatar: '/assets/images/avatar2.png'
      }
    ];

    this.setData({ teamMembers });
  },

  loadTimeEntries(projectId) {
    const app = getApp();
    const timeEntries = app.globalData.timeEntries.filter(
      entry => entry.projectId === projectId
    );

    this.setData({ timeEntries });
  },

  showMemberDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/profile/detail?id=${id}`
    });
  },

  showTimeEntryDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/timeEntry/detail?id=${id}`
    });
  }
})