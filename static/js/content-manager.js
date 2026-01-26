/**
 * 通用内容加载和渲染系统
 * 用于处理 events、teaching、interests 等模块的列表和详情页面
 */

class ContentManager {
  constructor(section) {
    this.section = section; // 'events', 'teaching', 'interests'
    this.contentDir = `contents/${section}/`;
    this.configFile = `${this.contentDir}config.yml`;
    this.files = [];
  }

  /**
   * 初始化 - 扫描并加载该section下的所有markdown文件
   */
  async init() {
    try {
      // 暂时使用硬编码的文件列表，未来可改为动态扫描
      // 如需动态扫描，需要后端支持或使用build script
      await this.loadConfig();
      await this.discoverFiles();
    } catch (error) {
      console.error(`Failed to initialize ContentManager for ${this.section}:`, error);
    }
  }

  /**
   * 加载配置文件
   */
  async loadConfig() {
    try {
      const response = await fetch(this.configFile);
      const text = await response.text();
      const config = this.parseYaml(text);
      // 将配置应用到页面（如标题等）
      Object.keys(config).forEach(key => {
        const elem = document.getElementById(key);
        if (elem) {
          elem.innerHTML = config[key];
        }
      });
    } catch (error) {
      console.log(`Config file not found for ${this.section}`);
    }
  }

  /**
   * 简单的YAML解析（仅支持key: value格式）
   */
  parseYaml(text) {
    const config = {};
    text.split('\n').forEach(line => {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        config[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
      }
    });
    return config;
  }

  /**
   * 动态发现该section下的文件
   * 需要一个索引文件或build script生成的文件列表
   */
  async discoverFiles() {
    const maxFiles = 10;
    this.files = [];

    // 定义不同section的命名模式
    const filePatterns = {
      'research': ['LDPM1.md', 'LDPM2.md', 'LDPM3.md', 'LDPM4.md'], // 特定模式
      'default': (i) => `${this.section}${i}.md` // 通用模式
    };

    // 获取该section的文件模式
    let filesToCheck = [];
    if (filePatterns[this.section]) {
      filesToCheck = filePatterns[this.section];
    } else {
      // 使用通用模式生成文件名列表
      for (let i = 1; i <= maxFiles; i++) {
        filesToCheck.push(filePatterns.default(i));
      }
    }

    // 尝试加载每个文件
    for (let i = 0; i < filesToCheck.length; i++) {
      const fileName = filesToCheck[i];
      const filePath = `${this.contentDir}${fileName}`;
      
      try {
        const response = await fetch(filePath);
        if (response.ok) {
          const content = await response.text();
          const metadata = this.extractMetadata(content);
          
          // 为research模块生成ID（基于原始文件名）
          let fileId = filePatterns[this.section] 
            ? `${this.section}${i + 1}` 
            : `${this.section}${i + 1}`;

          this.files.push({
            id: fileId,
            fileName: fileName,
            title: metadata.title || fileName,
            date: metadata.date || new Date().toISOString().split('T')[0],
            category: metadata.category || '', // 分类
            summary: metadata.summary || '', // 摘要
            content: content
          });
        }
      } catch (error) {
        // 文件不存在，继续
      }
    }

    // 按日期倒序排列
    this.files.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * 从markdown内容中提取元数据（front matter）
   */
  extractMetadata(content) {
    const metadata = {};
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (fmMatch) {
      const fmText = fmMatch[1];
      fmText.split('\n').forEach(line => {
        const match = line.match(/^([^:]+):\s*(.+)$/);
        if (match) {
          metadata[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
        }
      });
    }
    
    return metadata;
  }

  /**
   * 获取所有文件
   */
  getFiles() {
    return this.files;
  }

  /**
   * 根据ID获取单个文件
   */
  getFileById(id) {
    return this.files.find(f => f.id === id);
  }

  /**
   * 渲染列表视图 - 采用 blog 部分的卡片样式
   * 样式特点：
   * - 左边蓝色竖线：border-left: 4px solid #0366d6
   * - 卡片风格：border rounded shadow-sm
   * - 日期和分类图标：bi bi-calendar3、bi bi-tag
   * - 蓝色链接：#0366d6
   * - 灰色元数据文本：#6a737d
   */
  renderList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (this.files.length === 0) {
      container.innerHTML = `<p>暂无内容</p>`;
      return;
    }

    const listHtml = this.files.map(file => `
      <div class="content-item mb-4 p-4 border rounded shadow-sm" style="border-left: 4px solid #0366d6;">
        <h3 class="mb-2">
          <a href="${this.section}-detail.html?id=${file.id}" style="color: #0366d6; text-decoration: none;">
            ${file.title}
          </a>
        </h3>
        <div class="text-muted small mb-2">
          <i class="bi bi-calendar3"></i> ${file.date || '未知日期'}
          ${file.category ? `&nbsp;|&nbsp;<i class="bi bi-tag"></i> ${file.category}` : ''}
        </div>
        ${file.summary ? `<p class="mb-0" style="color: #6a737d;">${file.summary}</p>` : ''}
      </div>
    `).join('');

    container.innerHTML = listHtml;
  }

  /**
   * 渲染详情视图
   */
  async renderDetail(containerId, fileId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const file = this.getFileById(fileId);
    if (!file) {
      container.innerHTML = `<p>内容未找到</p>`;
      return;
    }

    // 移除front matter并渲染markdown
    const contentWithoutFM = file.content.replace(/^---\n[\s\S]*?\n---\n/, '');
    marked.use({ mangle: false, headerIds: false });
    const html = marked.parse(contentWithoutFM);
    
    container.innerHTML = html;

    // 触发MathJax重新渲染
    if (typeof MathJax !== 'undefined') {
      MathJax.typeset();
    }
  }

  /**
   * 获取该section下的所有文件元数据（用于导航）
   */
  getFilesMetadata() {
    return this.files.map(f => ({
      id: f.id,
      title: f.title,
      date: f.date
    }));
  }
}
