Component({
  properties: {
    selectedDate: {
      type: String,
      value: ''
    }
  },

  data: {
    days: [],
    currentMonth: '',
    currentYear: '',
    longPressTimer: null,
    showCopyDialog: false,
    selectedDay: null
  },

  lifetimes: {
    attached() {
      this.initCalendar();
    }
  },

  methods: {
    initCalendar() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      
      this.setData({
        currentMonth: month + 1,
        currentYear: year
      });
      
      this.generateDays(year, month);
    },

    generateDays(year, month) {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (let i = 0; i < firstDay; i++) {
        days.push({ day: '', disabled: true });
      }
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        date.setHours(0, 0, 0, 0);
        const isToday = date.getTime() === today.getTime();
        const isFuture = date > today;
        const hasEntry = this.checkHasTimeEntry(date);
        
        days.push({
          day: i,
          date: date.toISOString().split('T')[0],
          isToday,
          disabled: isFuture,
          hasEntry,
          isInvalid: !isFuture && !hasEntry
        });
      }
      
      this.setData({ days });
    },

    checkHasTimeEntry(date) {
      const app = getApp();
      const timeEntries = app.globalData.timeEntries || [];
      return timeEntries.some(entry => entry.date === date.toISOString().split('T')[0]);
    },

    onDayClick(e) {
      const { date, disabled } = e.currentTarget.dataset;
      if (!disabled) {
        this.triggerEvent('dayClick', { date });
      }
    },

    onDayLongPress(e) {
      const { date, disabled, hasEntry } = e.currentTarget.dataset;
      if (!disabled && hasEntry) {
        this.setData({
          showCopyDialog: true,
          selectedDay: date
        });
        this.triggerEvent('longpress', { date });
      }
    },

    onCopyCancel() {
      this.setData({
        showCopyDialog: false,
        selectedDay: null
      });
    },

    onCopyConfirm(e) {
      const { startDate, endDate } = e.detail;
      this.triggerEvent('copyTimeEntry', {
        sourceDate: this.data.selectedDay,
        startDate,
        endDate
      });
      this.onCopyCancel();
    }
  }
});