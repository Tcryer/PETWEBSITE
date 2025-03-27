
document.addEventListener("DOMContentLoaded", function () {
  const navLogin = document.getElementById('nav-login'); // 登录注册按钮区域的id为nav-login
  const username = localStorage.getItem('username');

  if (username) {
    // 已登录，替换为头像
    navLogin.innerHTML = `
        <div class="user-avatar">
          <img src="../images/images2/狗2.pngs" alt="用户头像" style="width:40px;height:40px;border-radius:50%;">
        </div>`;
  } else {
    // 未登录，确保显示登录注册按钮
    navLogin.innerHTML = `<a href="./login.html">登录</a> 或 <a href="./register.html">注册</a>`;
  }
});
