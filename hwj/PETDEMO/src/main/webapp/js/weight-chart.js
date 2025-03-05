// 模拟数据：日期和对应的体重
const weightData = [
  { date: '2024-10-01', weight: 5.2 },
  { date: '2024-10-20', weight: 5.3 },
  { date: '2024-11-10', weight: 5.1 },
  { date: '2023-11-15', weight: 5.4 },
  { date: '2023-11-20', weight: 5.5 },
];

// 获取 DOM 元素
const datePicker = document.getElementById('date-picker');
const ctx = document.getElementById('weight-chart').getContext('2d');

// 初始化折线图
let weightChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: weightData.map(data => data.date), // X 轴：日期
    datasets: [{
      label: '体重 (kg)',
      data: weightData.map(data => data.weight), // Y 轴：体重
      borderColor: '#F1C024',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    responsive: false, // 禁用响应式布局
    maintainAspectRatio: false, // 不保持宽高比
    scales: {
      x: {
        title: {
          display: true,
          text: '日期',
        },
      },
      y: {
        title: {
          display: true,
          text: '体重 (kg)',
        },
        min: 5, // Y 轴最小值
        max: 6, // Y 轴最大值
      },
    },
  },
});

// 时间选择器事件监听
datePicker.addEventListener('change', (event) => {
  const selectedDate = event.target.value;

  // 找到选中日期的索引
  const selectedIndex = weightData.findIndex(data => data.date === selectedDate);

  if (selectedIndex !== -1) {
    // 获取选中日期及前后两个数据点
    const startIndex = Math.max(selectedIndex - 2, 0);
    const endIndex = Math.min(selectedIndex + 2, weightData.length - 1);

    // 更新图表数据
    weightChart.data.labels = weightData.slice(startIndex, endIndex + 1).map(data => data.date);
    weightChart.data.datasets[0].data = weightData.slice(startIndex, endIndex + 1).map(data => data.weight);
    weightChart.update(); // 更新图表
  } else {
    alert('未找到该日期的数据');
  }
});