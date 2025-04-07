function renderPetDetails(pets) {
  const detailsGroup = document.querySelector('.details-group');
  detailsGroup.innerHTML = '';

  if (!pets || pets.length === 0) {
    detailsGroup.innerHTML = '<p class="text-danger">你还没有添加宠物</p >';
    return;
  }

  pets.forEach(pet => {
    const detailCard = document.createElement('div');
    detailCard.className = 'details';

    detailCard.innerHTML = `
      <div class="details-left">
        <ul>
          <li>宠物名字：${pet.petName || '未命名'}</li>
          <li>宠物品种：${pet.petVarious || '未命名'}</li>
          <li>宠物年龄：${pet.petAge || '未命名'}岁</li>
          <li>健康状态：${pet.petHealth || '未命名'}</li>
        </ul>
        <a href=" ">
          <button class="check">查看详情</button>
        </a >
      </div>
      <div class="details-right">
        < img src="${pet.PetImageUrl}" alt="宠物头像" style="width: 120px; height: 120px; object-fit: cover;">
        <p>宠物头像</p >
      </div>
    `;

    detailsGroup.appendChild(detailCard);
  });
}

// window.addEventListener('DOMContentLoaded', async () => {
//   // const token = localStorage.getItem('authToken');
//   //
//   // if (!token) {
//   //   document.querySelector('.details-group').innerHTML =
//   //     '<p class="text-danger">请登录后查看宠物信息</p >';
//   //   return;
//   // }
//
//   try {
//     //
//     const res = await fetch(`/HealthManage2/pets`, {
//       // headers: {
//       //   'Authorization': `Bearer ${token}`
//       // }
//     });
//
//     if (!res.ok) {
//       throw new Error(`接口请求失败：${res.status}`);
//     }
//
//     const pet = await res.json();
//     console.log('后端返回的宠物信息：', pet);
//
//     // 用数组包装，传给渲染函数
//     renderPetDetails(pet);
//
//     //获取疫苗提醒
//     fetchVaccineRemindersForAllPets();
//
//   } catch (err) {
//     console.error('请求宠物信息失败：', err);
//     document.querySelector('.details-group').innerHTML =
//       '<p class="text-danger">加载宠物信息失败，请稍后再试</p >';
//   }
// });

// 修改初始化逻辑（mypet.js）
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`/HealthManage2/pets`);
    if (!res.ok) throw new Error(`请求失败：${res.status}`);

    // 确保这里获取的是数组（重要！）
    const pets = await res.json();
    console.log('获取到的宠物数据:', pets); // 添加调试日志

    // 检查是否为数组
    if (!Array.isArray(pets)) {
      throw new Error("接口返回数据格式错误，期望数组");
    }

    renderPetDetails(pets);
    fetchVaccineRemindersForAllPets(pets); // 传递正确的数组
  } catch (err) {
    console.error('初始化失败：', err);
    document.querySelector('.details-group').innerHTML =
      `<p class="text-danger">${err.message}</p >`;
  }
});

// 疫苗提醒查询
// 获取所有宠物的疫苗提醒
// 修改后的fetchVaccineRemindersForAllPets函数
async function fetchVaccineRemindersForAllPets(pets) {
  console.log('开始获取疫苗提醒，宠物列表:', pets);

  try {
    const allReminders = [];

    // 遍历每个宠物
    for (const pet of pets) {
      try {
        // 使用正确的宠物ID参数（pet.id）
        const res = await fetch(`/HealthManage2/Vaccinations?petId=${pet.id}`);
        console.log(`请求疫苗数据 petId=${pet.id} 状态码:`, res.status);

        if (!res.ok) {
          console.warn(`获取疫苗提醒失败 petId=${pet.id}: ${res.status}`);
          continue;
        }

        const data = await res.json();
        console.log(`疫苗响应数据 petId=${pet.id}:`, data);

        if (data.code === 200 && Array.isArray(data.data)) {
          // 添加宠物名称到提醒数据
          const remindersWithPetName = data.data.map(item => ({
            ...item,
            petName: pet.petName || '未知宠物'
          }));
          allReminders.push(...remindersWithPetName);
        }
      } catch (e) {
        console.error(`处理宠物ID=${pet.id}时出错:`, e);
      }
    }

    console.log('所有疫苗提醒数据:', allReminders);
    renderVaccineReminders(allReminders);
  } catch (e) {
    console.error("获取疫苗提醒失败:", e);
    // 在页面上显示错误
    const container = document.querySelector('.healthy-detail');
    if (container) {
      container.innerHTML = `<p class="text-danger">加载健康提醒失败: ${e.message}</p >`;
    }
  }
}

// 修改后的renderVaccineReminders函数
function renderVaccineReminders(reminders) {
  console.log('开始渲染疫苗提醒，数据:', reminders);

  const container = document.querySelector('.healthy-reminber');
  if (!container) {
    console.error('找不到健康提醒容器！');
    return;
  }

  let detailContainer = container.querySelector('.healthy-detail');
  if (!detailContainer) {
    console.log('创建新的健康提醒容器');
    detailContainer = document.createElement('div');
    detailContainer.className = 'healthy-detail';
    container.appendChild(detailContainer);
  }

  // 清空旧内容
  detailContainer.innerHTML = '';

  if (!reminders || reminders.length === 0) {
    console.log('没有疫苗提醒数据');
    detailContainer.innerHTML = '<p class="text-muted">暂无健康提醒</p >';
    return;
  }

  console.log('开始渲染疫苗条目');
  reminders.forEach((item, index) => {
    console.log(`渲染第${index + 1}条提醒:`, item);
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item mb-3 p-3 bg-light rounded';
    reminderItem.innerHTML = `
      <div class="healthy-details">
        <ul class="list-unstyled">
          <li><strong>宠物名称：</strong>${item.petName}</li>
          <li><strong>疫苗名称：</strong>${item.vacName}</li>
          <li><strong>接种日期：</strong>${new Date(item.vacDate).toLocaleDateString()}</li>
          <li><strong>状态：</strong>
            <span class="badge ${item.vacStatus ? 'bg-success' : 'bg-warning'}">
              ${item.vacStatus ? '已完成' : '未完成'}
            </span>
          </li>
        </ul>
      </div>
    `;
    detailContainer.appendChild(reminderItem);
  });
}