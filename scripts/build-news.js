const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// 需要扫描的文件夹
const sections = ["events", "research", "teaching", "blog", "interests"];
const contentsDir = path.join(__dirname, "..", "contents");
const newsFile = path.join(contentsDir, "home", "news.md");

// 获取标题
function getTitleFromMD(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);
  let title = parsed.data.title;

  if (!title) {
    const lines = content.split("\n");
    const h1Line = lines.find(line => line.startsWith("# "));
    title = h1Line
      ? h1Line.replace(/^#\s*/, "").trim()
      : path.basename(filePath, ".md");
  }
  return title;
}

// 获取日期，返回 YYYY-MM-DD
function getDateFromMD(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);
  let date = parsed.data.date;

  if (!date) {
    date = fs.statSync(filePath).mtime;
  }

  if (typeof date === "string") {
    return date.slice(0, 10);
  } else if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  } else {
    return new Date().toISOString().slice(0, 10);
  }
}

// 收集所有条目（全量重建）
let entries = [];

sections.forEach(section => {
  const sectionDir = path.join(contentsDir, section);
  if (!fs.existsSync(sectionDir)) return;

  const files = fs.readdirSync(sectionDir).filter(f => f.endsWith(".md"));
  files.forEach(file => {
    const fullPath = path.join(sectionDir, file);
    const title = getTitleFromMD(fullPath);
    const date = getDateFromMD(fullPath);
    const slug = path.basename(file, ".md");

    const relativeLink = `${section}.html#${slug}`;
    const line = `- **${date}** — [${title}](${relativeLink})`;

    entries.push({ line, date });
  });
});

// 按年月日倒序排序并写入 news.md（完全覆盖）
if (entries.length > 0) {
  entries.sort((a, b) => b.date.localeCompare(a.date));

  const header = `<!-- AUTO-GENERATED FILE, DO NOT EDIT -->\n\n`;
  const contentToWrite =
    header + entries.map(e => e.line).join("\n") + "\n";

  fs.writeFileSync(newsFile, contentToWrite, "utf-8");
  console.log(`Rebuilt news.md with ${entries.length} entries`);
} else {
  // 如果没有任何内容，也覆盖为空（避免残留）
  fs.writeFileSync(
    newsFile,
    "<!-- AUTO-GENERATED FILE, DO NOT EDIT -->\n",
    "utf-8"
  );
  console.log("No entries found. news.md cleared.");
}
