
// 获取元素
const showModalBtn = document.getElementById("showdoctorModalBtn");
const doctorOverlay = document.getElementById("doctorOverlay");
const doctorModal = document.getElementById("doctorModal");
const savedoctorBtn = document.getElementById("savedoctorBtn");
const closeModalBtn = document.getElementById("closeModalBtn");


// 点击“线上问诊”按钮 -> 显示弹层
showdoctorModalBtn.addEventListener("click", () => {
  doctorOverlay.style.display = "block";
  doctorModal.style.display = "block";
});

// 点击“取消”按钮 -> 关闭弹层
closeModalBtn.addEventListener("click", () => {
  hideModal();
});

// 如果想点击灰色背景也能关闭，可添加:
doctorOverlay.addEventListener("click", () => {
  hideModal();
});

// 隐藏弹层的函数
function hideModal() {
  doctorOverlay.style.display = "none";
  doctorModal.style.display = "none";
}

// 点击“提交”按钮，把表单数据添加到 vaccineList
savedoctorBtn.addEventListener("click", () => {
  const nameValue = document.getElementById("doctorName").value.trim();
  const typeValue = document.getElementById("petType").value.trim();
  const dateValue = document.getElementById("petDate").value;
  const numberValue = document.getElementById("doctornumber").value.trim();
  const doctorValue = document.getElementById("petName").value.trim();
  const conditionValue = document.getElementById("petcondition").value.trim();

  if (!nameValue || !typeValue || !dateValue || !numberValue || !doctorValue || !conditionValue) {
    alert("请填写完整的信息！");
    return;
  }

  //发给后端对象
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

  //清空表单
  document.getElementById("doctorName").value = "";
  document.getElementById("petType").value = "";
  document.getElementById("petDate").value = "";
  document.getElementById("petName").value = "";
  document.getElementById("doctornumber").value = "";
  document.getElementById("petcondition").value = "";
});