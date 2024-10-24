Page({
  data: {
    dayEntries: [],
    weekSummary: [],
    selectedDate: null
  },

  onLoad() {
    this.loadTimeEntries();
    this.loadWeekSummary();
  },

  loadTimeEntries() {
    // Mock data - Replace with actual API call
    this.setData({
      dayEntries: [{
        id: 1,
        projectName: '系统升级',
        taskName: '前端开发',
        normalHours: 8,
        overtimeHours: 2
      }]
    });
  },

  loadWeekSummary() {
    // Mock data - Replace with actual API call
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const today = new Date();
    const weekSummary = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - date.getDay() + i);
      weekSummary.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        dayName: weekDays[i],
        totalHours: Math.floor(Math.random() * 4) + 8
      });
    }

    this.setData({ weekSummary });
  },

  onDayClick(e) {
    const { date } = e.detail;
    this.setData({ selectedDate: date });
    this.loadTimeEntries();
  },

  onAddTimeEntry() {
    wx.navigateTo({
      url: '/pages/timeEntry/form'
    });
  },

  showDayDetail(e) {
    const { date } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/timeEntry/form?date=${date}`
    });
  }
});