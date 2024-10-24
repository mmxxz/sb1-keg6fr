Page({
  data: {
    project: null,
    rejectReason: ''
  },

  onLoad(options) {
    const { id } = options;
    this.loadProjectDetails(id);
  },

  loadProjectDetails(projectId) {
    // 模拟加载项目详情
    const project = {
      id: projectId,
      name: '客户满意度调查',
      type: '市场研究',
      description: '进行全面的客户满意度调查，以改善我们的产品和服务',
      leader: '李四',
      approver: '王五',
      status: '待审批',
      plannedHours: 160,
      submitTime: '2024-01-15 14:30'
    };

    this.setData({ project });
  },

  showRejectDialog() {
    this.setData({
      showRejectDialog: true
    });
  },

  hideRejectDialog() {
    this.setData({
      showRejectDialog: false,
      rejectReason: ''
    });
  },

  onRejectReasonInput(e) {
    this.setData({
      rejectReason: e.detail.value
    });
  },

  approve() {
    wx.showModal({
      title: '确认审批',
      content: '确定要批准该项目吗？',
      success: (res) => {
        if (res.confirm) {
          // 更新项目状态
          wx.showToast({
            title: '审批成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 2000);
            }
          });
        }
      }
    });
  },

  reject() {
    if (!this.data.rejectReason) {
      wx.showToast({
        title: '请输入拒绝原因',
        icon: 'none'
      });
      return;
    }

    // 更新项目状态
    wx.showToast({
      title: '已拒绝',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      }
    });
  }
});