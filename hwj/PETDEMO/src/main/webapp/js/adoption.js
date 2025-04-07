
window.addEventListener('DOMContentLoaded', () => {
  loadPets(); // 初始化加载全部宠物
});

// 定义加载宠物列表函数 可搜索
function loadPets(type = '全部') {

  //  这个api地址可能有问题 可能给不全 可复制下面地址 到谷歌看看能不能显示json数据 不能就是地址有问题
  let apiUrl = 'http://localhost:8080/selectAllServlet';
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
        <img src="${pet.petImg}" alt="${pet.petName}">
      </div>
      <h5 class="name">${pet.petName}</h5>
      <div class="detail">
        <p class="age">年龄：${pet.petAge}</p>
        <p class="type">种类：${pet.petType}</p>
        <p class="gender">性别：${pet.petGender}</p>
        <p class="state">健康状态：${pet.petState}</p>
        <p class="condition">待领养</p>
      </div>
      <div class="introduce">
        <p>${pet.petOutline}</p>
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


document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".dropdown-toggle").textContent = e.target.textContent;
  });
});