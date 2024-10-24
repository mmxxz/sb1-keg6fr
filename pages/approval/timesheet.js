Page({
  data: {
    timesheet: null,
    rejectReason: ''
  },

  onLoad(options) {
    const { id } = options;
    this.loadTimesheetDetails(id);
  },

  loadTimesheetDetails(timesheetId) {
    // 模拟加载工时详情
    const timesheet = {
      id: timesheetId,
      employeeId: 'EMP001',
      employeeName: '张三',
      date: '2024-01-15',
      projectName: '系统升级',
      taskName: '前端开发',
      normalHours: 8,
      overtimeHours: 2,
      description: '完成登录页面的UI设计和功能实现',
      submitTime: '2024-01-15 18:30',
      status: '待审批'
    };

    this.setData({ timesheet });
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
      content: '确定要批准该工时记录吗？',
      success: (res) => {
        if (res.confirm) {
          // 更新工时状态
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

    // 更新工时状态
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