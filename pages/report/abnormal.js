Page({
  data: {
    project: null,
    abnormalRecords: []
  },

  onLoad(options) {
    const { id } = options;
    this.loadProjectDetails(id);
    this.loadAbnormalRecords(id);
  },

  loadProjectDetails(projectId) {
    // 模拟加载项目详情
    const project = {
      id: projectId,
      name: '系统升级',
      type: '技术开发',
      description: '系统升级项目',
      leader: '张三',
      approver: '李四',
      status: '进行中',
      plannedHours: 160,
      actualHours: 180,
      difference: 20
    };

    this.setData({ project });
  },

  loadAbnormalRecords(projectId) {
    // 模拟加载异常记录
    const records = [
      {
        date: '2024-01-15',
        employee: '张三',
        plannedHours: 8,
        actualHours: 12,
        reason: '需求变更导致额外工作'
      },
      {
        date: '2024-01-16',
        employee: '李四',
        plannedHours: 8,
        actualHours: 10,
        reason: '解决紧急bug'
      }
    ];

    this.setData({ abnormalRecords: records });
  }
});