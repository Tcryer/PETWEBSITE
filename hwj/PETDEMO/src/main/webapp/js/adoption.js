document.addEventListener('DOMContentLoaded', init);

async function init() {
  const petId = new URLSearchParams(location.search).get('id') || '1';
  try {
    const resp = await fetch(`https://your-api.com/pets/${petId}`);
    if (!resp.ok) throw new Error('网络错误');
    const pet = await resp.json();
    render(pet);
  } catch (e) {
    console.error(e);
    document.querySelector('.adoption-details').innerHTML = '<p>加载失败，请刷新重试</p>';
  }
}

function render(pet) {
  document.getElementById('pet-image').src = pet.imageUrl;
  document.getElementById('pet-name').textContent = pet.name;
  document.getElementById('pet-age').textContent = `年龄：${pet.age}`;
  document.getElementById('pet-gender').textContent = `性别：${pet.gender}`;
  document.getElementById('pet-intro').textContent = pet.description;

  const condEl = document.getElementById('pet-condition');
  const btn = document.getElementById('adopt-button');

  if (pet.status === '已领养') {
    condEl.textContent = '已领养';
    condEl.style.color = 'green';
    btn.textContent = '已领养';
    btn.disabled = true;
  } else {
    condEl.textContent = '未领养';
    btn.textContent = '确认领养';
    btn.addEventListener('click', () => handleAdopt(pet.id));
  }
}

async function handleAdopt(id) {
  if (!confirm('你是否确认领养？')) return;

  try {
    const resp = await fetch(`https://your-api.com/pets/${id}/adopt`, { method: 'POST' });
    if (!resp.ok) throw new Error('更新失败');
    document.getElementById('pet-condition').textContent = '已领养';
    document.getElementById('pet-condition').style.color = 'green';
    const btn = document.getElementById('adopt-button');
    btn.textContent = '已领养';
    btn.disabled = true;
  } catch {
    alert('操作失败，请稍后重试');
  }
}
