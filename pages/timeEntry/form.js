Page({
  data: {
    date: '',
    projectEntries: [{
      projectId: '',
      taskId: '',
      normalHours: '',
      overtimeHours: '',
      description: ''
    }],
    projectOptions: [],
    taskOptions: [],
    rules: {
      projectId: { required: true, message: '请选择项目' },
      taskId: { required: true, message: '请选择任务' },
      normalHours: { 
        required: true, 
        message: '请输入正常工时',
        validator: (value) => value > 0 && value <= 8
      },
      overtimeHours: {
        validator: (value) => value >= 0 && value <= 8
      },
      description: { required: true, message: '请输入工作内容' }
    }
  },

  onLoad(options) {
    const date = options.date || this.getTodayDate();
    const copyFrom = options.copyFrom;
    
    this.setData({ date });
    this.loadProjects();
    
    if (copyFrom) {
      this.loadTimeEntry(copyFrom);
    }
  },

  getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadProjects() {
    const app = getApp();
    const projects = app.globalData.projects || [];
    
    const projectOptions = projects.map(project => ({
      value: project.id,
      label: `${project.name} (${project.id})`
    }));

    this.setData({ projectOptions });
  },

  loadTimeEntry(date) {
    const app = getApp();
    const timeEntry = app.globalData.timeEntries.find(entry => entry.date === date);
    
    if (timeEntry) {
      this.setData({
        projectEntries: [{
          projectId: timeEntry.projectId,
          taskId: timeEntry.taskId,
          normalHours: timeEntry.normalHours,
          overtimeHours: timeEntry.overtimeHours,
          description: timeEntry.description
        }]
      });
      this.loadTasks(timeEntry.projectId);
    }
  },

  loadTasks(projectId) {
    // 模拟根据项目加载任务列表
    const taskOptions = [
      { value: 'TASK001', label: '需求分析' },
      { value: 'TASK002', label: '系统设计' },
      { value: 'TASK003', label: '前端开发' },
      { value: 'TASK004', label: '后端开发' },
      { value: 'TASK005', label: '测试' }
    ];

    this.setData({ taskOptions });
  },

  addProjectEntry() {
    const { projectEntries } = this.data;
    projectEntries.push({
      projectId: '',
      taskId: '',
      normalHours: '',
      overtimeHours: '',
      description: ''
    });
    this.setData({ projectEntries });
  },

  removeProjectEntry(e) {
    const { index } = e.currentTarget.dataset;
    const { projectEntries } = this.data;
    projectEntries.splice(index, 1);
    this.setData({ projectEntries });
  },

  onProjectChange(e) {
    const { index } = e.currentTarget.dataset;
    const projectId = e.detail.value;
    const projectEntries = this.data.projectEntries;
    
    projectEntries[index].projectId = projectId;
    projectEntries[index].taskId = ''; // 清空任务选择
    
    this.setData({ projectEntries });
    this.loadTasks(projectId);
  },

  onTaskChange(e) {
    const { index } = e.currentTarget.dataset;
    const taskId = e.detail.value;
    const projectEntries = this.data.projectEntries;
    
    projectEntries[index].taskId = taskId;
    this.setData({ projectEntries });
  },

  onHoursChange(e) {
    const { index, type } = e.currentTarget.dataset;
    const value = e.detail.value;
    const projectEntries = this.data.projectEntries;
    
    projectEntries[index][type] = value;
    this.setData({ projectEntries });
  },

  onDescriptionChange(e) {
    const { index } = e.currentTarget.dataset;
    const value = e.detail.value;
    const projectEntries = this.data.projectEntries;
    
    projectEntries[index].description = value;
    this.setData({ projectEntries });
  },

  validateEntry(entry) {
    const { rules } = this.data;
    const errors = [];

    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      const value = entry[key];

      if (rule.required && !value) {
        errors.push(rule.message);
      }

      if (rule.validator && !rule.validator(value)) {
        errors.push(rule.message);
      }
    });

    return errors;
  },

  validateForm() {
    const { projectEntries } = this.data;
    let isValid = true;
    let errorMessage = '';

    projectEntries.forEach((entry, index) => {
      const errors = this.validateEntry(entry);
      if (errors.length > 0) {
        isValid = false;
        errorMessage = `项目${index + 1}: ${errors[0]}`;
        return false;
      }
    });

    if (!isValid) {
      wx.showToast({
        title: errorMessage,
        icon: 'none'
      });
    }

    return isValid;
  },

  checkProjectMembership(projectId) {
    // 检查用户是否为项目组成员
    const app = getApp();
    const project = app.globalData.projects.find(p => p.id === projectId);
    return project && project.members && project.members.includes(app.globalData.userInfo.id);
  },

  submitForm() {
    if (!this.validateForm()) return;

    const { date, projectEntries } = this.data;
    const app = getApp();
    const timeEntries = app.globalData.timeEntries || [];

    projectEntries.forEach(entry => {
      const isMember = this.checkProjectMembership(entry.projectId);
      const status = isMember ? '已审批' : '待审批';
      const needsWarning = entry.overtimeHours > 8;

      timeEntries.push({
        id: timeEntries.length + 1,
        date,
        ...entry,
        status,
        needsWarning
      });

      if (needsWarning) {
        wx.showModal({
          title: '超时提醒',
          content: '加班工时超过8小时，已通知审批人',
          showCancel: false
        });
      }
    });

    app.globalData.timeEntries = timeEntries;

    wx.showToast({
      title: '提交成功',
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