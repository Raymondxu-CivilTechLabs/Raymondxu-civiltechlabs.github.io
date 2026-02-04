const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// ========== 配置部分 ==========
// 需要扫描的文件夹（顺序很重要，用于生成 id）
const sections = ["events", "research", "teaching", "blog", "interests"];
const contentsDir = path.join(__dirname, "..", "contents");
const newsFile = path.join(contentsDir, "home", "news.md");

// 特定 section 的文件列表（如果 section 目录中的文件有特殊命名规则，在此定义）
// 格式：section: ['file1.md', 'file2.md', ...]
// 如果不存在，则自动按字母顺序扫描
const filePatterns = {
  'research': ['LDPM1.md', 'LDPM2.md', 'LDPM3.md', 'LDPM4.md']
};

// ========== 辅助函数 ==========
/**
 * 获取标题（从 YAML front matter 或 H1 标题）
 */
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

/**
 * 获取日期（从 YAML front matter，返回 YYYY-MM-DD 格式）
 */
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

/**
 * 获取某个 section 中的所有 markdown 文件列表
 * 如果 filePatterns 中有定义，使用定义的列表
 * 否则，自动按字母顺序扫描目录
 */
function getFilesForSection(section, sectionDir) {
  if (filePatterns[section]) {
    // 使用预定义的文件列表
    return filePatterns[section].filter(file => {
      return fs.existsSync(path.join(sectionDir, file));
    });
  } else {
    // 自动扫描目录中的所有 .md 文件并排序
    const files = fs.readdirSync(sectionDir)
      .filter(f => f.endsWith(".md"))
      .sort(); // 按字母顺序排序
    return files;
  }
}

/**
 * 根据 ContentManager 的规则生成文件 ID
 * 规则：{section}{index}，其中 index 从 1 开始
 */
function generateFileId(section, fileIndex) {
  return `${section}${fileIndex + 1}`;
}

// ========== 主逻辑 ==========
let entries = [];

sections.forEach(section => {
  const sectionDir = path.join(contentsDir, section);
  if (!fs.existsSync(sectionDir)) {
    console.log(`⚠️  Section directory not found: ${sectionDir}`);
    return;
  }

  // 获取该 section 的所有 markdown 文件
  const files = getFilesForSection(section, sectionDir);
  
  if (files.length === 0) {
    console.log(`ℹ️  No markdown files found in ${section}`);
    return;
  }

  files.forEach((file, fileIndex) => {
    const fullPath = path.join(sectionDir, file);
    const title = getTitleFromMD(fullPath);
    const date = getDateFromMD(fullPath);
    
    // 根据 ContentManager 规则生成 ID
    const fileId = generateFileId(section, fileIndex);
    
    // 生成指向详情页面的链接
    const detailLink = `${section}-detail.html?id=${fileId}`;
    const line = `- **${date}** — [${title}](${detailLink})`;

    entries.push({ 
      line, 
      date,
      section,
      fileId,
      title,
      file 
    });
    
    console.log(`✓ ${section}/${file} → ${fileId}`);
  });
});

// ========== 生成 news.md ==========
if (entries.length > 0) {
  // 按日期倒序排序（最新的在前）
  entries.sort((a, b) => b.date.localeCompare(a.date));

  const header = `<!-- AUTO-GENERATED FILE, DO NOT EDIT -->
<!-- 
此文件由 scripts/build-news.js 自动生成
运行: npm run build-news
如要修改 news 内容，请在 contents/{section}/*.md 文件中修改 date 和 title 字段
-->

`;
  const contentToWrite = header + entries.map(e => e.line).join("\n") + "\n";

  fs.writeFileSync(newsFile, contentToWrite, "utf-8");
  console.log(`\n✅ Successfully rebuilt news.md with ${entries.length} entries`);
  console.log(`📝 Output: ${newsFile}`);
} else {
  // 如果没有任何内容，也覆盖为空（避免残留）
  fs.writeFileSync(
    newsFile,
    `<!-- AUTO-GENERATED FILE, DO NOT EDIT -->
<!-- 此文件由 scripts/build-news.js 自动生成。当前暂无条目 -->
`,
    "utf-8"
  );
  console.log("\n⚠️  No entries found. news.md cleared.");
}

console.log("\n📌 建议: 定期运行 'npm run build-news' 来保持 news.md 最新！");
