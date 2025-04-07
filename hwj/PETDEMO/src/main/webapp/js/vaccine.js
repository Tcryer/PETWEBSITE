(function () {
  // 获取元素
  const showVaccineModalBtn = document.getElementById("showVaccineModalBtn");
  const vaccineOverlay = document.getElementById("vaccineOverlay");
  const vaccineModal = document.getElementById("vaccineModal");
  const saveVaccineBtn = document.getElementById("saveVaccineBtn");
  const closevaccineBtn = document.getElementById("closevaccineBtn");
  const vaccineList = document.getElementById("vaccineList");

  // 从 URL 中获取宠物ID
  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get('petId');

  if (!petId) {
    alert("未获取到宠物ID，请确认链接正确。");
  }

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
    const nameValue = encodeURIComponent(document.getElementById("vacName").value.trim());

    const dateValue = document.getElementById("vacDate").value;

    if (!nameValue || !dateValue) {
      alert("请填写完整的疫苗信息！");
      return;
    }

    // 构造提交数据
    const vaccineData = {
      petId: parseInt(petId),
      vacName: nameValue,
      vacDate: dateValue,
      vacStatus: false
    };

    // 调用后端接口保存疫苗记录
    fetch("/HealthManage2/vaccination/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(vaccineData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message || "添加疫苗记录失败"); });
        }
        return response.json();
      })
      .then(result => {
        console.log("添加成功:", result);
        // 成功后，将疫苗记录添加到页面中
        addVaccineCard(result.id || Date.now(), nameValue, dateValue);
        // 清空表单数据
        document.getElementById("vacName").value = "";
        document.getElementById("vacDate").value = "";
        hidevaccineModal();
      })
      .catch(error => {
        console.error("错误:", error);
        alert(error.message || "添加疫苗记录失败，请稍后重试！");
      });
  });

  // 将疫苗记录卡片添加到页面的函数
  function addVaccineCard(recordId, nameValue, dateValue) {
    const cardDiv = document.createElement("div");
    cardDiv.style.cssText = "margin-top: 10px; background: #fff; border-radius: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";
    // 将记录id存入自定义属性，便于后续编辑或删除时使用
    cardDiv.dataset.recordId = recordId;

    cardDiv.innerHTML = `
    <p><strong>疫苗名称：</strong>${nameValue}</p >
    <p><strong>接种日期：</strong>${dateValue}</p >
    <button class="btn btn-warning btn-sm edit-btn" style="margin-right:50px;background-color:#EDCD7B">编辑</button>
    <button class="btn btn-danger btn-sm delete-btn" style="background-color:#ED6D5F">删除</button>
  `;

    // 编辑按钮事件：点击后将数据填入表单，并等待修改提交
    cardDiv.querySelector(".edit-btn").addEventListener("click", () => {

      document.getElementById("vacName").value = nameValue;
      document.getElementById("vacDate").value = dateValue;
      // 可以把 recordId 保存到表单上，用于更新操作
      document.getElementById("vaccineFormModal").dataset.editRecordId = recordId;
      vaccineOverlay.style.display = "block";
      vaccineModal.style.display = "block";
    });

    // 调用删除接口
    cardDiv.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("确定要删除该疫苗记录吗？")) {

        fetch(`http://localhost:8080/HealthManage2/vaccination/delete`, {
          method: "DELETE"
        })
          .then(response => {
            if (!response.ok) throw new Error("删除失败");
            return response.json();
          })
          .then(result => {
            // 删除成功后，从 DOM 中移除该卡片
            cardDiv.remove();
          })
          .catch(error => {
            console.error("删除错误:", error);
            alert("删除疫苗记录失败，请稍后重试！");
          });
      }
    });

    vaccineList.appendChild(cardDiv);
  }
  // 假设我们在表单上保存了待编辑记录的 recordId（data-edit-record-id）
  document.getElementById("vaccineFormModal").addEventListener("submit", (e) => {
    e.preventDefault();
    const editRecordId = e.target.dataset.editRecordId;
    if (editRecordId) {
      // 编辑操作：获取新的数据
      const newName = document.getElementById("vacName").value.trim();
      const newDate = document.getElementById("vacDate").value;
      if (!newName || !newDate) {
        alert("请填写完整的疫苗信息！");
        return;
      }
      const updateData = {
        // 根据后端要求需要传入 id、petId、vacName、vacDate、vacStatus
        id: parseInt(editRecordId),
        petId: parseInt(petId),
        vacName: newName,
        vacDate: newDate,
        vacStatus: true
      };
      fetch("http://localhost:8080/HealthManage2/vaccination/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })
        .then(response => {
          if (!response.ok) throw new Error("更新失败");
          return response.json();
        })
        .then(result => {


          location.reload();
        })
        .catch(error => {
          console.error("编辑错误:", error);
          alert("更新疫苗记录失败，请稍后重试！");
        });
    }
  });
})();