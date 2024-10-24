Page({
  data: {
    activeTab: 'project',
    projectApprovals: [],
    timesheetApprovals: [],
    selectedApprovals: [],
    showRejectDialog: false,
    rejectReason: ''
  },

  onLoad() {
    this.loadApprovals();
  },

  loadApprovals() {
    // 加载项目审批数据
    const projectApprovals = [
      {
        id: 'PRJ003',
        name: '客户满意度调查',
        type: '市场研究',
        leader: '李四',
        avatar: '/assets/images/avatar1.png',
        submitTime: '2024-01-15 14:30',
        status: '待审批'
      },
      {
        id: 'PRJ004',
        name: '系统性能优化',
        type: '技术开发',
        leader: '王五',
        avatar: '/assets/images/avatar2.png',
        submitTime: '2024-01-15 16:45',
        status: '待审批'
      }
    ];

    // 加载工时审批数据
    const timesheetApprovals = [
      {
        id: 'TS001',
        employeeId: 'EMP001',
        employeeName: '张三',
        avatar: '/assets/images/avatar1.png',
        date: '2024-01-15',
        totalHours: 10,
        projectName: '系统升级',
        status: '待审批'
      },
      {
        id: 'TS002',
        employeeId: 'EMP002',
        employeeName: '李四',
        avatar: '/assets/images/avatar2.png',
        date: '2024-01-15',
        totalHours: 9.5,
        projectName: '市场调研',
        status: '待审批'
      }
    ];

    this.setData({
      projectApprovals,
      timesheetApprovals
    });
  },

  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({ 
      activeTab: tab,
      selectedApprovals: []
    });
  },

  onApprovalSelect(e) {
    const { id } = e.currentTarget.dataset;
    const { selectedApprovals } = this.data;
    const index = selectedApprovals.indexOf(id);
    
    if (index > -1) {
      selectedApprovals.splice(index, 1);
    } else {
      selectedApprovals.push(id);
    }
    
    this.setData({ selectedApprovals });
  },

  showApprovalDetail(e) {
    const { id } = e.currentTarget.dataset;
    const { activeTab } = this.data;
    
    wx.navigateTo({
      url: `/pages/approval/${activeTab}?id=${id}`
    });
  },

  batchApprove() {
    const { selectedApprovals } = this.data;
    if (selectedApprovals.length === 0) {
      wx.showToast({
        title: '请选择要审批的记录',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '批量审批',
      content: `确定要批准选中的 ${selectedApprovals.length} 条记录吗？`,
      success: (res) => {
        if (res.confirm) {
          // 实际应用中这里应该调用批量审批API
          wx.showToast({
            title: '审批成功',
            icon: 'success'
          });
          this.setData({ selectedApprovals: [] });
          this.loadApprovals();
        }
      }
    });
  },

  showRejectDialog() {
    const { selectedApprovals } = this.data;
    if (selectedApprovals.length === 0) {
      wx.showToast({
        title: '请选择要拒绝的记录',
        icon: 'none'
      });
      return;
    }

    this.setData({ showRejectDialog: true });
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

  batchReject() {
    const { rejectReason, selectedApprovals } = this.data;
    
    if (!rejectReason) {
      wx.showToast({
        title: '请输入拒绝原因',
        icon: 'none'
      });
      return;
    }

    // 实际应用中这里应该调用批量拒绝API
    wx.showToast({
      title: '已拒绝',
      icon: 'success'
    });
    
    this.setData({
      showRejectDialog: false,
      rejectReason: '',
      selectedApprovals: []
    });
    
    this.loadApprovals();
  }
});