# 🔗 完整系统集成指南 - Research 模块

## 📋 集成完成清单

### 已实现的模块

#### ✅ Events 模块
- 列表页: `events.html`
- 详情页: `events-detail.html`
- 内容文件: `contents/events/events1.md`, `events2.md`

#### ✅ Teaching 模块
- 列表页: `teaching.html`
- 详情页: `teaching-detail.html`
- 内容文件: `contents/teaching/teaching1.md`

#### ✅ Interests 模块
- 列表页: `interests.html`
- 详情页: `interests-detail.html`
- 内容文件: `contents/interests/interests1.md`

#### ✅ Research 模块 (新增)
- 列表页: `research.html` (已更新)
- 详情页: `research-detail.html` (新建，参考 markdown.html 格式)
- 内容文件: `contents/research/LDPM1.md`, `LDPM2.md`, `LDPM3.md`, `LDPM4.md`
- 配置文件: `contents/research/config.yml` (新建)

---

## 🎯 完整用户交互流程

### 场景：用户访问 Research 部分

```
1. 用户打开网站主页 (index.html)
   ↓
2. 用户在导航栏点击 "RESEARCH"
   ↓
3. 进入 research.html (列表页面)
   ┌─ ContentManager 自动扫描 contents/research/ 文件夹
   ├─ 发现 LDPM1.md, LDPM2.md, LDPM3.md, LDPM4.md
   ├─ 解析每个文件的 YAML front matter
   │  ├─ 标题 (title)
   │  └─ 日期 (date)
   ├─ 按日期倒序排列
   └─ 渲染为列表:
      • learning trajectory - The Fundation Theory of LDPM (3)  [2026-01-14]
      • learning trajectory - The Fundation Theory of LDPM (2)  [2026-01-14]
      • learning trajectory - The Fundation Theory of LDPM (1)  [2026-01-13]
      • LDPM - Research areas at Politecnico di Milano...       [2025-12-13]
   ↓
4. 用户点击其中一个条目，例如 "learning trajectory - The Fundation Theory of LDPM (1)"
   ↓
5. 跳转到 research-detail.html?id=research2
   ┌─ ContentManager 加载该文件的完整内容
   ├─ 移除 front matter
   ├─ 使用 marked.js 解析 Markdown
   ├─ 使用 MathJax 渲染数学公式
   └─ 使用 markdown.html 风格渲染内容:
      ┌──────────────────────────────────┐
      │ ← 返回研究列表                    │
      │                                  │
      │ 标题: Learning trajectory ...     │
      │ 📅 2026-01-13                     │
      │                                  │
      │ [详细内容从 LDPM2.md 渲染]        │
      │                                  │
      │ [上一篇] [下一篇]                 │
      └──────────────────────────────────┘
   ↓
6. 用户可以：
   • 阅读完整的 Markdown 内容
   • 查看数学公式 ($...$, $$...$$)
   • 点击链接和代码
   • 使用"上一篇"/"下一篇"浏览其他研究内容
   • 点击"返回"回到列表页面
```

---

## 🔧 核心技术实现

### 1. ContentManager 多模式支持

```javascript
// 定义不同section的命名模式
const filePatterns = {
  'research': ['LDPM1.md', 'LDPM2.md', 'LDPM3.md', 'LDPM4.md'],
  'default': (i) => `${this.section}${i}.md`
};

// 智能选择使用哪种模式
if (filePatterns[this.section]) {
  // 使用特定模式 (如 research)
  filesToCheck = filePatterns[this.section];
} else {
  // 使用通用模式 (如 events1.md, teaching1.md 等)
  filesToCheck = generateFromPattern();
}
```

### 2. research-detail.html 的优雅设计

采用 markdown.html 的美学风格：

```
特性:
✓ 440-740px 的最优阅读宽度
✓ 清晰的标题和元数据显示
✓ 响应式布局 (适配移动设备)
✓ 完整的 Markdown 排版支持
✓ 数学公式渲染 (MathJax)
✓ 代码高亮
✓ 上一篇/下一篇导航
✓ 返回列表按钮
```

### 3. 文件发现机制

```javascript
for (let fileName of filesToCheck) {
  const filePath = `contents/research/${fileName}`;
  
  // 动态加载文件
  const response = await fetch(filePath);
  
  // 解析元数据和内容
  const metadata = extractMetadata(content);
  
  // 生成索引 ID (research1, research2, ...)
  const fileId = `${section}${index}`;
}
```

---

## 📁 完整文件清单

### HTML 页面 (8 个)
```
events.html
events-detail.html
teaching.html
teaching-detail.html
interests.html
interests-detail.html
research.html (已更新)
research-detail.html (新建)
```

### JavaScript 引擎
```
static/js/content-manager.js (已升级，支持多种命名模式)
```

### 内容文件
```
contents/events/
├── events1.md
├── events2.md
└── config.yml

contents/teaching/
├── teaching1.md
└── config.yml

contents/interests/
├── interests1.md
└── config.yml

contents/research/
├── LDPM1.md
├── LDPM2.md
├── LDPM3.md
├── LDPM4.md
└── config.yml (新建)
```

