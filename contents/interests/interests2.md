---
title: gh 基本命令
date: 2026-01-15
category: Github
summary: gh 基本命令操作
---


## gh 基本命令

`gh` (GitHub CLI) 的命令设计非常直观，采用了 **`gh <大类> <动词> [参数]`** 的语法结构。

为了让你更清楚地理解，我将常用命令按**功能场景**分类，并解释每行代码背后的**实际意义**。

---

### 1. 账号与认证 (Auth)

这是最基础的命令，用于让你的电脑有权操作 GitHub 账号。

| 命令代码              | 意义 (它在做什么)                                                                     |
| --------------------- | ------------------------------------------------------------------------------------- |
| **`gh auth login`**   | **登录**。它会引导你通过浏览器或 Token 授权，让终端获得操作权限。                     |
| **`gh auth logout`**  | **登出**。清除本地保存的凭证，保护安全。                                              |
| **`gh auth status`**  | **检查状态**。查看当前登录的是哪个账号，使用的是 HTTPS 还是 SSH 协议。                |
| **`gh auth refresh`** | **刷新权限**。如果你发现某些功能（如删除 Delete）提示没权限，用这个命令扩展权限范围。 |

---

### 2. 仓库管理 (Repo)

用于管理项目本身（Repository），替代部分繁琐的 git 命令。

| 命令代码                   | 意义 (它在做什么)                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **`gh repo create`**       | **创建新仓库**。可以在 GitHub 网站新建一个仓库，甚至直接把当前文件夹变成 GitHub 仓库。 |
| **`gh repo clone <地址>`** | **下载仓库**。等同于 `git clone`，但你可以只输 `user/repo`，不需要输完整的 URL。       |
| **`gh repo view --web`**   | **查看仓库**。加上 `--web` 会直接在浏览器打开当前项目的 GitHub 网页。                  |
| **`gh repo fork`**         | **复刻仓库**。把别人的项目复制一份到你的账号下（通常用于给别人贡献代码前）。           |
| **`gh repo sync`**         | **同步仓库**。如果你的 Fork 落后于原版，这个命令能一键把原版的更新拉取过来。           |

---

### 3. 发布版本 (Release) —— **你最常用的**

用于管理软件的发行版（下载页）。

| 命令代码                             | 意义 (它在做什么)                                                         |
| ------------------------------------ | ------------------------------------------------------------------------- |
| **`gh release create <tag>`**        | **新建发布**。创建一个新版本（Tag），并可以同时上传文件。                 |
| **`gh release list`**                | **列出发布**。查看当前仓库所有的历史版本列表。                            |
| **`gh release download <tag>`**      | **下载发布**。把 GitHub 上某个版本的附件下载到本地。                      |
| **`gh release edit <tag>`**          | **修改信息**。修改发布页的标题、描述（Release Notes）。                   |
| **`gh release upload <tag> <file>`** | **补传文件**。往已经发布好的版本里，再扔进去一个新的文件。                |
| **`gh release delete <tag>`**        | **删除发布**。删掉这个版本（通常建议配合 `--cleanup-tag` 连标签一起删）。 |

---

### 4. 协作与合并 (PR / Pull Request)

这是团队开发的核心。当你修改了代码，想合并到主分支时使用。

| 命令代码                    | 意义 (它在做什么)                                                                |
| --------------------------- | -------------------------------------------------------------------------------- |
| **`gh pr create`**          | **提交合并请求**。把你的代码改动打包，请求合并到主分支。它会让你填标题和描述。   |
| **`gh pr list`**            | **查看列表**。看看当前有哪些正在进行的 PR（别人提交的或你提交的）。              |
| **`gh pr checkout <编号>`** | **拉取别人的代码**。把别人提交的 PR 下载到你本地，方便你测试他的代码能不能跑通。 |
| **`gh pr merge <编号>`**    | **合并代码**。通过测试后，把这个 PR 合并进主干（Main），并自动关闭 PR。          |
| **`gh pr review`**          | **代码审查**。用来批准（Approve）或请求更改别人的代码。                          |

---

### 5. 问题追踪 (Issue)

用于管理 Bug 报告或功能建议。

| 命令代码                    | 意义 (它在做什么)                                    |
| --------------------------- | ---------------------------------------------------- |
| **`gh issue create`**       | **提新问题**。报告一个 Bug 或提出一个新功能建议。    |
| **`gh issue list`**         | **看问题列表**。看看当前还有哪些 Bug 没修。          |
| **`gh issue view <编号>`**  | **看详情**。查看某个具体 Issue 的讨论记录。          |
| **`gh issue close <编号>`** | **关闭问题**。Bug 修好了，或者是无效问题，把它关闭。 |

---

### 6. 代码片段 (Gist)

用于分享单文件代码（比如一段脚本，或者一个错误日志）。

| 命令代码                    | 意义 (它在做什么)                                                          |
| --------------------------- | -------------------------------------------------------------------------- |
| **`gh gist create <文件>`** | **创建代码片段**。把本地一个文件变成一个在线的 Gist 链接，方便发给别人看。 |

---

### 7. 自动化 (Run / Actions)

用于管理 GitHub Actions（自动构建脚本）。

| 命令代码                     | 意义 (它在做什么)                                                          |
| ---------------------------- | -------------------------------------------------------------------------- |
| **`gh run list`**            | **查看运行记录**。看看你的自动构建脚本（CI/CD）是成功了还是失败了。        |
| **`gh run view <id> --log`** | **查看日志**。如果构建失败了，用这个命令直接在终端看报错日志，不用去网页。 |

