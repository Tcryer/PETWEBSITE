
// 获取元素
const showModalBtn = document.getElementById("showweightModalBtn");
const weightOverlay = document.getElementById("weightOverlay");
const weightModal = document.getElementById("weightModal");
const saveweightBtn = document.getElementById("saveweightBtn");
const closeModalBtn = document.getElementById("closeModalBtn");


// 点击“新增体重记录”按钮 显示弹层
showweightModalBtn.addEventListener("click", () => {
  weightOverlay.style.display = "block";
  weightModal.style.display = "block";
});

// 点击“取消”按钮  关闭弹层
closeModalBtn.addEventListener("click", () => {
  hideModal();
});

// 点击灰色背景也能关闭:
weightOverlay.addEventListener("click", () => {
  hideModal();
});

// 隐藏弹层的函数
function hideModal() {
  weightOverlay.style.display = "none";
  weightModal.style.display = "none";
}

// 点击“添加”按钮，把表单数据添加到 vaccineList
saveweightBtn.addEventListener("click", () => {
  const weightValue = document.getElementById("weight").value.trim();
  const dateValue = document.getElementById("weightDate").value;

  if (!weightValue || !dateValue) {
    alert("请填写完整的体重信息！");
    return;
  }

  const payload = {
    doctorName: nameValue,
    petType: typeValue,
    petDate: dateValue,
    doctornumber: numberValue,
    doctorName: doctorValue,
    petcondition: conditionValue,
  };
  fetch("#", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

    .then(res => res.json())

    .then(data => {
      console.log("后端返回：", data);
      if (data.success) {
        alert("提交成功");
        hideModal();
      } else {
        alert("提交失败：" + data.message);
      }
    })

    .catch(err => {
      console.error("请求出错：", err);
      alert("网络错误或服务器异常");
    });



  // 清空表单并关闭弹层
  document.getElementById("weight").value = "";
  document.getElementById("weightDate").value = "";
  hideModal();
});

