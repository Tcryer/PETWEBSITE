document.addEventListener("DOMContentLoaded", () => {
  let editMode = null; // 记录当前是否处于编辑状态（指向要编辑的卡片）

  // 获取页面元素
  const addVaccineBtn = document.getElementById("addVaccineBtn");
  const vaccineForm = document.getElementById("vaccineForm");
  const saveVaccineBtn = document.getElementById("saveVaccineBtn");
  const vaccineList = document.getElementById("vaccineList");

  // 点击“新增疫苗接种记录”按钮，切换表单显示/隐藏
  addVaccineBtn.addEventListener("click", () => {
    if (vaccineForm.style.display === "none" || !vaccineForm.style.display) {
      vaccineForm.style.display = "block";
    } else {
      vaccineForm.style.display = "none";
    }
    editMode = null; // 清除编辑模式
  });

  // 点击“添加”或“保存”按钮
  saveVaccineBtn.addEventListener("click", () => {
    const nameValue = document.getElementById("vaccineName").value.trim();
    const typeValue = document.getElementById("vaccineType").value.trim();
    const dateValue = document.getElementById("vaccineDate").value;

    // 表单验证
    if (!nameValue || !typeValue || !dateValue) {
      alert("请填写完整的疫苗信息！");
      return;
    }

    if (editMode) {
      // 如果是编辑模式，更新卡片内容
      editMode.querySelector(".vaccine-name").innerText = nameValue;
      editMode.querySelector(".vaccine-type").innerText = typeValue;
      editMode.querySelector(".vaccine-date").innerText = dateValue;
      editMode = null;
    } else {
      // 创建一个新的疫苗卡片
      const cardDiv = document.createElement("div");
      cardDiv.className = "vaccine-card";
      cardDiv.style.cssText = `
        margin-top: 10px; 
        background: #fff; 
        border-radius: 10px; 
        padding: 10px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      `;

      cardDiv.innerHTML = `
        <p><strong>疫苗名称：</strong> <span class="vaccine-name">${nameValue}</span></p>
        <p><strong>疫苗种类：</strong> <span class="vaccine-type">${typeValue}</span></p>
        <p><strong>接种日期：</strong> <span class="vaccine-date">${dateValue}</span></p>
        <button class="btn btn-warning btn-sm edit-btn">编辑</button>
        <button class="btn btn-danger btn-sm delete-btn">删除</button>
      `;

      // 绑定“编辑”事件
      cardDiv.querySelector(".edit-btn").addEventListener("click", () => {
        editMode = cardDiv; // 记录当前正在编辑的卡片
        document.getElementById("vaccineName").value = nameValue;
        document.getElementById("vaccineType").value = typeValue;
        document.getElementById("vaccineDate").value = dateValue;
        vaccineForm.style.display = "block"; // 显示表单以便修改
      });

      // 绑定“删除”事件
      cardDiv.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("确定要删除该疫苗记录吗？")) {
          cardDiv.remove();
        }
      });

      // 将卡片加入列表容器
      vaccineList.appendChild(cardDiv);
    }

    // 清空表单并隐藏
    document.getElementById("vaccineName").value = "";
    document.getElementById("vaccineType").value = "";
    document.getElementById("vaccineDate").value = "";
    vaccineForm.style.display = "none";
  });
});
