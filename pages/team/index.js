Page({
  data: {
    teams: [],
    statistics: {
      totalMembers: 0,
      activeProjects: 0,
      totalHours: 0
    }
  },

  onLoad() {
    this.loadTeams();
    this.loadStatistics();
  },

  loadTeams() {
    // 模拟加载团队数据
    const teams = [
      {
        id: 'TEAM001',
        name: '前端开发组',
        leader: '张三',
        memberCount: 5,
        activeProjects: 2,
        avatar: '/assets/images/team1.png'
      },
      {
        id: 'TEAM002',
        name: '后端开发组',
        leader: '李四',
        memberCount: 4,
        activeProjects: 1,
        avatar: '/assets/images/team2.png'
      }
    ];

    this.setData({ teams });
  },

  loadStatistics() {
    // 模拟加载统计数据
    this.setData({
      statistics: {
        totalMembers: 9,
        activeProjects: 3,
        totalHours: 360
      }
    });
  },

  showTeamMembers(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/team/members?id=${id}`
    });
  }
});