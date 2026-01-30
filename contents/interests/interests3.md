---
title: markdown 基本操作
date: 2026-01-30
category: markdown
summary: markdown 基本操作
---



## 1️⃣ 标题（Heading）

Markdown 提供 6 级标题，常用 H1-H3，H4-H6 较少用。

```markdown
# H1 - Main Title
## H2 - Section Title
### H3 - Subsection Title
#### H4
##### H5
###### H6
```

💡 **技巧/坑点**

* 标题 `#` 与文字之间必须空格，否则不会渲染。
* H1 建议一篇文档只用一次（文章标题）。
* VS Code 插件 **Markdown All in One** 可以快速生成目录（TOC）基于标题。

---

## 2️⃣ 段落与换行

```markdown
这是第一段

这是第二段
```

* 换行：

```markdown
第一行  
第二行
```

💡 **技巧/坑点**

* 单回车不会换行。
* 两个空格 + 回车实现换行。
* VS Code 可以用 `Alt+Z` 自动换行显示，但 Markdown 渲染仍按原规则换行。

---

## 3️⃣ 强调（Emphasis）

```markdown
*斜体* 或 _斜体_
**加粗** 或 __加粗__
***加粗斜体*** 
~~删除线~~
```

💡 **技巧/坑点**

* 星号或下划线必须成对。
* 中间不能加空格。
* 可以组合强调：`***bold and italic***`

---

## 4️⃣ 列表（List）

### 无序列表

```markdown
- Item 1
* Item 2
+ Item 3
```

### 有序列表

```markdown
1. First
2. Second
3. Third
```

### 嵌套列表

```markdown
- Item 1
  - Subitem 1
  - Subitem 2
```

💡 **技巧/坑点**

* 嵌套列表用 **两个空格** 缩进。
* 避免混用 `- * +`，可能影响解析。
* VS Code 插件 **Markdown All in One** 支持自动缩进列表。

---

## 5️⃣ 链接与图片

### 链接

```markdown
[Google](https://www.google.com)
[本地文件](./file.md)
```

### 图片

```markdown
![Alt Text](image.png)
![网络图片](https://example.com/image.jpg)
```

💡 **技巧/坑点**

* 本地路径空格需要 `%20` 或引号。
* VS Code Markdown 预览会显示图片，但 GitHub 渲染可能路径不同。
* 可以添加标题：

```markdown
![Alt Text](image.png "图片标题")
```

---

## 6️⃣ 引用（Blockquote）

```markdown
> 这是引用文本
> 第二行引用
```

* 可嵌套：

```markdown
> 外层引用
>> 内层引用
```

💡 **技巧/坑点**

* `>` 后必须空格。
* 多行引用每行都要加 `>`。
* VS Code 支持选中多行快捷加引用 `Ctrl+Shift+>`。

---

## 7️⃣ 代码块

### 行内代码

```markdown
请使用 `console.log()` 打印信息。
```

### 多行代码块

````markdown
```python
def hello():
    print("Hello World")
````

````

💡 **技巧/坑点**
- 三个反引号 ``` 必须独立一行。
- 可指定语言高亮，例如 `python`、`javascript`。
- VS Code 插件 **Markdown Preview Enhanced** 支持渲染语法高亮。

---

## 8️⃣ 表格（Table）

```markdown
| Name  | Age | City     |
| ----- | --- | -------- |
| Alice | 20  | New York |
| Bob   | 22  | London   |
````

### 对齐

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| a    |   b    |     c |
```

💡 **技巧/坑点**

* 每行列数必须一致。
* `:` 用于设置对齐。
* 冷门用法：表格中可嵌套 Markdown 链接或图片：

```markdown
| Image           | Link                         |
| --------------- | ---------------------------- |
| ![Alt](img.png) | [Google](https://google.com) |
```

---

## 9️⃣ 分割线（Horizontal Rule）

```markdown
---
***
___
```

* 独立一行，空格无影响。
* 可用于章节分割。

