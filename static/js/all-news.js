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

    // 🔴 关键点：用 marked 解析 Markdown
    const md = items.map(i => i.md).join("\n");
    newsContainer.innerHTML = marked.parse(md);
  }
});
