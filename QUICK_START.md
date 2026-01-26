# 快速开始指南 - 动态内容系统

## 最快5分钟上手

### 1️⃣ 添加第一个事件

创建文件：`contents/events/events3.md`

```markdown
---
title: 我的新事件
date: 2026-02-15
---

# 我的新事件

这是详细内容...
```

### 2️⃣ 查看效果

1. 打开网站导航栏 → 点击 **EVENTS**
2. 您会在列表中看到新的事件
3. 点击事件标题 → 进入详情页面

### 3️⃣ 重复此过程添加更多内容

- 添加教学内容：`contents/teaching/teaching2.md`
- 添加兴趣内容：`contents/interests/interests2.md`

---

## 文件命名规则

| 模块 | 文件名格式 | 详情页链接 |
|------|---------|---------|
| Events | `events1.md`, `events2.md`, ... | `events-detail.html?id=events1` |
| Teaching | `teaching1.md`, `teaching2.md`, ... | `teaching-detail.html?id=teaching1` |
| Interests | `interests1.md`, `interests2.md`, ... | `interests-detail.html?id=interests1` |

---

## Markdown Front Matter 格式

**必需字段：**
```yaml
---
title: 内容标题
date: 2026-02-15
---
```

---

## 支持的 Markdown 特性

✅ 标题、加粗、斜体、列表
✅ 链接和图片
✅ 代码块（支持高亮）
✅ LaTeX 数学公式（`$公式$` 或 `$$公式$$`）
✅ 表格

---

## 测试您的设置

目前已为您创建了示例文件：

**Events 模块：**
- `contents/events/events1.md` ✓
- `contents/events/events2.md` ✓

**Teaching 模块：**
- `contents/teaching/teaching1.md` ✓

**Interests 模块：**
- `contents/interests/interests1.md` ✓

立即访问 `events.html` 查看效果！

---

## 常用操作

### 修改现有内容
只需编辑对应的 `.md` 文件，页面会自动重新加载

### 删除某个条目
删除对应的 `.md` 文件（例如删除 `events2.md`）

### 改变排序
所有条目按 `date` 字段倒序排列（最新的在前）

### 修改列表页标题
编辑 `contents/{section}/config.yml` 文件

---

## 文件清单

✅ `static/js/content-manager.js` - 核心引擎
✅ `events.html` - Events 列表页
✅ `events-detail.html` - Events 详情页
✅ `teaching.html` - Teaching 列表页
✅ `teaching-detail.html` - Teaching 详情页
✅ `interests.html` - Interests 列表页
✅ `interests-detail.html` - Interests 详情页
✅ `contents/events/` - Events 内容文件夹
✅ `contents/teaching/` - Teaching 内容文件夹
✅ `contents/interests/` - Interests 内容文件夹

---

## 需要帮助？

参考完整文档：`SYSTEM_GUIDE.md`

核心代码注释详见：`static/js/content-manager.js`
