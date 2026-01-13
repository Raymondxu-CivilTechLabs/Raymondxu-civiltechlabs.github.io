const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// 要扫描的文件夹
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
  let title = parsed.data.title || null;
  if (!title) {
    const lines = content.split("\n");
    const h1Line = lines.find(line => line.startsWith("# "));
    title = h1Line ? h1Line.replace(/^#\s*/, "").trim() : path.basename(filePath, ".md");
  }
  return title;
}

// 获取日期
function getDateFromMD(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);
  let date = parsed.data.date || null;
  if (!date) {
    const stats = fs.statSync(filePath);
    const mtime = stats.mtime;
    date = mtime.toISOString().split("T")[0]; // yyyy-mm-dd
  }
  return date;
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

    if (!existingKeys.has(fileKey)) {
      const yearMonth = date.slice(0, 7); // yyyy-mm
      const relativeLink = `${section}.html#${path.basename(file, ".md")}`;
      const line = `- **${yearMonth}** — [${title}](${relativeLink})`;
      newEntries.push({ line, date });
    }
  });
});

// 按日期倒序追加到 news.md
if (newEntries.length > 0) {
  newEntries.sort((a, b) => b.date.localeCompare(a.date));
  const contentToAppend = "\n" + newEntries.map(e => e.line).join("\n") + "\n";
  fs.appendFileSync(newsFile, contentToAppend, "utf-8");
  console.log(`Added ${newEntries.length} new entries to news.md`);
} else {
  console.log("No new entries to add.");
}