---

### 如何自学查阅？

你不需要背下所有命令，只需要记住一个万能公式：

**`gh <命令> --help`**

* 想知道 `repo` 下面有什么？ 输入 `gh repo --help`
* 想知道 `release create` 怎么用？ 输入 `gh release create --help`

### 总结：日常开发工作流示例

1. **开始干活**：`gh repo clone my-project` (下载项目)
2. **写代码**：(在编辑器里写写写...)
3. **发现 Bug**：`gh issue create` (记录一下 Bug)
4. **提交代码**：`git push` (推送到远程)
5. **请求合并**：`gh pr create` (让同事审查代码)
6. **同事合并后，发布新版**：`gh release create v1.0.0 app.exe` (打包发布)

---

### 8. 账号与认证 (Auth)

* **`gh auth login`** (登录)
* **全参数例子**: 登录 GitHub 企业版，指定 SSH 协议，请求额外的权限范围，并直接通过网页验证。

```bash
gh auth login --hostname github.company.com --git-protocol ssh --scopes "repo,read:org,workflow" --web

```

---

### 9. 仓库管理 (Repo)

* **`gh repo create`** (创建仓库)
* **全参数例子**: 将**当前文件夹**(`--source=.`)变成一个 GitHub 仓库，设为**公开**，指定由 **Node** 的忽略文件模板，使用 **MIT** 协议，添加描述，并立即**推送到远程**。

```bash
gh repo create my-project --public --source=. --description "这是一个自动创建的项目" --gitignore Node --license MIT --push --remote upstream

```

* **`gh repo list`** (列出仓库)
* **全参数例子**: 列出我看过的最后 **50** 个 **JavaScript** 语言的 **非私有** 仓库，并只输出仓库的 URL 和描述（方便脚本处理）。

```bash
gh repo list --language javascript --limit 50 --visibility public --json url,description

```

---

### 10. 发布版本 (Release) —— **重点推荐**

* **`gh release create`** (新建发布)
* **全参数例子**:

1. 创建一个名为 `v1.2.0` 的标签。
2. 标记为 **预发布** (`--prerelease`) 和 **草稿** (`--draft`)。
3. 标题叫 "v1.2.0 Beta"。
4. 从本地文件 `notes.md` 读取更新日志。
5. 一次性上传 `dist` 文件夹下的**所有文件**。

```bash
gh release create v1.2.0 ./dist/* --title "v1.2.0 Beta (测试版)" --notes-file release_notes.md --draft --prerelease --target main

```

---

### 11. 协作与合并 (PR / Pull Request)

* **`gh pr create`** (创建 PR)
* **全参数例子**: 创建一个 PR，指定标题和内容，指派给自己 (`@me`)，指定审核人 (`reviewer`)，打上 "bug" 和 "urgent" 标签，关联到名为 "Roadmap" 的项目板，并设为草稿模式。

```bash
gh pr create --title "修复登录页面的崩溃问题" --body "详细修复逻辑请见文档..." --assignee @me --reviewer "team-lead" --label "bug,urgent" --project "Roadmap" --draft

```

* **`gh pr list`** (列出 PR)
* **全参数例子**: 列出所有状态为 **Open** 的，标签包含 **"bug"** 的，并且是我自己 (`@me`) 提交的 PR。

```bash
gh pr list --state open --label "bug" --author "@me" --limit 20

```

* **`gh pr merge`** (合并 PR)
* **全参数例子**: 自动合并编号为 `#12` 的 PR，使用 **Squash** (压缩提交) 模式，自动删除远程分支，并且不需要再次确认 (`--auto` 表示如果检查没过就自动排队等待)。

```bash
gh pr merge 12 --squash --delete-branch --auto --subject "合并 PR #12: 修复登录 Bug"

```

---

### 12. 问题追踪 (Issue)

* **`gh issue create`** (提新问题)
* **全参数例子**: 报告一个 Bug，直接从文件读取报错日志作为内容，指派给负责人，设定里程碑为 "v2.0"。

```bash
gh issue create --title "生产环境 500 错误" --body-file ./error_log.txt --assignee "dev-manager" --label "critical" --milestone "v2.0"

```

* **`gh issue list`** (看问题列表)
* **全参数例子**: 查找所有**未分配人员** (`--no-assignee`) 且提到 "UI" 这个词的 Open 状态的问题。

```bash
gh issue list --state open --no-assignee --search "UI"

```

---

### 13. 代码片段 (Gist)

* **`gh gist create`** (创建代码片段)
* **全参数例子**: 将本地的 `script.py` 文件上传为一个公开的 Gist，并附带描述。

```bash
gh gist create script.py --public --desc "这是一个用于自动备份的 Python 脚本"

```

---

### 14. 自动化 (Run / Actions)

* **`gh run list`** (查看运行记录)
* **全参数例子**: 查看名为 "Build and Deploy" 的工作流，且状态为 **失败** (`failure`) 的最近 10 次记录，指定查看 `main` 分支。

```bash
gh run list --workflow "Build and Deploy" --status failure --branch main --limit 10

```

* **`gh run watch`** (实时监控，非常酷)
* **例子**: 监控最新的那次运行，直到它结束，如果失败了以非零状态码退出（适合用在脚本里等待部署完成）。

```bash
gh run watch --exit-status

```

---

### 提示：如何自己探索？

如果你想针对某个命令看更多的例子，可以在任何命令后面加 `--help`，例如：
`gh release create --help`
它会在终端里直接显示官方给出的各种用法示例。
