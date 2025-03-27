window.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const btn = document.getElementById("btn");
  const alertDiv = document.getElementById("alert");

  btn.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !password) {
      alert("输入内容不能为空");
      return;
    }
    // 使用 fetch 发送 POST 请求
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alertDiv.className = "alert-success";
          alertDiv.innerHTML = data.message;
          alertDiv.style.display = "block";

          // 模拟成功登录
          alertDiv.className = "alert-success";
          alertDiv.innerHTML = "登录成功";
          alertDiv.style.display = "block";

          // 保存登录状态（例如 token 或用户名）
          localStorage.setItem("username", username);
          // 若后端返回token，也可以存储 token: localStorage.setItem("token", data.token);

          // 跳转回 index.html，或根据需求跳转
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 1000);
        } else {
          alertDiv.className = "alert-warning";
          alertDiv.innerHTML = data.message;
          alertDiv.style.display = "block";
        }
      })
      .catch(err => {
        console.error("请求错误:", err);
      });
  });
});
