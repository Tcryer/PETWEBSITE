// 引入日期处理库（需在HTML中添加）
// <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@1.0.0"></script>

document.addEventListener('DOMContentLoaded', function() {
  // 从URL获取宠物ID（假设URL格式为 pet-detail.html?id=1）
  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get('id');

  if (!petId) {
    alert('未指定宠物ID');
    return;
  }

  // DOM元素
  const datePicker = document.getElementById('date-picker');
  const ctx = document.getElementById('weight-chart').getContext('2d');
  let weightChart = null;

  // 加载体重数据
  loadWeightData(petId)
      .then(weightData => {
        // 初始化图表
        initChart(weightData);

        // 设置日期选择器范围
        if (weightData.length > 0) {
          const dates = weightData.map(d => d.date);
          datePicker.min = dates[0];
          datePicker.max = dates[dates.length - 1];
        }
      })
      .catch(error => {
        console.error('加载数据失败:', error);
        alert('无法加载体重数据，请稍后重试');
      });

  // 日期筛选事件
  datePicker.addEventListener('change', function(e) {
    const selectedDate = e.target.value;
    filterChartByDate(selectedDate);
  });

  // 从后端加载数据
  function loadWeightData(petId) {
    return fetch(`/weight/record?petId=${petId}`) // 替换为你的实际接口
        .then(response => {
          if (!response.ok) throw new Error('网络响应异常');
          return response.json();
        })
        .then(data => {
          // 转换日期格式（确保后端返回的日期字段为 "date"）
          return data.map(record => ({
            date: moment(record.recordDate).format('YYYY-MM-DD'), // 格式统一
            weight: record.weight
          })).sort((a, b) => moment(a.date) - moment(b.date)); // 按日期排序
        });
  }

  // 初始化图表
  function initChart(weightData) {
    weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: '体重 (kg)',
          data: weightData.map(d => ({ x: d.date, y: d.weight })),
          borderColor: '#F1C024',
          borderWidth: 2,
          fill: false,
          tension: 0.1 // 曲线平滑度
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              tooltipFormat: 'YYYY-MM-DD'
            },
            title: { display: true, text: '日期' }
          },
          y: {
            title: { display: true, text: '体重 (kg)' },
                min: Math.floor(Math.min(...weightData.map(d => d.weight)) - 1),
                max: Math.ceil(Math.max(...weightData.map(d => d.weight)) + 1)
            }
  }
  }
  });
  }

  // 根据日期筛选图表
  function filterChartByDate(selectedDate) {
    const filteredData = weightChart.data.datasets[0].data
        .filter(d => moment(d.x).isSameOrAfter(selectedDate, 'day'));

    weightChart.data.datasets[0].data = filteredData;
    weightChart.update();
  }
});