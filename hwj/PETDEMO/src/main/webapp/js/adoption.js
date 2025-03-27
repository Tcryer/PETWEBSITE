// 加载时渲染宠物列表（直接调用API）
window.addEventListener('DOMContentLoaded', () => {
  loadPets(); // 初始化加载全部宠物
});

// 定义加载宠物列表函数（支持搜索）
function loadPets(type = '全部') {
  let apiUrl = 'http://localhost:8080/GetPetList';
  if (type !== '全部') {
    apiUrl = `http://localhost:8080/SearchPet?type=${encodeURIComponent(type)}`;
  }

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error('加载失败');
      return res.json();
    })
    .then(data => {
      const container = document.getElementById('adoptionList');
      container.innerHTML = ''; // 清空旧数据
      data.forEach(pet => {
        const card = createPetCard(pet);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('加载失败:', err);
      alert('无法加载数据，请稍后重试');
    });
}

// 创建宠物卡片通用函数
function createPetCard(pet) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-4");
  card.innerHTML = `
    <div class="adoption-details">
      <div class="adoption-detail-bac">
        <img src="${pet.imageUrl}" alt="${pet.name}">
      </div>
      <h5 class="name">${pet.name}</h5>
      <div class="detail">
        <p class="age">年龄：${pet.age}</p>
        <p class="gender">性别：${pet.gender}</p>
        <p class="condition">待领养</p>
      </div>
      <div class="introduce">
        <p>${pet.outline}</p>
      </div>
      <!-- 仅展示按钮，无功能 -->
      <div class="confirm">
        <button class="btn-confirm" disabled>确认领养</button>
      </div>
    </div>
  `;
  return card;
}

// 搜索按钮点击事件
document.getElementById("searchBtn").addEventListener("click", () => {
  // 获取当前选中的类型（默认"全部"）
  const selectedType = document.querySelector(".dropdown-item.active")?.textContent || "全部";
  loadPets(selectedType); // 重新加载对应类型的宠物
});

// 下拉菜单选项点击事件（Bootstrap会自动处理激活状态）
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".dropdown-toggle").textContent = e.target.textContent;
  });
});