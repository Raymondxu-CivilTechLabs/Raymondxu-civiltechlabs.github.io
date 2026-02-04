document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-md");
  const filterButtons = document.querySelectorAll("#news-filters button");

  let allItems = [];

  try {
    const res = await fetch("./contents/home/news.md");
    const mdText = await res.text();

    // 拆分 markdown 条目（按行）
    allItems = mdText
      .split("\n")
      .filter(l => l.trim().startsWith("- "))
      .map(line => {
        // 支持两种链接格式：
        // 1. 旧格式：research.html#LDPM1
        // 2. 新格式：research-detail.html?id=research1
        let section = "all";
        
        // 尝试匹配新格式：{section}-detail.html?id=
        let match = line.match(/\(([a-z-]+)-detail\.html\?id=/);
        if (match) {
          section = match[1].replace(/-detail$/, ''); // 移除 -detail 后缀
        } else {
          // 尝试匹配旧格式：{section}.html#
          match = line.match(/\(([a-z]+)\.html#/);
          if (match) {
            section = match[1];
          }
        }
        
        return { md: line, section };
      });

    render("all");

  } catch (e) {
    newsContainer.innerHTML = "<p>Failed to load news.</p>";
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.section);
    });
  });

  function render(section) {
    const items =
      section === "all"
        ? allItems
        : allItems.filter(i => i.section === section);

    // 将markdown条目转换为HTML，同时保留分类信息
    const htmlItems = items.map(i => {
      const line = i.md;
      // 匹配新格式：- **YYYY-MM-DD** — [title](link) {section}
      const match = line.match(/- \*\*(.*?)\*\* — \[(.*?)\]\((.*?)\)\s*\{(.*?)\}/);
      if (!match) {
        // 如果没有分类信息，用旧格式处理
        return line;
      }
      
      const [, date, title, href, sectionTag] = match;
      const sectionLabel = sectionTag.toUpperCase();
      
      // 构造新的markdown，去除{section}部分，但保留分类显示在日期后
      return `- **${date}** <span class="news-category">[${sectionLabel}]</span> — [${title}](${href})`;
    }).join("\n");

    // 🔴 关键点：用 marked 解析 Markdown
    newsContainer.innerHTML = marked.parse(htmlItems);
  }
});
