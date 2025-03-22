// 等DOM加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  let isCompleted = false; // false表示“收藏”状态，true表示“已收藏”状态

  // 初始化按钮文本和样式
  toggleBtn.textContent = "收藏";
  toggleBtn.classList.add("btn-outline-collect icon-guanzhu-zhihui");

  toggleBtn.addEventListener("click", () => {
    if (!isCompleted) {
      // 当前是“收藏”，点击后询问是否收藏
      if (confirm("你确认收藏吗？")) {
        toggleBtn.textContent = "已收藏";
        toggleBtn.classList.remove("btn-outline-collect icon-guanzhu-zhihui");
        toggleBtn.classList.add("btn-outline-alreadycollect");
        isCompleted = true;
      }
      // 如果用户点取消，不切换状态
    } else {
      // 当前是“已收藏”，点击后询问是否取消收藏
      if (confirm("你确认取消收藏吗？")) {
        toggleBtn.textContent = "收藏";
        toggleBtn.classList.remove("btn-outline-alreadycollect");
        toggleBtn.classList.add("btn-outline-collect icon-guanzhu-zhihui");
        isCompleted = false;
      }
    }
  });
});
