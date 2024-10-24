Page({
  data: {
    departments: [
      { value: 'tech', label: '技术部' },
      { value: 'market', label: '市场部' },
      { value: 'service', label: '客服部' }
    ],
    projects: [],
    filters: {
      department: '',
      project: '',
      startDate: '',
      endDate: ''
    },
    logs: [],
    selectedLogs: []
  },

  onLoad() {
    this.loadProjects();
    this.loadLogs();
  },

  loadProjects() {
    const app = getApp();
    const projects = app.globalData.projects || [];
    
    const projectOptions = projects.map(project => ({
      value: project.id,
      label: `${project.name} (${project.id})`
    }));

    this.setData({ projects: projectOptions });
  },

  loadLogs() {
    // 模拟加载工时日志数据
    const logs = [
      {
        id: 1,
        employeeId: 'EMP001',
        employeeName: '张三',
        department: '技术部',
        avatar: '/assets/images/avatar1.png',
        date: '2024-01-15',
        project: '系统升级',
        normalHours: 8,
        overtimeHours: 2,
        totalHours: 10,
        status: '已审批'
      },
      {
        id: 2,
        employeeId: 'EMP002',
        employeeName: '李四',
        department: '技术部',
        avatar: '/assets/images/avatar2.png',
        date: '2024-01-15',
        project: '市场调研',
        normalHours: 8,
        overtimeHours: 0,
        totalHours: 8,
        status: '已审批'
      }
    ];

    this.setData({ logs });
  },

  onDepartmentChange(e) {
    this.setData({
      'filters.department': e.detail.value
    });
    this.applyFilters();
  },

  onProjectChange(e) {
    this.setData({
      'filters.project': e.detail.value
    });
    this.applyFilters();
  },

  onStartDateChange(e) {
    this.setData({
      'filters.startDate': e.detail.value
    });
    this.applyFilters();
  },

  onEndDateChange(e) {
    this.setData({
      'filters.endDate': e.detail.value
    });
    this.applyFilters();
  },

  applyFilters() {
    const { filters } = this.data;
    // 实际应用中这里应该调用API进行筛选
    this.loadLogs();
  },

  onLogSelect(e) {
    const { id } = e.currentTarget.dataset;
    const { selectedLogs } = this.data;
    const index = selectedLogs.indexOf(id);
    
    if (index > -1) {
      selectedLogs.splice(index, 1);
    } else {
      selectedLogs.push(id);
    }
    
    this.setData({ selectedLogs });
  },

  showLogDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/timeEntry/detail?id=${id}`
    });
  },

  exportLogs() {
    const { selectedLogs, logs } = this.data;
    const logsToExport = selectedLogs.length > 0 
      ? logs.filter(log => selectedLogs.includes(log.id))
      : logs;

    wx.showLoading({
      title: '导出中...'
    });

    // 实际应用中这里应该调用导出API
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '导出成功',
        icon: 'success'
      });
    }, 2000);
  }
});