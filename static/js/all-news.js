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
        const match = line.match(/\((.*?)\.html#/);
        const section = match ? match[1] : "all";
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
