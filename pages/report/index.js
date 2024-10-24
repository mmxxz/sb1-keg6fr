Page({
  data: {
    workHoursEc: {
      lazyLoad: true
    },
    abnormalHoursEc: {
      lazyLoad: true
    },
    monthlyWorkHoursEc: {
      lazyLoad: true
    },
    filters: {
      project: '',
      department: '',
      employee: '',
      startDate: '',
      endDate: ''
    },
    summary: {
      totalHours: 180,
      normalHours: 160,
      overtimeHours: 20,
      abnormalHours: 15
    },
    abnormalProjects: [
      {
        id: 'PRJ001',
        name: '系统升级',
        plannedHours: 160,
        actualHours: 180,
        difference: 20,
        status: 'overtime'
      },
      {
        id: 'PRJ002',
        name: '市场调研',
        plannedHours: 80,
        actualHours: 65,
        difference: -15,
        status: 'undertime'
      }
    ]
  },

  onLoad() {
    this.initCharts();
  },

  initCharts() {
    this.workHoursComponent = this.selectComponent('#workHoursChart');
    this.abnormalHoursComponent = this.selectComponent('#abnormalHoursChart');
    this.monthlyWorkHoursComponent = this.selectComponent('#monthlyWorkHoursChart');

    this.initWorkHoursChart();
    this.initAbnormalHoursChart();
    this.initMonthlyWorkHoursChart();
  },

  initWorkHoursChart() {
    this.workHoursComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['正常工时', '加班工时']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '正常工时',
            type: 'bar',
            stack: 'total',
            data: [8, 8, 8, 8, 8],
            color: '#07C160'
          },
          {
            name: '加班工时',
            type: 'bar',
            stack: 'total',
            data: [2, 1, 0, 3, 1],
            color: '#ff4d4f'
          }
        ]
      };
      chart.setOption(option);
      return chart;
    });
  },

  initAbnormalHoursChart() {
    this.abnormalHoursComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '工时分布',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 165, name: '正常工时' },
              { value: 15, name: '异常工时' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            color: ['#07C160', '#ff4d4f']
          }
        ]
      };
      chart.setOption(option);
      return chart;
    });
  },

  initMonthlyWorkHoursChart() {
    this.monthlyWorkHoursComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['计划工时', '实际工时']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['项目A', '项目B', '项目C']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '计划工时',
            type: 'bar',
            data: [160, 80, 120],
            color: '#2196F3'
          },
          {
            name: '实际工时',
            type: 'bar',
            data: [180, 65, 115],
            color: '#ff4d4f'
          }
        ]
      };
      chart.setOption(option);
      return chart;
    });
  },

  onFilterChange(e) {
    const { type } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`filters.${type}`]: value
    });
    
    this.refreshData();
  },

  refreshData() {
    // 根据筛选条件重新加载数据
    this.initCharts();
  },

  showAbnormalDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/report/abnormal?id=${id}`
    });
  }
});