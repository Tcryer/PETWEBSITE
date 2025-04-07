// 医生数据获取及渲染函数
function fetchDoctors(region = '', doctorCode = '', name = '') {
  const url = new URL('http://localhost:8080/HealthManage2/doctor/search');
  const params = { region, doctorCode, name };
  url.search = new URLSearchParams(params).toString();

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("接口返回数据:", data); // 调试日志
      if (data && data.length > 0) {
        renderDoctors(data);
      } else {
        alert('没有找到相关医生');
      }
    })
    .catch(err => {
      console.error('请求医生数据失败:', err);
    });
}

// 渲染医生信息到页面
function renderDoctors(doctors) {
  const doctorDetailsContainer = document.querySelector('.pet-details-row');
  if (!doctorDetailsContainer) {
    console.error("错误：未找到医生容器元素");
    return;
  }
  doctorDetailsContainer.innerHTML = '';

  doctors.forEach(doctor => {
    const doctorDiv = document.createElement('div');
    doctorDiv.classList.add('doctor-details', 'col-md-4', 'mb-3'); // 添加响应式布局
    doctorDiv.innerHTML = `
      <a href="../html/online-doctor-detail.html?id=${doctor.id}">
        <div class="doctor-detail-bac shadow-sm p-2">
          <img src="../images/images2/doctor${doctor.id}.jpg" 
               alt="${doctor.name}" 
               class="img-fluid rounded"
               onerror="this.src='../images/default-doctor.jpg'">
        </div>
        <div class="doctor-info mt-2">
          <h5 class="name mb-1">${doctor.name}</h5>
          <p class="code text-muted small mb-1">编号：${doctor.doctorCode}</p>
          <p class="region text-muted small">地区：${doctor.region}</p>
        </div>
      </a>
    `;
    doctorDetailsContainer.appendChild(doctorDiv);
  });
}

// 筛选医生（根据选择地区）
document.querySelector('.dropdown-menu').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const selectedRegion = e.target.innerText;
    document.querySelector('.dropdown-toggle').textContent = selectedRegion; // 更新下拉按钮显示
    fetchDoctors(selectedRegion);
  }
});

// 搜索医生
document.querySelector('.doctor-search form').addEventListener('submit', (e) => {
  e.preventDefault();
  const doctorCode = document.querySelector('input[name="doctorCode"]').value;
  const name = document.querySelector('input[name="name"]').value;
  fetchDoctors('', doctorCode, name); // 参数顺序：region, doctorCode, name
});

// 页面加载时默认加载所有医生
document.addEventListener('DOMContentLoaded', () => {
  fetchDoctors();
});