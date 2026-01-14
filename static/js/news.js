document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-md");
  if (!newsContainer) return;

  fetch("contents/home/news.md")
    .then(response => response.text())
    .then(text => {
      // 分割每行并去除空行
      const lines = text
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0);

      if (lines.length === 0) {
        newsContainer.innerHTML = "<li>No news available.</li>";
        return;
      }

      // 按日期倒序（最新在前）
      const sorted = [...lines].sort((a, b) => {
        const dateA = a.match(/\*\*(.*?)\*\*/) ? a.match(/\*\*(.*?)\*\*/)[1] : "";
        const dateB = b.match(/\*\*(.*?)\*\*/) ? b.match(/\*\*(.*?)\*\*/)[1] : "";
        return dateB.localeCompare(dateA);
      });

      // 只显示最新5条
      const latestFive = sorted.slice(0, 6);

      // 渲染到列表
      newsContainer.innerHTML = latestFive
        .map(line => {
          // line 是 markdown 链接格式 - **YYYY-MM** — [title](link)
          // 转成 HTML
          const match = line.match(/- \*\*(.*?)\*\* — \[(.*?)\]\((.*?)\)/);
          if (!match) return `<li>${line}</li>`;
          const [, date, title, href] = match;
          return `<li><span class="news-date">${date}</span> — <a class="news-link" href="${href}">${title}</a></li>`;
        })
        .join("");

      // 如果总条目超过5条，添加 —More
      if (sorted.length > 6) {
        const moreLink = document.createElement("a");
        moreLink.href = "all-news.html";
        moreLink.textContent = "— More";
        moreLink.className = "news-more-link";
        newsContainer.parentElement.appendChild(moreLink);
      }
    })
    .catch(err => {
      console.error("Failed to load news.md:", err);
      newsContainer.innerHTML = "<li>Error loading news.</li>";
    });
});
