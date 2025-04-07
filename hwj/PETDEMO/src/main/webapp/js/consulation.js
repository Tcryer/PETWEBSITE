document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.doctor-search form');

  // 获取“线上问诊”按钮
  const showdoctorModalBtn = document.getElementById('showdoctorModalBtn');

  // 获取弹出表单和遮罩
  const doctorModal = document.getElementById('doctorModal');
  const doctorOverlay = document.getElementById('doctorOverlay');

  // 点击按钮时显示表单和遮罩
  showdoctorModalBtn.addEventListener('click', () => {
    doctorModal.style.display = 'block';  // 显示表单
    doctorOverlay.style.display = 'block';  // 显示遮罩
  });

  // 点击遮罩关闭表单
  doctorOverlay.addEventListener('click', () => {
    doctorModal.style.display = 'none';  // 隐藏表单
    doctorOverlay.style.display = 'none';  // 隐藏遮罩
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();  // 阻止默认提交

    // 获取表单数据
    const doctorId = document.querySelector('input[name="doctorId"]').value.trim();
    const petName = document.querySelector('input[name="petName"]').value.trim();
    const petAge = document.querySelector('input[name="petAge"]').value.trim();
    const symptoms = document.querySelector('textarea[name="symptoms"]').value.trim();

    // 检查是否全部填写
    if (!doctorId || !petName || !petAge || !symptoms) {
      alert("请填写完整的信息！");
      return;
    }

    const payload = {
      doctorId: parseInt(doctorId),
      petName: petName,
      petAge: parseInt(petAge),
      symptoms: symptoms
    };

    // 调用接口六：提交问诊
    fetch("http://localhost:8080/petwebsite/HealthManage2/consultation/submit", {
      method: "POST",
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
        } else {
          alert("提交失败：" + data.message);
        }
      })
      .catch(err => {
        console.error("请求出错：", err);
        alert("网络错误或服务器异常");
      });

    // 清空表单
    form.reset();
  });
});
