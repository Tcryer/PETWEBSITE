
// 获取元素
const showVaccineModalBtn = document.getElementById("showVaccineModalBtn");
const vaccineOverlay = document.getElementById("vaccineOverlay");
const vaccineModal = document.getElementById("vaccineModal");
const saveVaccineBtn = document.getElementById("saveVaccineBtn");
const closevaccineBtn = document.getElementById("closevaccineBtn");
const vaccineList = document.getElementById("vaccineList");

// 点击“新增疫苗接种记录”按钮 显示弹层
showVaccineModalBtn.addEventListener("click", () => {
  vaccineOverlay.style.display = "block";
  vaccineModal.style.display = "block";
});

// 点击“取消”按钮  关闭弹层
closevaccineBtn.addEventListener("click", () => {
  hidevaccineModal();
});

// 点击灰色背景也能关闭:
vaccineOverlay.addEventListener("click", () => {
  hidevaccineModal();
});

// 隐藏弹层的函数
function hidevaccineModal() {
  vaccineOverlay.style.display = "none";
  vaccineModal.style.display = "none";
}

// 点击“添加”按钮，把表单数据添加到 vaccineList
saveVaccineBtn.addEventListener("click", () => {
  const nameValue = document.getElementById("vaccineName").value.trim();
  const typeValue = document.getElementById("vaccineType").value.trim();
  const dateValue = document.getElementById("vaccineDate").value;

  if (!nameValue || !typeValue || !dateValue) {
    alert("请填写完整的疫苗信息！");
    return;
  }

  // 创建一个卡片
  const cardDiv = document.createElement("div");
  cardDiv.style.cssText = "margin-top: 10px; background: #fff; border-radius: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";

  cardDiv.innerHTML = `
      <p><strong>疫苗名称：</strong>${nameValue}</p>
      <p><strong>疫苗种类：</strong>${typeValue}</p>
      <p><strong>接种日期：</strong>${dateValue}</p>
      <button class="btn btn-warning btn-sm edit-btn" style="margin-right:50px;background-color:#EDCD7B">编辑</button>
      <button class="btn btn-danger btn-sm delete-btn" style="background-color:#ED6D5F">删除</button>
    `;

  // 绑定编辑按钮事件
  cardDiv.querySelector(".edit-btn").addEventListener("click", () => {

    document.getElementById("vaccineName").value = nameValue;
    document.getElementById("vaccineType").value = typeValue;
    document.getElementById("vaccineDate").value = dateValue;


    vaccineOverlay.style.display = "block";
    vaccineModal.style.display = "block";


  });

  // 绑定删除按钮事件
  cardDiv.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("确定要删除该疫苗记录吗？")) {
      cardDiv.remove();
    }
  });

  // 加入到 vaccineList 容器
  vaccineList.appendChild(cardDiv);

  // 清空表单并关闭弹层
  document.getElementById("vaccineName").value = "";
  document.getElementById("vaccineType").value = "";
  document.getElementById("vaccineDate").value = "";
  hideModal();
});