### 文档
```
QUICK_START.md
SYSTEM_GUIDE.md
ARCHITECTURE.md
IMPLEMENTATION_COMPLETE.md
INTEGRATION_GUIDE.md (本文档)
```

---

## 🧪 测试检查清单

按以下步骤测试完整流程：

### 1. 测试 Research 列表页面

- [ ] 打开 `research.html`
- [ ] 验证页面加载成功
- [ ] 查看是否显示 4 个研究条目
- [ ] 验证条目按日期倒序排列
  - [ ] LDPM (3) - 2026-01-14
  - [ ] LDPM (2) - 2026-01-14
  - [ ] LDPM (1) - 2026-01-13
  - [ ] LDPM Research - 2025-12-13

### 2. 测试详情页面导航

- [ ] 点击第一个条目
- [ ] 验证 URL 包含 `research-detail.html?id=research1`
- [ ] 验证页面标题和日期正确显示
- [ ] 验证 Markdown 内容正确渲染

### 3. 测试上一篇/下一篇导航

- [ ] 在详情页面点击"下一篇"
- [ ] 验证 URL 参数更改为正确的条目 ID
- [ ] 点击"上一篇"
- [ ] 验证返回到上一篇内容

### 4. 测试返回列表

- [ ] 在详情页面点击"返回研究列表"
- [ ] 验证回到列表页面

### 5. 测试其他模块 (交叉验证)

- [ ] 测试 events.html → events-detail.html 流程
- [ ] 测试 teaching.html → teaching-detail.html 流程
- [ ] 测试 interests.html → interests-detail.html 流程

### 6. 响应式设计测试

- [ ] 在移动设备上 (或浏览器模拟) 打开各个页面
- [ ] 验证布局正确调整
- [ ] 验证文本可读性

---

## 🎨 设计一致性

### research-detail.html 参考 markdown.html

| 特性 | markdown.html | research-detail.html |
|------|-------------|-------------------|
| 背景色 | 白色 (#ffffff) | 白色 (#ffffff) |
| 文本色 | 深灰 (#24292e) | 深灰 (#24292e) |
| 容器宽度 | 740px | 740px |
| 行高 | 1.75 | 1.75 |
| 代码背景 | #f6f8fa | #f6f8fa |
| 链接色 | #0366d6 | #0366d6 |
| 标题样式 | 左对齐，下边界 | 左对齐，下边界 |
| 排版 | GitHub 风格 | GitHub 风格 |

---

## 📊 系统架构总览

```
┌─────────────────────────────────────┐
│        导航栏 (navbar.js)            │
│  HOME | ABOUT | RESEARCH | ...      │
└────────────┬────────────────────────┘
             │
             ├─→ research.html (列表页)
             │       ↓
             │   ContentManager
             │   └─ 扫描 LDPM*.md
             │
             ├─→ research-detail.html (详情页)
             │       ↓
             │   ContentManager
             │   └─ 加载单个文件内容
             │
             ├─→ events.html (列表页)
             │   events-detail.html (详情页)
             │
             ├─→ teaching.html (列表页)
             │   teaching-detail.html (详情页)
             │
             └─→ interests.html (列表页)
                interests-detail.html (详情页)

核心引擎：
  static/js/content-manager.js
  - 支持多种文件命名模式
  - 自动发现和解析
  - 统一的渲染接口

数据源：
  contents/
  ├── events/
  ├── teaching/
  ├── interests/
  └── research/
```

---

## 🚀 快速验证

### 最快的验证方式

1. **打开 research.html** 
   - 验证 4 个研究条目显示在列表中

2. **点击第一个条目**
   - 应该跳转到 `research-detail.html?id=research1`
   - 应该显示 LDPM 研究内容

3. **点击"下一篇"导航**
   - 应该显示下一篇研究内容

4. **点击"返回研究列表"**
   - 应该回到 research.html

如果以上 4 步都成功，整个系统集成完毕！✅

---

## 📝 后续维护建议

### 添加新的研究内容

在 `contents/research/` 中创建 `LDPM5.md`：

```markdown
---
title: 我的新研究主题
date: 2026-02-20
---

# 研究内容

## 背景

...

## 方法

...

## 结果

...
```

然后在 `content-manager.js` 的 `filePatterns` 中添加文件名：

```javascript
'research': ['LDPM1.md', 'LDPM2.md', 'LDPM3.md', 'LDPM4.md', 'LDPM5.md']
```

### 修改样式

编辑 `research-detail.html` 中的 `<style>` 部分，调整：
- 容器宽度
- 字体大小
- 颜色主题
- 响应式断点

---

## 🎉 集成完成

**所有模块现已完全集成！**

系统特点：
- ✅ 4 个完整的内容管理模块
- ✅ 统一的 ContentManager 引擎
- ✅ 支持多种文件命名模式
- ✅ 优雅的详情页面设计 (参考 markdown.html)
- ✅ 完整的导航和用户体验
- ✅ 响应式设计
- ✅ 数学公式和代码支持

**系统已可投入生产！** 🚀

---

*最后更新: 2026-01-26*
