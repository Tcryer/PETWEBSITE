
// 等DOM加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  let isCompleted = true; // 初始状态：已完成(绿色)

  toggleBtn.addEventListener("click", () => {
    if (isCompleted) {
      // 当前是“已完成”，切换到“未完成”
      toggleBtn.textContent = "标记未完成";
      toggleBtn.classList.remove("btn-completed");
      toggleBtn.classList.add("btn-uncompleted");
    } else {
      // 当前是“未完成”，切回“已完成”
      toggleBtn.textContent = "标记已完成";
      toggleBtn.classList.remove("btn-uncompleted");
      toggleBtn.classList.add("btn-completed");
    }
    // 切换布尔状态
    isCompleted = !isCompleted;
  });
});

