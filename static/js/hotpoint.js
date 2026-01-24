/* ==================== RSS 功能 ==================== */
function addRssFeed() {
  const input = document.getElementById('rss-input');
  const val = input.value.trim();
  if (!val) return;

  const container = document.getElementById('rss-modules');
  const div = document.createElement('div');
  div.innerHTML = `<a href="${val}" target="_blank">${val}</a>`;
  container.appendChild(div);

  input.value = '';
}

/* ==================== Hot: 从后端获取热搜 ==================== */
async function loadHot() {
  const hotList = document.getElementById('hot-list');
  hotList.innerHTML = '<li>Loading...</li>';

  try {
    const res = await fetch('/api/hot'); // 请求你的 Node.js 后端
    const data = await res.json();

    hotList.innerHTML = '';

    // 只显示 GitHub Trending
    data.github.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a> ⭐${item.extra.replace('⭐','')}`;
      hotList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    hotList.innerHTML = '<li>Failed to load hot data.</li>';
  }
}

/* ==================== DOM Ready ==================== */
document.addEventListener('DOMContentLoaded', () => {
  loadHot();
});
