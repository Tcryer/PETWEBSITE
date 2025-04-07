// 从 URL 中获取宠物 ID 参数
const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('petId');
console.log("获取到的宠物 ID:", petId);


if (!petId) {
  alert("未提供宠物ID");
  return;  //没有id就不执行后面代码了
}


// 获取 DOM 元素
const datePicker = document.getElementById('date-picker');
const ctx = document.getElementById('weight-chart').getContext('2d');

let weightData = []; // 用于保存后端返回的体重记录

// 初始化折线图
let weightChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // X 轴：日期
    datasets: [{
      label: '体重 (kg)',
      data: [], // Y 轴：体重数据
      borderColor: '#F1C024',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
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
        // min: 5, // Y 轴最小值
        // max: 6, // Y 轴最大值
      },
    },
  },
});

// 后端 接口十：查询体重记录
function fetchWeightRecords() {
  fetch(`http://localhost:8080/petwebsite/HealthManage2/weight/record?petId=${petId}`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("请求体重记录失败");
      }
      return response.json();
    })
    .then(data => {
      // 假设返回的数据格式为：[{ date: '2024-10-01', weight: 5.2 }, ...]
      weightData = data;
      updateChartData(weightData);
    })
    .catch(error => {
      console.error("加载体重记录失败:", error);
    });
}

// 更新图表数据
function updateChartData(records) {
  console.log('更新的体重记录：', records);  // 打印更新的数据
  weightChart.data.labels = records.map(item => item.date);
  weightChart.data.datasets[0].data = records.map(item => item.weight);

  // 依据数据动态设置 Y 轴最小/最大值
  if (records.length > 0) {
    const weights = records.map(item => item.weight);
    weightChart.options.scales.y.min = Math.min(...weights) - 0.5;
    weightChart.options.scales.y.max = Math.max(...weights) + 0.5;
  }
  weightChart.update();
}

// 日期选择器事件监听
datePicker.addEventListener('change', (event) => {
  const selectedDate = event.target.value;
  const selectedIndex = weightData.findIndex(item => item.date === selectedDate);

  if (selectedIndex !== -1) {
    const startIndex = Math.max(selectedIndex - 2, 0);
    const endIndex = Math.min(selectedIndex + 2, weightData.length - 1);
    const filteredRecords = weightData.slice(startIndex, endIndex + 1);
    updateChartData(filteredRecords);
  } else {
    alert('未找到该日期的数据');
  }
});

// 初始化时调用接口获取体重记录
fetchWeightRecords();

// 体重记录更新 添加体重后）
document.getElementById('saveweightBtn').addEventListener('click', () => {
  fetchWeightRecords();  // 重新获取最新的体重记录并更新图表
});