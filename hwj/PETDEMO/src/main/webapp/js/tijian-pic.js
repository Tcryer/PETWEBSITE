let input = document.createElement('input');
input.type = 'file';  // 创建一个文件输入框
let btn = document.querySelector('.tijian-pic h3');
let tijianPicDiv = document.querySelector('.tijian-pic');  // 显示图片的容器


btn.addEventListener('click', () => {
  input.click();
});


input.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    // 隐藏提示文字
    btn.style.display = 'none';

    // 创建图片元素并显示预览
    let url = URL.createObjectURL(e.target.files[0]);  // 获取图片的 URL 地址
    let img = new Image();
    img.src = url;

    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    // 添加到容器中
    tijianPicDiv.appendChild(img);

    // 创建 FormData 对象来上传文件
    let formData = new FormData();
    formData.append('TJImage', e.target.files[0]);

    // 上传体检图片到后端
    fetch('http://localhost:8080/petwebsite/HealthManage2/TJImageOSS', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('上传成功:', data);

        // 后端返回图片 URL，通过以下方式显示：
        tijianPicDiv.innerHTML = `<img src="${data.imageUrl}" alt="体检报告">`;
      })
      .catch(error => {
        console.error('上传失败:', error);
        alert('体检报告上传失败，请稍后重试');
      });
  }
});
