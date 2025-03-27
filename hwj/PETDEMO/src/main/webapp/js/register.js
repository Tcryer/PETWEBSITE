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
    const createTime = new Date().getTime();

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, create_time: createTime })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alertDiv.className = "alert-success";
          alertDiv.innerHTML = data.message;
          alertDiv.style.display = "block";
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