---

## 10️⃣ TOC（目录 / Table of Contents）

```markdown
- [Introduction](#introduction)
- [Methods](#methods)
```

💡 **技巧/坑点**

* 链接要小写，空格用 `-`。
* 特殊字符如 `#`、`/` 需手动修改。
* **插件推荐**：Markdown All in One 自动生成 TOC。

---

## 11️⃣ 脚注（Footnote）

```markdown
这是脚注示例[^1].

[^1]: 这是脚注内容
```

💡 **技巧/坑点**

* GitHub Markdown 原生不支持脚注，需要插件或转换工具。
* VS Code Markdown Preview Enhanced 支持脚注。

---

## 12️⃣ 数学公式（LaTeX）

### 行内公式

```markdown
$E=mc^2$
```

### 块公式

```markdown
$$
\int_0^\infty e^{-x} dx
$$
```

💡 **技巧/坑点**

* `$` 前后不要空格。
* VS Code 需要 **Markdown+Math** 或 **Markdown Preview Enhanced** 插件。
* 冷门用法：公式内支持标签：

```markdown
\begin{align}
a^2 + b^2 &= c^2 \\
x &= \frac{-b \pm \sqrt{b^2-4ac}}{2a}
\end{align}
```

---

## 13️⃣ HTML 标签嵌入

* Markdown 支持部分 HTML：

```html
<span style="color:red">Red Text</span>
<br>
```

💡 **技巧/坑点**

* HTML 标签在 VS Code 预览可渲染，但 GitHub Pages 有些标签不支持。
* 冷门用法：用 `<details>` 实现折叠：

```html
<details>
<summary>Click to expand</summary>
隐藏内容
</details>
```

---

## 14️⃣ 高级 / 冷门用法

1. **任务列表**

```markdown
- [x] Done
- [ ] Todo
```

* 可用于笔记、任务跟踪。

2. **引用内部链接**

```markdown
[跳转到章节](#chapter-1)
```

3. **自定义 ID 和 TOC**

```markdown
### Chapter 1 {#chapter1}
```

4. **折叠内容**

```markdown
<details>
<summary>Read more</summary>
隐藏内容
</details>
```

5. **Markdown + Mermaid 绘图**

````markdown
```mermaid
graph TD;
    A-->B;
    B-->C;
````

````
- VS Code 需要 Markdown Preview Enhanced 插件。
- 冷门但强大：可以生成流程图、时序图、甘特图。

6. **表格内嵌 HTML**
```markdown
| Column 1    | Column 2      |
| ----------- | ------------- |
| <b>Bold</b> | <i>Italic</i> |
````

7. **注释**

```markdown
<!-- 这是注释 -->
```

* VS Code 预览不会显示。

---

## 15️⃣ VS Code Markdown 提升技巧

* 自动生成 TOC：`Markdown All in One` → `Ctrl+Shift+P → Create Table of Contents`
* 自动格式化文档：`Markdownlint` 插件
* 模板 + Snippets：

  * `mdnote` → 笔记模板
  * `mdblog` → 博客模板
  * `mdpaper` → 学术论文模板
* 快速预览：`Ctrl+Shift+V` / `Ctrl+K V`（侧边预览）

---

## 16️⃣ Markdown 常见坑总结

| 错误         | 修复方法                         |
| ------------ | -------------------------------- |
| 标题不渲染   | `#` 与文字间加空格               |
| 列表错位     | 嵌套列表用两个空格，不要混 Tab   |
| 图片不显示   | 相对路径正确，空格 `%20`         |
| 代码块显示错 | `独立行，语言紧贴`               |
| 表格渲染错   | 每行列数一致，分隔符对齐         |
| TOC 链接错   | 链接小写，空格用 `-`             |
| LaTeX 不渲染 | 安装插件                         |
| 脚注不显示   | 使用 `Markdown Preview Enhanced` |
| 折叠不生效   | 用 `<details>` / `<summary>`     |

---
