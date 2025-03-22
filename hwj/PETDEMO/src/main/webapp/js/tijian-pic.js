let input = document.createElement('input')
input.type = 'file'
let btn = document.querySelector('.tijian-pic h3')
let tijianPicDiv = document.querySelector('.tijian-pic');
btn.addEventListener('click', () => {
  input.click()
})
input.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    // 隐藏提示文字
    btn.style.display = 'none';

    // 创建图片元素
    let url = URL.createObjectURL(e.target.files[0]);
    let img = new Image();
    img.src = url;

    // 设置图片样式
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    // 将图片添加到容器中
    tijianPicDiv.appendChild(img);
  }
});