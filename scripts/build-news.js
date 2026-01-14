const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// 需要扫描的文件夹
const sections = ["events", "research", "teaching", "blog", "interests"];
const contentsDir = path.join(__dirname, "..", "contents");
const newsFile = path.join(contentsDir, "home", "news.md");

// 读取现有 news.md 内容
let existingNews = [];
if (fs.existsSync(newsFile)) {
  existingNews = fs.readFileSync(newsFile, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

// 生成已存在条目的 key 集合，避免重复
const existingKeys = new Set(
  existingNews.map(line => {
    const match = line.match(/\((.*?)\.html#(.*?)\)/);
    return match ? `${match[1]}/${match[2]}` : line;
  })
);

// 获取标题
function getTitleFromMD(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);
  let title = parsed.data.title;
  if (!title) {
    const lines = content.split("\n");
    const h1Line = lines.find(line => line.startsWith("# "));
    title = h1Line ? h1Line.replace(/^#\s*/, "").trim() : path.basename(filePath, ".md");
  }
  return title;
}

// 获取日期，返回 YYYY-MM
function getDateFromMD(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);
  let date = parsed.data.date;

  if (!date) {
    const stats = fs.statSync(filePath);
    date = stats.mtime;
  }

  if (typeof date === "string") {
    return date.slice(0, 7); // YYYY-MM
  } else if (date instanceof Date) {
    return date.toISOString().slice(0, 7); // YYYY-MM
  } else {
    return new Date().toISOString().slice(0, 7);
  }
}

// 收集新增条目
let newEntries = [];

sections.forEach(section => {
  const sectionDir = path.join(contentsDir, section);
  if (!fs.existsSync(sectionDir)) return;

  const files = fs.readdirSync(sectionDir).filter(f => f.endsWith(".md"));
  files.forEach(file => {
    const fullPath = path.join(sectionDir, file);
    const title = getTitleFromMD(fullPath);
    const date = getDateFromMD(fullPath);
    const fileKey = `${section}/${path.basename(file, ".md")}`;

    // 如果 news.md 中没有这个条目，则视为新条目
    if (!existingKeys.has(fileKey)) {
      const relativeLink = `${section}.html#${path.basename(file, ".md")}`;
      const line = `- **${date}** — [${title}](${relativeLink})`;
      newEntries.push({ line, date, key: fileKey });
    }
  });
});

// 将新条目按日期倒序，放在 news.md 顶部
if (newEntries.length > 0) {
  newEntries.sort((a, b) => b.date.localeCompare(a.date));
  const existingContent = existingNews.join("\n");
  const contentToWrite = newEntries.map(e => e.line).join("\n") + "\n" + existingContent + "\n";
  fs.writeFileSync(newsFile, contentToWrite, "utf-8");
  console.log(`Added ${newEntries.length} new entries to news.md`);
} else {
  console.log("No new entries to add.");
}
