# 动态内容管理系统使用指南

## 概述

您的网站现在配备了一个通用的**动态内容管理系统**，支持 `events`、`teaching` 和 `interests` 等多个模块。系统允许您只需在对应的 markdown 文件夹中添加内容，页面就会自动加载和显示。

## 系统架构

### 核心文件

1. **content-manager.js** (`static/js/content-manager.js`)
   - 通用的内容加载和渲染引擎
   - 自动扫描 markdown 文件
   - 解析 YAML front matter 元数据
   - 支持列表和详情页面渲染

2. **列表页面** (如 `events.html`, `teaching.html`, `interests.html`)
   - 显示该模块下的所有条目列表
   - 按日期倒序排列
   - 每条目都是一个可点击的链接

3. **详情页面** (如 `events-detail.html`, `teaching-detail.html`, `interests-detail.html`)
   - 显示单个条目的完整内容
   - 包含上一篇/下一篇导航功能
   - 支持 Markdown 和 LaTeX 数学公式渲染

## 文件夹结构

```
contents/
├── events/
│   ├── events1.md          # 事件1
│   ├── events2.md          # 事件2
│   └── config.yml          # 配置文件
├── teaching/
│   ├── teaching1.md        # 教学内容1
│   └── config.yml
└── interests/
    ├── interests1.md       # 兴趣1
    └── config.yml
```

## 如何添加新内容

### 1. 添加新的事件 (Events)

在 `contents/events/` 文件夹中创建 `events3.md`：

```markdown
---
title: 我的新事件标题
date: 2026-02-01
---

# 我的新事件标题

这是事件的内容...

## 子标题

更多细节信息。
```

**注意事项：**
- 文件必须命名为 `events{数字}.md` 的格式（如 `events3.md`, `events4.md` 等）
- Front matter（--- 之间的部分）包含 `title` 和 `date` 两个必需字段
- 日期格式：`YYYY-MM-DD`

### 2. 添加新的教学内容 (Teaching)

同样的方式添加到 `contents/teaching/`：

```markdown
---
title: 我的课程标题
date: 2026-02-01
---

# 课程内容
...
```

### 3. 添加新的兴趣 (Interests)

同样的方式添加到 `contents/interests/`：

```markdown
---
title: 我的兴趣主题
date: 2026-02-01
---

# 兴趣描述
...
```

## 页面链接

### 用户视角

1. **浏览列表**
   - 点击导航栏 "EVENTS" → 访问 `events.html`
   - 显示所有事件的列表

2. **查看详情**
   - 在列表页面点击某个条目 → 跳转到 `events-detail.html?id=events1`
   - 显示该条目的完整内容

3. **导航**
   - 在详情页面可点击"上一篇"/"下一篇"按钮导航

### 链接结构

- 列表页面：`events.html`
- 详情页面：`events-detail.html?id=events1`
- 列表页面：`teaching.html`
- 详情页面：`teaching-detail.html?id=teaching1`
- 列表页面：`interests.html`
- 详情页面：`interests-detail.html?id=interests1`

## 配置文件 (config.yml)

每个模块的 `config.yml` 文件用于定义该模块的副标题，例如：

```yaml
events-subtitle: "EVENTS"
teaching-subtitle: "TEACHING"
interests-subtitle: "INTERESTS"
```

## Markdown 支持

系统完整支持以下 Markdown 功能：

### 基础格式

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体**
*斜体*
~~删除线~~

- 列表项1
- 列表项2

[链接](https://example.com)
![图片](url)
```

### LaTeX 数学公式

**行内公式：** `$E = mc^2$`

**块级公式：**
```
$$
\frac{a}{b} = c
$$
```

### 代码块

````markdown
```python
def hello():
    print("Hello, World!")
```
````

## 技术细节

### ContentManager 类

`ContentManager` 类提供以下主要方法：

```javascript
// 初始化并加载文件
await manager.init();

// 渲染列表视图
manager.renderList('container-id');

// 渲染详情视图
await manager.renderDetail('container-id', 'file-id');

// 获取所有文件
const files = manager.getFiles();

// 获取单个文件
const file = manager.getFileById('events1');
```

### 自动发现机制

系统使用以下命名约定自动发现文件：

- `events1.md`, `events2.md`, `events3.md`, ...
- `teaching1.md`, `teaching2.md`, ...
- `interests1.md`, `interests2.md`, ...

系统最多支持同一类型 10 个文件（可在 `content-manager.js` 中修改 `maxFiles` 变量来扩展）。

## 常见问题

### Q: 如果我想添加第11个事件怎么办？

在 `content-manager.js` 中找到这一行：
```javascript
const maxFiles = 10;
```

改为更大的数字，例如：
```javascript
const maxFiles = 20;
```

### Q: 文件顺序是否可以自定义？

目前系统按照日期（date 字段）倒序排列。如果要改变排序方式，可以编辑 `content-manager.js` 中的排序逻辑。

### Q: 支持子文件夹吗？

目前不支持。所有 markdown 文件必须直接放在 `contents/{section}/` 目录下。

### Q: 如何修改列表或详情页的样式？

可以编辑对应的 CSS 文件：
- `static/css/main.css` - 主样式
- `static/css/home.css` - 首页特定样式
- `static/css/styles.css` - Bootstrap 基础样式

列表项的 HTML 类名为 `content-item`，可在此处自定义样式。

## 更新日志

- **2026-01-26**: 实现通用动态内容管理系统，支持 events、teaching、interests 三个模块

## 技术栈

- **前端框架**: Bootstrap 5
- **Markdown 解析**: marked.js
- **数学公式**: MathJax 3
- **元数据解析**: YAML front matter

---

如有任何问题或需要进一步定制，请随时修改相关文件！
