Page({
  data: {
    team: null,
    members: [],
    timeEntries: [],
    showActionSheet: false,
    selectedMember: null,
    isLeader: false
  },

  onLoad(options) {
    const { id } = options;
    this.loadTeamDetails(id);
    this.loadTeamMembers(id);
    this.loadTimeEntries(id);
    this.checkIsLeader();
  },

  loadTeamDetails(teamId) {
    // 模拟加载团队详情
    const team = {
      id: teamId,
      name: '前端开发组',
      leader: '张三',
      description: '负责公司所有前端项目的开发和维护工作'
    };

    this.setData({ team });
  },

  loadTeamMembers(teamId) {
    // 模拟加载团队成员数据
    const members = [
      {
        id: 'EMP001',
        name: '张三',
        role: '团队负责人',
        title: '高级前端工程师',
        avatar: '/assets/images/avatar1.png',
        isLeader: true
      },
      {
        id: 'EMP002',
        name: '李四',
        role: '成员',
        title: '前端工程师',
        avatar: '/assets/images/avatar2.png',
        isLeader: false
      }
    ];

    this.setData({ members });
  },

  loadTimeEntries(teamId) {
    // 模拟加载工时记录
    const timeEntries = [
      {
        id: 1,
        memberId: 'EMP001',
        memberName: '张三',
        date: '2024-01-15',
        project: '系统升级',
        hours: 10
      },
      {
        id: 2,
        memberId: 'EMP002',
        memberName: '李四',
        date: '2024-01-15',
        project: '市场调研',
        hours: 8
      }
    ];

    this.setData({ timeEntries });
  },

  checkIsLeader() {
    // 检查当前用户是否为团队负责人
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    const isLeader = userInfo && userInfo.id === this.data.team?.leaderId;
    this.setData({ isLeader });
  },

  showMemberActions(e) {
    if (!this.data.isLeader) return;
    
    const { id } = e.currentTarget.dataset;
    const member = this.data.members.find(m => m.id === id);
    
    this.setData({
      selectedMember: member,
      showActionSheet: true
    });
  },

  hideActionSheet() {
    this.setData({
      showActionSheet: false,
      selectedMember: null
    });
  },

  handleAction(e) {
    const { action } = e.currentTarget.dataset;
    const { selectedMember } = this.data;

    switch (action) {
      case 'view':
        wx.navigateTo({
          url: `/pages/profile/detail?id=${selectedMember.id}`
        });
        break;
      case 'remove':
        this.removeMember(selectedMember.id);
        break;
      case 'setLeader':
        this.setTeamLeader(selectedMember.id);
        break;
    }

    this.hideActionSheet();
  },

  addMember() {
    wx.navigateTo({
      url: '/pages/team/addMember'
    });
  },

  removeMember(memberId) {
    wx.showModal({
      title: '确认移除',
      content: '确定要移除该成员吗？',
      success: (res) => {
        if (res.confirm) {
          // 移除成员逻辑
          const members = this.data.members.filter(m => m.id !== memberId);
          this.setData({ members });
          
          wx.showToast({
            title: '已移除成员',
            icon: 'success'
          });
        }
      }
    });
  },

  setTeamLeader(memberId) {
    wx.showModal({
      title: '确认设置',
      content: '确定要将该成员设置为团队负责人吗？',
      success: (res) => {
        if (res.confirm) {
          // 更新团队负责人逻辑
          const members = this.data.members.map(m => ({
            ...m,
            isLeader: m.id === memberId,
            role: m.id === memberId ? '团队负责人' : '成员'
          }));

          this.setData({ members });
          
          wx.showToast({
            title: '已更新负责人',
            icon: 'success'
          });
        }
      }
    });
  }
});