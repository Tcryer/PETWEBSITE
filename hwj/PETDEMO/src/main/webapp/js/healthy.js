
window.addEventListener('DOMContentLoaded', () => {
  // 从 URL 中获取宠物 id 参数
  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get('petId');
  const filecard = document.getElementById('filecard');
  const petHealthInfo = document.getElementById('petHealthInfo');

  if (!petId) {
    // petDetailCard.innerHTML = '<p>未提供宠物ID</p >';
    console.error(" 未提供宠物ID");
    return;
  }

  console.log("开始请求宠物详情接口");
  fetch(`/HealthManage2/pet/detail?petId=${petId}`, {
    method: 'GET'
  })
    .then(response => {
      console.log("宠物详情接口响应状态码:", response.status); // 打印状态码
      if (!response.ok) throw new Error('接口错误');
      return response.json();
    })
    .then(data => {
      console.log("宠物详情接口返回数据:", data); // 打印数据
      // 假设 data 对象包含字段：petName, petVarious, petAge, petBirthday, adoptionDate, imageUrl 等
      filecard.innerHTML = `
  <div class="filecard-content">
    <div class="pet-text-info">
      <ul>
        <li>宠物名字：${data.petName || '未命名'}</li>
        <li>宠物品种：${data.petVarious || '未命名'}</li>
        <li>宠物年龄：${data.petAge || '未命名'} 岁</li>
        <li>生日：${data.petBirthday || '未命名'}</li>
        <li>到家日期：${data.adoptionDate || '未命名'}</li>
      </ul>
    </div>
    <div class="pet-detail-pic">
      <img src="${data.PetImageUrl}" alt="宠物头像">
    </div>
  </div>
`;


      if (data.petName) {
        document.title = data.petName + '的健康详情';
      }
    })
    .catch(error => {
      console.error('加载宠物详情失败:', error);
      filecard.innerHTML = '<p>加载宠物详情失败，请稍后重试。</p >';
    });
});





// // 获取体重记录
// function fetchWeightData(petId) {
//   fetch(`http://localhost:8080/petwebsite/HealthManage2/weight/record?petId=1`, {
//     method: 'GET'
//   })
//     .then(response => response.json())
//     .then(data => {
//       renderWeightChart(data);  // 渲染体重变化图
//     })
//     .catch(error => {
//       console.error("加载体重记录失败:", error);
//     });
// }

// // 获取疫苗接种记录
// function fetchVaccineData(petId) {
//   fetch(`http://localhost:8080/petwebsite/HealthManage2/Vaccinations?petId=${petId}`, {
//     method: 'GET'
//   })
//     .then(response => response.json())
//     .then(data => {
//       renderVaccineRecords(data.data);  // 渲染疫苗接种记录
//     })
//     .catch(error => {
//       console.error("加载疫苗记录失败:", error);
//     });
// }

