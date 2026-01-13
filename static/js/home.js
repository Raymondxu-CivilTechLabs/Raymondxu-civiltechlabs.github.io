// home.js
document.addEventListener("DOMContentLoaded", () => {

  // ===== Load Aboutme Markdown =====
  fetch('contents/home/aboutme.md')
    .then(res => res.text())
    .then(md => {
      document.getElementById('aboutme-md').innerHTML = marked.parse(md);
    });

  // ===== Load News Markdown =====
  fetch('contents/home/news.md')
    .then(res => res.text())
    .then(md => {
      // 转换 Markdown 为 HTML
      const html = marked.parse(md);
      const container = document.createElement('div');
      container.innerHTML = html;

      // 遍历所有 li
      container.querySelectorAll('li').forEach(li => {
        // li 内如果有链接 a
        const a = li.querySelector('a');
        if (a) {
          a.classList.add('news-link');  // 给链接加样式
          // 外部链接用 _blank
          if (a.href.startsWith('http')) a.target = '_blank';
        }
      });

      // 添加到页面
      const newsContainer = document.getElementById('news-md');
      newsContainer.appendChild(container);
    });

});
