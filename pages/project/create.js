Page({
  data: {
    projectTypes: [
      { value: 'tech', label: '技术开发' },
      { value: 'market', label: '市场营销' },
      { value: 'research', label: '研究调查' },
      { value: 'service', label: '客户服务' }
    ],
    formData: {
      id: '',
      name: '',
      type: '',
      description: '',
      leader: '',
      approver: '',
      plannedHours: ''
    },
    rules: {
      id: { required: true, message: '请输入项目ID' },
      name: { required: true, message: '请输入项目名称' },
      type: { required: true, message: '请选择项目类型' },
      description: { required: true, message: '请输入项目描述' },
      leader: { required: true, message: '请输入项目负责人' },
      approver: { required: true, message: '请输入工时审批人' },
      plannedHours: { required: true, message: '请输入计划工时' }
    }
  },

  onIdChange(e) {
    this.setData({ 'formData.id': e.detail.value });
  },

  onNameChange(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onTypeChange(e) {
    this.setData({ 'formData.type': e.detail.value });
  },

  onDescriptionChange(e) {
    this.setData({ 'formData.description': e.detail.value });
  },

  onLeaderChange(e) {
    this.setData({ 'formData.leader': e.detail.value });
  },

  onApproverChange(e) {
    this.setData({ 'formData.approver': e.detail.value });
  },

  onPlannedHoursChange(e) {
    this.setData({ 'formData.plannedHours': e.detail.value });
  },

  validateForm() {
    const { formData, rules } = this.data;
    let isValid = true;
    const errors = {};

    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      const value = formData[key];

      if (rule.required && !value) {
        isValid = false;
        errors[key] = rule.message;
      }
    });

    if (!isValid) {
      wx.showToast({
        title: Object.values(errors)[0],
        icon: 'none'
      });
    }

    return isValid;
  },

  submitForm() {
    if (!this.validateForm()) return;

    const { formData } = this.data;
    const app = getApp();
    const projects = app.globalData.projects || [];

    // 检查项目ID是否已存在
    if (projects.some(p => p.id === formData.id)) {
      wx.showToast({
        title: '项目ID已存在',
        icon: 'none'
      });
      return;
    }

    // 添加新项目
    projects.push({
      ...formData,
      status: '待审批',
      createTime: new Date().toISOString()
    });

    app.globalData.projects = projects;

    wx.showToast({
      title: '创建成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      }
    });
  }
})