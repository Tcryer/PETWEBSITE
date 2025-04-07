window.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const loginEl = document.getElementById("nav-login");
  const userInfoEl = document.getElementById("user-info");
  const usernameSpan = document.getElementById("username-display");
  const logoutBtn = document.getElementById("logout-btn");

  if (username) {
    // 登录状态
    loginEl.style.display = "none";
    userInfoEl.style.display = "inline-block";
    usernameSpan.textContent = username;

    // 绑定退出事件
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("username");
      location.reload();
    });
  }
});
