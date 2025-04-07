document.addEventListener('DOMContentLoaded', () => {
  // 从 URL 中获取医生 ID 参数（接口七要求参数名为 id）
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert("未提供医生ID");
    return;
  }

  // 调用接口七：医生详情查询，根据医生ID获取医生详细信息
  fetch(`http://localhost:8080/petwebsite/HealthManage2/doctor/detail?id=${id}`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('接口错误');
      }
      return response.json();
    })
    .then(doctor => {
      // 填充医生详细信息
      document.getElementById('doctorName').innerText = doctor.name || '';
      document.getElementById('doctorCode').innerText = doctor.doctorCode || '';
      document.getElementById('doctorRegion').innerText = doctor.region || '';
      document.getElementById('doctorSpecialty').innerText = doctor.specialty || '';
      document.getElementById('doctorProfile').innerText = doctor.profile || '';

      // 初始化点赞数并设置按钮文本
      const likeCount = (doctor.likes !== undefined) ? doctor.likes : 0;
      document.getElementById('likeCount').innerText = likeCount;
      // 默认按钮显示“收藏 (likeCount)”
      document.getElementById('buttonText').innerText = "收藏";


      window.isCollected = doctor.isCollected || false;
      if (window.isCollected) {
        document.getElementById('buttonText').innerText = "已收藏";
      }
    })
    .catch(error => {
      console.error('加载医生详情失败:', error);
    });

  // 收藏按钮功能（接口九：点赞/取消点赞）
  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", () => {
    if (!window.isCollected) {
      // 当前未收藏，点击后进行收藏
      if (confirm("你确认收藏吗？")) {
        fetch('http://localhost:8080/petwebsite/HealthManage2/like/toggle', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ doctorId: parseInt(doctorId) })
        })
          .then(response => response.json())
          .then(result => {
            if (result.isLiked) {
              // 更新按钮状态为“已收藏”
              document.getElementById('buttonText').innerText = "已收藏";
              window.isCollected = true;
              // 增加收藏数
              updateLikeCount(1);
            }
          })
          .catch(error => {
            console.error("收藏请求失败:", error);
          });
      }
    } else {
      // 当前已收藏，点击后取消收藏
      if (confirm("你确认取消收藏吗？")) {
        fetch('http://localhost:8080/api/like/toggle', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ doctorId: parseInt(doctorId) })
        })
          .then(response => response.json())
          .then(result => {
            if (!result.isLiked) {
              document.getElementById('buttonText').innerText = "收藏";
              window.isCollected = false;
              // 减少点赞数
              updateLikeCount(-1);
            }
          })
          .catch(error => {
            console.error("取消收藏请求失败:", error);
          });
      }
    }
  });

  // 更新收藏数显示
  function updateLikeCount(delta) {
    const likeCountSpan = document.getElementById('likeCount');
    let currentCount = parseInt(likeCountSpan.innerText) || 0;
    currentCount += delta;
    likeCountSpan.innerText = currentCount;
  }
});
