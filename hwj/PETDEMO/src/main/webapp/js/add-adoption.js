// 获取元素
const showadoptionBtn = document.getElementById("showadoptionBtn");
const adoptionOverlay = document.getElementById("adoptionOverlay");
const adoptionModal = document.getElementById("adoptionModal");
const saveadoptionBtn = document.getElementById("saveadoptionBtn");
const closeadoptionBtn = document.getElementById("closeadoptionBtn");
const adoptiondetails = document.getElementById("adoptiondetails");
const petImageInput = document.getElementById("petImageInput"); // 获取文件输入框

// 显示弹层
showadoptionBtn.addEventListener("click", () => {
  adoptionOverlay.style.display = "block";
  adoptionModal.style.display = "block";
});

// 隐藏弹层
function hideadoptionModal() {
  adoptionOverlay.style.display = "none";
  adoptionModal.style.display = "none";
}

closeadoptionBtn.addEventListener("click", hideadoptionModal);
adoptionOverlay.addEventListener("click", hideadoptionModal);

// 提交按钮事件
saveadoptionBtn.addEventListener("click", () => {
  const name = document.getElementById("petName").value.trim();
  const type = document.getElementById("petType").value.trim();
  const age = document.getElementById("petage").value.trim();
  const gender = document.getElementById("petgender").value.trim();
  const outline = document.getElementById("petoutline").value.trim();
  const imageFile = petImageInput.files[0];

  if (!name || !type || !age || !gender || !outline || !imageFile) {
    alert("请填写完整信息并上传图片！");
    return;
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("petname", name);
  formData.append("pettype", type);
  formData.append("petage", age);
  formData.append("petgender", gender);
  formData.append("petoutline", outline);

  fetch("http://localhost:8080/AddServlet", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(responseText => {
      console.log("后端返回：", responseText);
      if (responseText.includes("成功")) {
        alert("添加成功！");
        hideadoptionModal();

        // 创建并添加卡片
        const card = document.createElement("div");
        card.classList.add("adoption-details"); // 重要：使用已有样式类
        card.innerHTML = `
          <div class="adoption-detail-bac">
            <img src="${URL.createObjectURL(imageFile)}" alt="">
          </div>
          <h5 class="name">${name}</h5>
          <div class="detail">
            <p class="age">年龄：${age}</p>
            <p class="gender">性别：${gender}</p>
            <p class="condition">待领养</p>
          </div>
          <div class="introduce">
            <p>${outline}</p>
          </div>
          <div class="confirm">
            <button class="btn-confirm">确认领养</button>
          </div>
        `;

        adoptiondetails.appendChi(card);
        document.getElementById("adoptionList").appendChild(card);

        // 清空表单
        document.getElementById("petName").value = "";
        document.getElementById("petType").value = "";
        document.getElementById("petage").value = "";
        document.getElementById("petgender").value = "";
        document.getElementById("petintro").value = "";
        petImageInput.value = "";
      } else {
        alert("添加失败：" + responseText);
      }
    })
    .catch(err => {
      console.error("错误：", err);
      alert("服务器异常或网络错误！");
    });
});
